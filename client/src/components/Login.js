import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()

    const [ObjErrors, setObjErrors] = useState({});


    const [user, setUser] = useState({
        email: "",
        password: ""
    })



    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/login', user, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                //setIsLoggedIn(true)
                navigate('/dashboard')
            })
            .catch((err => {
                console.log(err)
            }))
            
    }


    return (
        <div>
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid justify-content-center">
                    <h3 >Login </h3>
                </div>
            </nav>
            <div className="d-flex justify-content-center align-items-center" >
                <div className="container w-25 mt-5">
                    <form onSubmit={submitHandler}>
                        <div class="mb-3">
                            <label class="form-label">Email address</label>
                            <input
                                type="text" className="form-control"
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                            />

                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input
                                type="password" className="form-control"
                                name='password'
                                value={user.password}
                                onChange={handleChange}
                            />

                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                        <Link to={"/register"} >You don't have an account , create now </Link>
                    </form>
                </div>
            </div>




        </div>
    )
}

export default Login