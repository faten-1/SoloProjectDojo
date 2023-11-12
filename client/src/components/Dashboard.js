import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const [allRequests, setAllRequests] = useState([])

    const [deleteConfirmation, setDeleteConfirmation] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/requests')
            .then((res) => {
                setAllRequests(res.data)
                console.log(allRequests)
            })
            .catch((err) => { console.log(err) })
    }, [])

    const Delete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete')
        if (isConfirmed) {
            axios.delete(`http://localhost:8000/api/requests/${id}`)
            //--filter
            const filteredRequests = allRequests.filter((eachRequest) => {
                if (eachRequest._id === id) {
                    return false
                } else {
                    return true
                }
            })
            setAllRequests(filteredRequests)
        }
        else {
            setDeleteConfirmation(null)
        }
    }

    const logout = () => {
        axios.post('http://localhost:8000/logout',{},{withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/')
        })
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary-subtle">
                <div className="container-fluid">
                    <h1 className="navbar-brand" >Welcome</h1>
                    <button onClick={logout} className="btn btn-outline-danger" >Logout</button>
                </div>
            </nav>
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid justify-content-start mt-3 ms-3">
                    <h3 className='me-3'>Assistance requests </h3>
                    <Link to={'/createRequest'} className='btn btn-success'>Add Player</Link>

                </div>
            </nav>

            <table className="table mt-4 ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Car registration number</th>
                        <th scope="col">Client name</th>
                        <th scope="col">Insurance</th>
                        <th scope="col">Position</th>
                        <th scope="col">Problem</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {allRequests.map((request, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{request.carNb}</td>
                                <td>{request.client}</td>
                                <td>{request.insurance}</td>
                                <td>{request.position}</td>
                                <td>{request.problem}</td>
                                <td>{request.status}</td>
                                <td >
                                    <Link to={`/viewRequest/${request._id}`} className='btn btn-outline-info me-3'>View</Link>
                                    <button className='btn btn-danger' onClick={() => { Delete(request._id) }}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </table>
        </div>
    )
}

export default Dashboard