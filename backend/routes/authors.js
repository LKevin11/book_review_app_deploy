const express = require("express")
const db = require("../db")

const router = express.Router()

router.get("/", (req, res) => {
    db.all("SELECT * FROM authors", [], function(err, rows){
        if(err) return res.status(500).json({error: err.message})
        return res.json(rows)
    })
})

module.exports = router