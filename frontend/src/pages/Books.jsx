import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiGet } from "../api"
import BookCard from "../components/BookCard"
import FilterBar from "../components/FilterBar"

function Books(){

    const [books, setBooks] = useState([])
    const [filters, setFilters] = useState({ title:"",author:"",genre:"",sort:"title",order:"ASC",page:1 })
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    useEffect(()=>{ loadBooks(); },[filters]);

    async function loadBooks() {
        const quary = new URLSearchParams(filters).toString()
        try{
            const res = await apiGet(`/books?${quary}`)
            setBooks(res.data)
            setTotal(res.total)
        }
        catch(err){
            alert(err.message)
            navigate("/login")
        }
        
    }

    return (
        <div className="container">
            <h1>Books</h1>

            <FilterBar filters={filters} setFilters={setFilters}/>
            <div>
                {books.map(b=><BookCard key={b.id} book={b}/>)}
            </div>

            <div className="pagination">
                <button disabled={filters.page<=1} onClick={()=>setFilters({...filters,page:filters.page-1})}>Prev</button>
                <button disabled={filters.page*20>=total} onClick={()=>setFilters({...filters,page:filters.page+1})}>Next</button>
            </div>
        </div>
    )

}

export default Books