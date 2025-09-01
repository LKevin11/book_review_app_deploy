import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Books from "./pages/Books"
import BookDetails from "./pages/BookDetails"
import NavBar from "./components/Navbar"
import Profile from "./pages/Profile"
import AdminPanel from "./pages/AdminPanel"

import "./styles.css"


function App() {


  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Books/>} />
        <Route path="/book/:id" element={<BookDetails/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/admin" element={<AdminPanel/>} />
      </Routes>
    </Router>
  )
}

export default App
