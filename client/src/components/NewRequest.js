import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const NewRequest = () => {

    const [carNb, setCarNb] = useState("")
    const [client, setClient] = useState("")
    const [insurance, setInsurance] = useState("")
    const [position, setPosition] = useState("")
    const [problem, setProblem] = useState("")
    const [status, setStatus] = useState("Pending")
    const [description, setDescription] = useState("")

    const [ObjErrors, setObjErrors] = useState({});

    const SubmiHandler = (e) => {
        e.preventDefault()
        const newRequest = {
            carNb,
            client,
            insurance,
            position,
            problem,
            status,
            description
        }
        axios.post("http://localhost:8000/api/requests", newRequest)
            .then((res) => {
                console.log("successfully added request")
                setCarNb("")
                setClient("")
                setInsurance("")
                setPosition("")
                setProblem("")
                setStatus("Pending")
                setDescription("")
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
            <nav className="navbar navbar-expand-lg bg-success-subtle">
                <div className="container-fluid">
                    <h1 className="navbar-brand" >Create new Request</h1>
                    <Link to={"/dashboard"} className="btn btn-outline-secondary"
                    >Dashboard</Link>
                </div>
            </nav>

            <div className='d-flex justify-content-center'>
                <form className="container m-3" onSubmit={SubmiHandler}>
                    <div className="row text-center mt-3">
                        <div className="col-6 ">
                            <div className="row mb-3">
                                <label className="col-sm-5 col-form-label">Car registration number</label>
                                <div className="col-sm-5">
                                    <input
                                        type="text" className="form-control"
                                        name="carNb"
                                        onChange={(e) => {
                                            setCarNb(e.target.value);
                                        }}
                                        value={(carNb)}
                                    />
                                    {ObjErrors.carNb ? <p style={{ color: "red" }} >{ObjErrors.carNb}</p> : null}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-5 col-form-label">Client name</label>
                                <div className="col-sm-5">
                                    <input
                                        type="text" className="form-control"
                                        name="client"
                                        onChange={(e) => {
                                            setClient(e.target.value);
                                        }}
                                        value={(client)}
                                    />
                                    {ObjErrors.client ? <p style={{ color: "red" }} >{ObjErrors.client}</p> : null}

                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-5 col-form-label">Insurance company</label>
                                <div className="col-sm-5">
                                    <input
                                        type="text" className="form-control"
                                        name="insurance"
                                        onChange={(e) => {
                                            setInsurance(e.target.value);
                                        }}
                                        value={(insurance)}
                                    />
                                    {ObjErrors.insurance ? <p style={{ color: "red" }} >{ObjErrors.insurance}</p> : null}

                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-5 col-form-label">Car position</label>
                                <div className="col-sm-5">
                                    <input
                                        type="text" className="form-control"
                                        name="position"
                                        onChange={(e) => {
                                            setPosition(e.target.value);
                                        }}
                                        value={(position)}
                                    />
                                    {ObjErrors.position ? <p style={{ color: "red" }} >{ObjErrors.position}</p> : null}

                                </div>
                            </div>
                        </div>
                        <div className="col-6 ">
                            <div className="row mb-3">
                                <label className="col-sm-5 col-form-label">Problem</label>
                                <div className="col-sm-5">
                                    <select className="form-select"
                                        onChange={(e) => setProblem(e.target.value)}>
                                        <option value="">Select a problem</option>
                                        <option value="Accident">Accident</option>
                                        <option value="Mechanical issue">Mechanical issue</option>
                                        <option value="Tire issue">Tire issue</option>
                                        <option value="Battery issue">Battery issue</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {ObjErrors.problem ? <p style={{ color: "red" }} >{ObjErrors.problem}</p> : null}

                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-5 col-form-label">Status</label>
                                <div className="col-sm-5">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="status"
                                            value="Pending"
                                            checked={status === 'Pending'}
                                            onChange={(e)=> setStatus(e.target.value)} />
                                        <label className="form-check-label" >Pending</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio" 
                                            name="status" 
                                            value="Solved"
                                            checked={status === 'Solved'}
                                            onChange={(e)=> setStatus(e.target.value)} />
                                        <label className="form-check-label" >Solved</label>
                                    </div>
                                    {ObjErrors.status ? <p style={{ color: "red" }} >{ObjErrors.status}</p> : null}

                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-5 col-form-label">Description</label>
                                <div className="col-sm-5">
                                    <textarea className="form-control" rows="3"
                                    name='description'
                                    value={description}
                                    onChange={(e)=> setDescription(e.target.value)}></textarea>
                                </div>
                                {ObjErrors.description ? <p style={{ color: "red" }} >{ObjErrors.description}</p> : null}

                            </div>

                            <button type="submit" className="btn btn-primary">Add</button>


                        </div>


                    </div >

                </form>
            </div>




        </div >
    )
}

export default NewRequest