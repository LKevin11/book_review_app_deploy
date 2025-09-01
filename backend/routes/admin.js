const express = require("express")
const jwt = require("jsonwebtoken")
const db = require("../db")

const router = express.Router()
const SECRET = "secret123"

function checkAdmin(token) {
  const user = jwt.verify(token, SECRET);
  if (!user.isAdmin) throw new Error("Not admin");
  return user;
}

router.post("/addBook", (req, res) => {

    const {token, title, authorId, genreId, description } = req.body
    try{
        checkAdmin(token)
        db.run("INSERT INTO books(title,authorId,genreId,description) VALUES (?,?,?,?)", [title, authorId, genreId, description],
            function(err){
                if(err) return res.status(500).json({error: err.message})
                return res.json({success: true, id: this.lastID})
            }
        )
    } catch{
        return res.status(403).json({error: "Unauthorized"})
    }

})

router.put("/updateBook/:id", (req, res) => {

    const {token, title, authorId, genreId, description} = req.body
    const {id} = req.params
    try{
        checkAdmin(token)
        db.run("UPDATE books SET title=?, authorId=?, genreId=?, description=? WHERE id=?",
            [title, authorId, genreId, description, id],
            function(err){
                if(err) return res.status(500).json({error: err.message})
                return res.json({success: true, id: this.lastID})
            }
        )
    } catch {
        return res.status(403).json({error: "Unauthorized"})
    }

})

router.delete("/deleteBook/:id", (req, res) => {

    const {token} = req.body
    const {id} = req.params
    try{
        checkAdmin(token)
        db.run("DELETE FROM books WHERE id=?", [id], function(err){
            if(err) return res.status(500).json({error: err.message})
            return res.json({success: true})
        })
    } catch{
        return res.status(403).json({error: "Unauthorized"})
    }

})

router.post("/addAuthor", (req, res) => {

    const {token, name} = req.body
    try{
        checkAdmin(token)
        db.run("INSERT INTO authors(name) VALUES (?)", [name], function(err){
            if(err) return res.status(500).json({error: err.message})
            return res.json({success: true, id: this.lastID})
        })

    } catch{
        return res.status(403).json({error: "Unauthorized"})
    }

})

router.put("/updateAuthor/:id", (req, res) => {
    const {token, name} = req.body
    const {id} = req.params
    try{
        checkAdmin(token)
        db.run("UPDATE authors SET name=? WHERE id=?", [name, id], function(err){
            if(err) return res.status(500).json({error: err.message})
            return res.json({success: true, id: this.lastID})
        })

    } catch{
        return res.status(403).json({error: "Unauthorized"})
    }
})

router.delete("/deleteAuthor/:id", (req, res) => {
    const {token} = req.body
    const {id} = req.params
    try{
        checkAdmin(token)
        db.run("DELETE FROM authors WHERE id=?", [id], function(err){
            if(err) return res.status(500).json({error: err.message})
            return res.json({success: true})
        })

    } catch{
        return res.status(403).json({error: "Unauthorized"})
    }  
})

router.post("/addGenre", (req, res) => {
    const {token, name} = req.body
    try{
        checkAdmin(token)
        db.run("INSERT INTO genres(name) VALUES (?)", [name], function(err){
            if(err) return res.status(500).json({error: err.message})
            return res.json({success: true, id: this.lastID})
        })
    } catch{
        return res.status(403).json({error: "Unauthorized"})
    }
})

router.put("/updateGenre/:id", (req, res) => {
    const {token, name} = req.body
    const {id} = req.params
    try{
        checkAdmin(token)
        db.run("UPDATE genres SET name=? WHERE id=?", [name, id], function(err){
            if(err) return res.status(500).json({error: err.message})
            return res.json({success: true, id: this.lastID})
        })
    } catch{
        return res.status(403).json({error: "Unauthorized"})
    }
})

router.delete("/deleteGenre/:id", (req, res) => {
    const {token} = req.body
    const {id} = req.params
    try{
        checkAdmin(token)
        db.run("DELETE FROM genres WHERE id=?", [id], function(err){
            if(err) return res.status(500).json({error: err.message})
            return res.json({success: true})
        })
    } catch{
        return res.status(403).json({error: "Unauthorized"})
    }
})

module.exports = router