const express = require("express")
const db = require("../db")
const router = express.Router()

router.get("/", (req, res) => {

    const { title, author, genre, sort = "title", order = "ASC", page = 1, limit = 20 } = req.query

    let where = []
    let params = []

    if (title) {
        where.push("books.title LIKE ?")
        params.push(`%${title}%`)
    }
    if (author) {
        where.push("authors.name LIKE ?")
        params.push(`%${author}%`)
    }
    if (genre) {
        where.push("genres.name LIKE ?")
        params.push(`%${genre}%`)
    }

    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : ""

    const validSort = ["title", "author", "genre"]
    const sortMap = { title: "books.title", author: "authors.name", genre: "genres.name" }
    const sortBy = validSort.includes(sort) ? sortMap[sort] : "books.title"
    const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC"

    const offset = (page - 1) * limit;

    const sql = `
        SELECT books.id, books.title, books.description,
           authors.name as author, genres.name as genre
        FROM books
        LEFT JOIN authors ON books.authorId = authors.id
        LEFT JOIN genres ON books.genreId = genres.id
        ${whereClause}
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT ? OFFSET ?
    `

    db.all(sql, [...params, limit, offset], function(err, books){
        if(err) return res.status(500).json({error: err.message})
        db.get(`SELECT COUNT(*) as total FROM books 
                LEFT JOIN authors ON books.authorId=authors.id
                LEFT JOIN genres ON books.genreId=genres.id
                ${whereClause}`, params, (err2, count) => {
                    if(err2) res.status(500).json({error: err2.message})
                    return res.json({data: books, total: count.total, page: Number(page), limit: Number(limit)})
                })
        
    })

})

router.get("/:id", (req, res) => {
    const {id} = req.params
    db.get(`
        SELECT books.id, books.title, books.description,
           authors.name as author, genres.name as genre
        FROM books
        LEFT JOIN authors ON books.authorId = authors.id
        LEFT JOIN genres ON books.genreId = genres.id
        WHERE books.id=?
        `, 
        [id], 
        function(err, book){
            if(!book) return res.status(404).json({error: "Book not found"})
            db.all("SELECT * FROM reviews WHERE bookId=?", [id], function(err2, reviews){
                if(err2) res.status(500).json({error: err2.message})
                return res.json({...book, reviews})   
            })
            
    })
})

module.exports = router