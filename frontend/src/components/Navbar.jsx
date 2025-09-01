import { Link, useNavigate } from "react-router-dom"

function NavBar(){

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    let isAdmin=false

    if(token){
        try{isAdmin=JSON.parse(atob(token.split(".")[1] ) ).isAdmin } catch {}
    }

    function logout(){
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <nav>
            <div className="container">
                <div>
                   <Link to="/">Books</Link>
                </div>
                <div>
                    {!token && <Link to="/login">Login</Link>}
                    {!token && <Link to="/register">Register</Link>}
                    {token && isAdmin ? <Link to="/admin">Admin</Link> : <></>}
                    {token && <Link to="/profile">Profile</Link>}
                    {token && <button onClick={logout}>Logout</button>}
                </div>             
            </div>
        </nav>
    )

}

export default NavBar