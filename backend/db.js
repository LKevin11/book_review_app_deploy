const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./books.db')
const hash = require("bcrypt")

db.serialize(() => {

    db.run("DROP TABLE IF EXISTS favourites")
    db.run("DROP TABLE IF EXISTS reviews")
    db.run("DROP TABLE IF EXISTS books")
    db.run("DROP TABLE IF EXISTS authors")
    db.run("DROP TABLE IF EXISTS genres")
    db.run("DROP TABLE IF EXISTS users")
    
    // Create tables
    db.run(
        `
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        isAdmin INTEGER DEFAULT 0
        )
        `
    )

    db.run(
        `
        CREATE TABLE IF NOT EXISTS authors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
        )
        `
    )

    db.run(
        `
        CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
        )
        `
    )

    db.run(
        `
        CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        authorId INTEGER,
        genreId INTEGER,
        description TEXT,
        FOREIGN KEY(authorId) REFERENCES authors(id),
        FOREIGN KEY(genreId) REFERENCES genres(id)
        )
        `
    )

    db.run(
        `
        CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        bookId INTEGER,
        rating INTEGER,
        comment TEXT,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(bookId) REFERENCES books(id)
        )
        `
    )

    db.run(
        `
        CREATE TABLE IF NOT EXISTS favourites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        bookId INTEGER,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(bookId) REFERENCES books(id)
        )
        `
    )

    const adminPass = hash.hashSync("admin123", 10)
    const userPass = hash.hashSync("user123", 10)

    db.run("INSERT INTO users (username, password, isAdmin) VALUES (?,?,1)", ["admin", adminPass])
    db.run("INSERT INTO users (username, password, isAdmin) VALUES (?,?,0)", ["john", userPass])
    db.run("INSERT INTO users (username, password, isAdmin) VALUES (?,?,0)", ["sarah", userPass])

    // Insert authors
    db.run("INSERT INTO authors (name) VALUES (?)", ["J.K. Rowling"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["J.R.R. Tolkien"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["George R.R. Martin"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["Suzanne Collins"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["Stephen King"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["Jane Austen"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["Harper Lee"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["F. Scott Fitzgerald"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["Dan Brown"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["Agatha Christie"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["George Orwell"])
    db.run("INSERT INTO authors (name) VALUES (?)", ["Ernest Hemingway"])

    // Insert genres
    db.run("INSERT INTO genres (name) VALUES (?)", ["Fantasy"])
    db.run("INSERT INTO genres (name) VALUES (?)", ["Adventure"])
    db.run("INSERT INTO genres (name) VALUES (?)", ["Drama"])
    db.run("INSERT INTO genres (name) VALUES (?)", ["Science Fiction"])
    db.run("INSERT INTO genres (name) VALUES (?)", ["Horror"])
    db.run("INSERT INTO genres (name) VALUES (?)", ["Romance"])
    db.run("INSERT INTO genres (name) VALUES (?)", ["Mystery"])
    db.run("INSERT INTO genres (name) VALUES (?)", ["Classic"])
    db.run("INSERT INTO genres (name) VALUES (?)", ["Dystopian"])

    // Insert books
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Harry Potter and the Philosopher's Stone", 1, 1, "The first book in the Harry Potter series."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["The Hobbit", 2, 2, "A hobbit's adventurous journey to reclaim a treasure."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["A Game of Thrones", 3, 3, "First book of A Song of Ice and Fire."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["The Hunger Games", 4, 9, "In a dystopian future, teenagers fight to the death in a televised event."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Catching Fire", 4, 9, "Second book in The Hunger Games trilogy."]);
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Mockingjay", 4, 9, "Final book in The Hunger Games trilogy."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["The Shining", 5, 5, "A family heads to an isolated hotel for the winter where a sinister presence influences the father."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["It", 5, 5, "Seven adults return to their hometown to confront a nightmare they first stumbled on as teenagers."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Pride and Prejudice", 6, 6, "A romantic novel of manners that depicts the emotional development of protagonist Elizabeth Bennet."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["To Kill a Mockingbird", 7, 8, "The story of racial inequality and the loss of innocence in the American South."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["The Great Gatsby", 8, 8, "A story of wealth, love, and the American Dream in the Jazz Age."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["The Da Vinci Code", 9, 7, "A murder mystery that reveals a historical secret about Jesus Christ and Mary Magdalene."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Angels & Demons", 9, 7, "Robert Langdon works to prevent a terrorist act against the Vatican."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Murder on the Orient Express", 10, 7, "Hercule Poirot investigates a murder aboard a stranded train."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["1984", 11, 9, "A dystopian novel about totalitarianism, surveillance, and thought control."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Animal Farm", 11, 9, "An allegorical novella about the Russian Revolution and Stalinist era."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["The Old Man and the Sea", 12, 3, "An aging fisherman's struggle with a giant marlin far out in the Gulf Stream."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Harry Potter and the Chamber of Secrets", 1, 1, "The second book in the Harry Potter series."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Harry Potter and the Prisoner of Azkaban", 1, 1, "The third book in the Harry Potter series."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Harry Potter and the Goblet of Fire", 1, 1, "The fourth book in the Harry Potter series."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Harry Potter and the Order of the Phoenix", 1, 1, "The fifth book in the Harry Potter series."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Harry Potter and the Half-Blood Prince", 1, 1, "The sixth book in the Harry Potter series."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Harry Potter and the Deathly Hallows", 1, 1, "The seventh and final book in the Harry Potter series."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["The Fellowship of the Ring", 2, 1, "First volume of The Lord of the Rings."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["The Two Towers", 2, 1, "Second volume of The Lord of the Rings."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["The Return of the King", 2, 1, "Third volume of The Lord of the Rings."]);
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["A Clash of Kings", 3, 1, "Second book of A Song of Ice and Fire."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["A Storm of Swords", 3, 1, "Third book of A Song of Ice and Fire."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["A Feast for Crows", 3, 1, "Fourth book of A Song of Ice and Fire."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["A Dance with Dragons", 3, 1, "Fifth book of A Song of Ice and Fire."])
    db.run("INSERT INTO books (title, authorId, genreId, description) VALUES (?,?,?,?)",
        ["Carrie", 5, 5, "A high school outcast with telekinetic powers gets revenge on her bullies."])

    // Insert reviews
    db.run("INSERT INTO reviews (userId, bookId, rating, comment) VALUES (?,?,?,?)", [2, 1, 5, "Amazing book!"])    
    db.run("INSERT INTO reviews (userId, bookId, rating, comment) VALUES (?,?,?,?)", [3, 2, 4, "Great adventure story."])
    db.run("INSERT INTO reviews (userId, bookId, rating, comment) VALUES (?,?,?,?)", [2, 3, 5, "Epic fantasy!"])
    db.run("INSERT INTO reviews (userId, bookId, rating, comment) VALUES (?,?,?,?)", [3, 4, 5, "Couldn't put it down!"])
    db.run("INSERT INTO reviews (userId, bookId, rating, comment) VALUES (?,?,?,?)", [2, 5, 4, "Great sequel!"])
    db.run("INSERT INTO reviews (userId, bookId, rating, comment) VALUES (?,?,?,?)", [3, 6, 5, "Perfect ending to the trilogy."])
    db.run("INSERT INTO reviews (userId, bookId, rating, comment) VALUES (?,?,?,?)", [2, 7, 4, "Scary but brilliant."])
    db.run("INSERT INTO reviews (userId, bookId, rating, comment) VALUES (?,?,?,?)", [3, 8, 5, "A masterpiece of horror."])

    // Insert favourites
    db.run("INSERT INTO favourites (userId, bookId) VALUES (?,?)", [2, 1])
    db.run("INSERT INTO favourites (userId, bookId) VALUES (?,?)", [3, 2])
    db.run("INSERT INTO favourites (userId, bookId) VALUES (?,?)", [2, 4])
    db.run("INSERT INTO favourites (userId, bookId) VALUES (?,?)", [3, 8])

})

module.exports = db