import { Link } from "react-router-dom"

function BookCard({book}){

  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p>{book.author} - {book.genre}</p>
      <Link to={`/book/${book.id}`} className="button">Details</Link>      
    </div>
  );
}

export default BookCard