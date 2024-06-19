import React, { useState }  from 'react'
import { useNavigate } from 'react-router'
const Login = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save auth-token and redirect
            localStorage.setItem("token",json.authtoken);
            navigate("/")
        }else{
            alert("Invalid credentials");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary my-3">Submit</button>
        </form>
    )
}

export default Login
