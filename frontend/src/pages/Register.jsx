import { useState } from "react"
import { apiPost } from "../api"
import { useNavigate } from "react-router-dom"

function Register(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()

        try{
            const res = await apiPost("/auth/register", {username, password})
            if(res.success){
                navigate("/login")
            }
        } catch(err){
            setUsername("")
            setPassword("")
            alert(err.message)
        }
    }

    function changeToLog(e){
        setUsername("")
        setPassword("")
        navigate("/login")
    }

    return (
        <div className="container">
            <h1 className="center">Register Page</h1>

            <form onSubmit={handleRegister}>
                <label htmlFor="username">Username: </label>
                <input required type="text" name="username" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/><br/>

                <label htmlFor="password">Password: </label>
                <input required type="password" name="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>

                <button>Register</button>
            </form>

            <br></br>
            <div className="centerBtn">
                <button onClick={changeToLog}>Login</button>
            </div>
            
        </div>
    )

}

export default Register