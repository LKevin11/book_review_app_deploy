import { useState, useEffect } from "react"
import { apiPost } from "../api"
import BookCard from "../components/BookCard"

function Profile(){

    const [favourites, setFavourites] = useState([])

    async function fetchFavourites() {
        const token = localStorage.getItem("token")
        if(token){
            const data = await apiPost("/favourite", {token})
            setFavourites(data)
        }
    }

    useEffect(() => {
        fetchFavourites()
        const interval = setInterval(fetchFavourites, 10000)
        return () => clearInterval(interval)
    }, [])

    if (!localStorage.getItem("token")) {
        return <div>You need to login to view your profile.</div>
    }

    return (
        <div className="container">
            <h1>My Profile</h1>
            <h2>Favourites</h2>
            {favourites.length === 0 ? (
                <p>No favourites yet.</p>
            ) : (
            <div>
                {favourites.map(b => <BookCard key={b.id} book={b} />)}
            </div>
            )}
        </div>
    )

}

export default Profile