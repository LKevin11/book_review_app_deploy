import { useState } from "react"
import { apiPost } from "../api"
import { useNavigate } from "react-router-dom"

function Login(){
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const res = await apiPost("/auth/login", { username, password })
            if (res.token) {
                localStorage.setItem("token", res.token)
                navigate("/")
            }
        } 
        catch (err) {
            setUsername("")
            setPassword("")
            alert(err.message)
        }

    }

    function changeToReg(e){
        setUsername("")
        setPassword("")
        navigate("/register")
    }

    return (
        <div className="container">
            <h1 className="center">Login Page</h1>
            <br/>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username: </label>
                <input name="username" type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username"/><br/>
                
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/><br/>

                <button>Login</button>
            </form>

            <br></br>
            <div className="centerBtn">
                <button onClick={changeToReg}>Register</button>
            </div>
            
        </div>    
    )

}

export default Login