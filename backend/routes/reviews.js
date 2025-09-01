const express = require("express")
const jwt = require("jsonwebtoken")
const db = require("../db")

const router = express.Router()
const SECRET = "secret123"

router.post("/add", (req, res) => {

    const {token, bookId, rating, comment} = req.body
    try{
        const user = jwt.verify(token, SECRET)
        db.run("INSERT INTO reviews(userId,bookId,rating,comment) VALUES (?,?,?,?)", [user.id, bookId, rating, comment],
            function(err){
                if(err) return res.status(500).json({error: err.message})
                return res.json({success: true})
            }
        )

    } catch{
        return res.status(401).json("Invalid token")
    }

})


module.exports = router