import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [ObjErrors, setObjErrors] = useState({});


    const navigate = useNavigate()



    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })



    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/register', user, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                //setIsLoggedIn(true)
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err.response.data.errors)
                const errorResponse = err.response.data.errors
                const ObjE = {}
                for (const key of Object.keys(errorResponse)) {
                    ObjE[key] = errorResponse[key].message
                }
                setObjErrors(ObjE)
            })
    }


    return (
        <div>
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid justify-content-center">
                    <h3 >Register </h3>
                </div>
            </nav>
            <div className="d-flex justify-content-center align-items-center" >
                <div className="container w-25 mt-5">
                    <form onSubmit={submitHandler}>
                        <div class="mb-3">
                            <label class="form-label" >User Name </label>
                            <input
                                className="form-control"
                                type='text'
                                name='username'
                                value={user.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="mb-3" >
                            <label  class="form-label" >Email </label>
                            <input
                            className="form-control"
                                type='text'
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="mb-3" >
                            <label  class="form-label" >Password </label>
                            <input
                            className="form-control"
                                type='password'
                                name='password'
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="mb-3">
                            <label  class="form-label" >Confirm Password </label>
                            <input
                            className="form-control"
                                type='password'
                                name='confirmPassword'
                                value={user.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <button type='submit' class="btn btn-success">Register</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register