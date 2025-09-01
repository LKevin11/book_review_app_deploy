const express = require("express")
const jwt = require("jsonwebtoken")
const db = require("../db")

const router = express.Router()
const SECRET = "secret123"

router.post("/add", (req, res) => {
    const {token, bookId} = req.body
    try{
        const user = jwt.verify(token, SECRET)
        db.run("INSERT INTO favourites(userId, bookId) VALUES (?,?)", [user.id, bookId], function(err){
            if(err) return res.status(500).json({error: err.message})
            return res.json({success: true})
        })
    } catch{
        return res.status(401).json({error: "Invalid token"})
    }
})

router.post("/", (req, res) => {

    const {token} = req.body
    try{

        const user = jwt.verify(token, SECRET)
        db.all(`
            SELECT books.id, books.title, authors.name as author, genres.name as genre
            FROM favourites 
            JOIN books ON favourites.bookId = books.id
            LEFT JOIN authors ON books.authorId = authors.id
            LEFT JOIN genres ON books.genreId = genres.id
            WHERE favourites.userId = ?
            `, [user.id], function(err, rows){
                if(err) return res.status(500).json({error: err.message})
                return res.json(rows)
            })

    } catch {
        return res.status(401).json({error: "Invalid token"})
    }

})

module.exports = router