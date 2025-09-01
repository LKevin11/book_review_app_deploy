import { useState } from "react"
import { apiDelete, apiPost, apiPut } from "../api"

function AdminPanel(){
    // Book states
    const [title,setTitle]=useState("")
    const [authorId,setAuthorId]=useState("")
    const [genreId,setGenreId]=useState("")
    const [description,setDescription]=useState("")
    const [bookId, setBookId] = useState("")

    // Author states
    const [author, setAuthor] = useState("")
    const [authorIdForAuthor, setAuthorIdForAuthor] = useState("")

    // Genre states  
    const [genre, setGenre] = useState("")
    const [genreIdForGenre, setGenreIdForGenre] = useState("")

    const token=localStorage.getItem("token")

    function clearBookStates(){
        setTitle("")
        setAuthorId("")
        setGenreId("")
        setDescription("")
        setBookId("")
    }

    function clearAuthorStates(){
        setAuthor("")
        setAuthorIdForAuthor("")
    }

    function clearGenreStates(){
        setGenre("")
        setGenreIdForGenre("")
    }

    async function addBook(){
        await apiPost("/admin/addBook",{token,title,authorId,genreId,description})
        alert("Book added")
        clearBookStates()
    }

    async function updateBook(){
        await apiPut(`/admin/updateBook/${bookId}`,{token,title,authorId,genreId,description})
        alert("Book updated")
        clearBookStates()
    }

    async function deleteBook(){
        await apiDelete(`/admin/deleteBook/${bookId}`,{token})
        alert("Book deleted")
        clearBookStates()
    }

    async function addAuthor() {
        await apiPost("/admin/addAuthor", {token, name: author})
        alert("Author added")
        clearAuthorStates()
    }

    async function updateAuthor() {
        await apiPut(`/admin/updateAuthor/${authorIdForAuthor}`, {token, name: author})
        alert("Author updated")
        clearAuthorStates()
    }

    async function deleteAuthor() {
        await apiDelete(`/admin/deleteAuthor/${authorIdForAuthor}`, {token})
        alert("Author deleted")
        clearAuthorStates()
    }

    async function addGenre() {
        await apiPost("/admin/addGenre", {token, name: genre})
        alert("Genre added")
        clearGenreStates()
    }

    async function updateGenre() {
        await apiPut(`/admin/updateGenre/${genreIdForGenre}`, {token, name: genre})
        alert("Genre updated")
        clearGenreStates()
    }

    async function deleteGenre() {
        await apiDelete(`/admin/deleteGenre/${genreIdForGenre}`, {token})
        alert("Genre deleted")
        clearGenreStates()
    }

    return (
        <div className="container">
            <h1>Admin Panel</h1>
            
            <div className="admin-section">
                <h2>Add Book</h2>
                <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/><br/>
                <input value={authorId} onChange={e=>setAuthorId(e.target.value)} placeholder="AuthorId"/><br/>
                <input value={genreId} onChange={e=>setGenreId(e.target.value)} placeholder="GenreId"/><br/>
                <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description"/><br/>
                <button onClick={addBook}>Add Book</button> 
            </div>
            
            <div className="admin-section">
                <h2>Update Book</h2>
                <input value={bookId} onChange={e=>setBookId(e.target.value)} placeholder="BookId"/><br/>
                <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/><br/>
                <input value={authorId} onChange={e=>setAuthorId(e.target.value)} placeholder="AuthorId"/><br/>
                <input value={genreId} onChange={e=>setGenreId(e.target.value)} placeholder="GenreId"/><br/>
                <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description"/><br/>
                <button onClick={updateBook}>Update Book</button> 
            </div>
            
            <div className="admin-section">
                <h2>Delete Book</h2>
                <input value={bookId} onChange={e=>setBookId(e.target.value)} placeholder="BookId"/><br/>
                <button onClick={deleteBook}>Delete Book</button>
            </div>
            
            <hr/>
            
            <div className="admin-section">
                <h2>Add Author</h2>
                <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author Name"/><br/>
                <button onClick={addAuthor}>Add Author</button> 
            </div>
            
            <div className="admin-section">
                <h2>Update Author</h2>
                <input value={authorIdForAuthor} onChange={e=>setAuthorIdForAuthor(e.target.value)} placeholder="AuthorId"/><br/>
                <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author Name"/><br/>
                <button onClick={updateAuthor}>Update Author</button>
            </div>
            
            <div className="admin-section">
                <h2>Delete Author</h2>
                <input value={authorIdForAuthor} onChange={e=>setAuthorIdForAuthor(e.target.value)} placeholder="AuthorId"/><br/>
                <button onClick={deleteAuthor}>Delete Author</button>
            </div>
            
            <hr/>
            
            <div className="admin-section">
                <h2>Add Genre</h2>
                <input value={genre} onChange={e=>setGenre(e.target.value)} placeholder="Genre Name"/><br/>
                <button onClick={addGenre}>Add Genre</button> 
            </div>
            
            <div className="admin-section">
                <h2>Update Genre</h2>
                <input value={genreIdForGenre} onChange={e=>setGenreIdForGenre(e.target.value)} placeholder="GenreId"/><br/>
                <input value={genre} onChange={e=>setGenre(e.target.value)} placeholder="Genre Name"/><br/>
                <button onClick={updateGenre}>Update Genre</button> 
            </div>
            
            <div className="admin-section">
                <h2>Delete Genre</h2>
                <input value={genreIdForGenre} onChange={e=>setGenreIdForGenre(e.target.value)} placeholder="GenreId"/><br/>
                <button onClick={deleteGenre}>Delete Genre</button> 
            </div>          

        </div>
  )
}

export default AdminPanel