import React, { useState } from 'react'
import { useNavigate } from 'react-router'
const Signup = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword:"" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credentials.password !== credentials.cpassword){
            alert("passwords do not match!");
        }
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save auth-token and redirect
            localStorage.setItem("token", json.authToken);
            navigate("/")
        } else {
            alert("Invalid credentials");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-3">
            <form onSubmit={handleSubmit} className="my-3">
                <div className="form-group my-3">
                    <label htmlFor="email">Full Name</label>
                    <input type="text" className="form-control" name="name" id="name" value={credentials.name} onChange={onChange} placeholder="Enter Full Name" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} placeholder="Password" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" value={credentials.cpassword} onChange={onChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup
