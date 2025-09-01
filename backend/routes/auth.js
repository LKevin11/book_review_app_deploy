const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../db")

const router = express.Router()
const SECRET = "secret123"

router.post("/login", (req, res) => {

    const {username, password} = req.body
    db.get("SELECT * FROM users WHERE username=?", [username], function(err, user){
        if(!user) return res.status(400).json({error: "Invalid user"})
        if(!bcrypt.compareSync(password, user.password)) return res.status(400).json({error: "Wrong password"})

        const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, SECRET)
        return res.json({token})
    })

})

router.post("/register", (req, res) => {

    const {username, password} = req.body
    const hashed = bcrypt.hashSync(password, 10)
    db.run("INSERT INTO users(username, password) VALUES (?,?)", [username, hashed], function(err){
        if(err) return res.status(400).json({error: "User exists"})
        return res.json({success: true})
    })

})

router.get("/users", (req, res) => {
    db.all("SELECT * FROM users", [], function(err,rows){
        return res.json(rows)
    })
})

module.exports = router