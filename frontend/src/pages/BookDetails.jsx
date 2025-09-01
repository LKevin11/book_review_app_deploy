import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { apiGet, apiPost } from "../api"

function BookDetails(){

    const {id}=useParams()
    const [book,setBook]=useState(null)
    const [comment,setComment]=useState("")
    const [rating,setRating]=useState(5)

    useEffect(()=>{ apiGet(`/books/${id}`).then(setBook); },[id]);

    async function addReview(){
        const token=localStorage.getItem("token")
        await apiPost("/reviews/add",{token,bookId:id,comment,rating})
        const updated=await apiGet(`/books/${id}`)
        setBook(updated)
        setComment("")
    }

    async function addFav(){
        const token=localStorage.getItem("token")
        await apiPost("/favourite/add",{token,bookId:id})
        alert("Added to favourites")
    }

    if(!book) return <div>Loading...</div>
    const token = localStorage.getItem("token")

    return(
        <div className="container">
            <div className="book-details">
                <h1>{book.title}</h1>
                <p>{book.author}-{book.genre}</p>
                <p>{book.description}</p>

                {token && <div><button onClick={addFav}>Add Favourite</button><br></br></div>}

                {book.reviews.map(r=>
                    <div key={r.id} className="review">
                        {r.comment} (⭐ {r.rating})
                    </div>
                )}

                {
                    token && 
                    <div>
                        <textarea name="comment" value={comment} onChange={e=>setComment(e.target.value)}/><br></br>
                        <input type="number" value={rating} onChange={e=>setRating(e.target.value)} min="1" max="5"/><br></br>
                        <button onClick={addReview}>Add Review</button>
                    </div>
                }
                
            </div>          
        </div>
    )

}

export default BookDetails