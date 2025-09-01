const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const bookRoutes = require("./routes/books")
const reviewRoutes = require("./routes/reviews")
const favouriteRoutes = require("./routes/favourite")
const authorRoutes = require("./routes/authors")
const genreRoutes = require("./routes/genres")
const adminRoutes = require("./routes/admin")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/books", bookRoutes)
app.use("/reviews", reviewRoutes)
app.use("/favourite", favouriteRoutes)
app.use("/authors", authorRoutes)
app.use("/genres", genreRoutes)
app.use("/admin", adminRoutes)


app.listen(5000, () => console.log("Server running on http://localhost:5000"));