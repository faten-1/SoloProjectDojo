import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ViewRequest = (props) => {
    const [request, setRequest] = useState({})

    



    const { id } = useParams();
    useEffect(() => {
        axios.get('http://localhost:8000/api/requests/' + id)
            .then((res) => {
                setRequest(res.data)
            })
            .catch(err => { console.log(err) })
    }, [])

    
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-success-subtle">
                <div className="container-fluid">
                    <h1 className="navbar-brand" >Request </h1>
                    <Link to={"/dashboard"} className="btn btn-outline-secondary"
                    >Dashboard</Link>
                </div>
            </nav>

            <div className="row text-center mt-3">
                <div className="col-6 ">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td><h5>Car registration number:</h5></td>
                                <td>{request.carNb}</td>
                            </tr>
                            <tr>
                                <td><h5>Client name:</h5></td>
                                <td>{request.client}</td>
                            </tr>
                            <tr>
                                <td><h5>Insurance Company:</h5></td>
                                <td>{request.insurance}</td>
                            </tr>
                            <tr>
                                <td><h5>Car position:</h5></td>
                                <td>{request.position}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-6 ">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td><h5>Car problem:</h5></td>
                                <td>{request.problem}</td>
                            </tr>
                            <tr>
                                <td><h5>Request Status:</h5></td>
                                <td>{request.status}</td>
                            </tr>
                            {request.description!=="" && (
                                <tr>
                                    <td><h5>Description</h5></td>
                                    <td> {request.description}</td>
                                </tr>
                            )}
                            <tr>
                                <td></td>
                                <td><Link to={`/editRequest/${request._id}`} className='btn btn-warning me-3'>Edit</Link>
                                    </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>


        </div>
    )
}

export default ViewRequest