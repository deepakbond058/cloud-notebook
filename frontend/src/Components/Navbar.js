import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from './Context/NoteContext';


function Navbar() {
    let navigate = useNavigate();
    const userButton = useRef(null);
    const { showAlert,getUser } = useContext(noteContext);
    let location = useLocation();
    const [parsedUser, setParseduser] = useState({_id:"",name:"",email:"",date:""});

    const handleUserIcon = () => {
        getUser().then(result=>{
            setParseduser(result);
        });
        
        
        userButton.current.click();
    }

    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        navigate('/login');
        showAlert('thumbs-up', 'Success', 'Logged Out Successfully')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>

                        </ul>
                        <div className="d-flex">{
                            localStorage.getItem('authtoken') ?
                                <>
                                    <i className="fa-solid fa-user-tie mx-2 mt-1" onClick={handleUserIcon} style={{fontSize: "2rem" }}></i>
                                    <button className="btn btn-primary mx-1" onClick={handleLogout} role="button">Logout</button>
                                </>
                                :
                                <>
                                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                                </>
                        }
                        </div>
                    </div>
                </div>
            </nav>

            <button className="btn btn-primary" ref={userButton} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" hidden={true}>Enable body scrolling</button>

            <div className="offcanvas offcanvas-start bg-dark" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">User Details</h5>
                    <button type="button " className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <i className="fa-solid fa-user-graduate text-center" style={{ fontSize: "5rem", display: "block" }}></i>
                    <table className="table table-striped table-dark mt-4">
                        <tbody>
                            <tr>
                                <th scope="col">Name</th>
                                <td>{parsedUser.name}</td>
                            </tr>
                            <tr>
                                <th scope="col">id</th>
                                <td>{parsedUser._id}</td>
                            </tr>
                            <tr>
                                <th scope="col">Email</th>
                                <td>{parsedUser.email}</td>
                            </tr>
                            <tr>
                                <th scope="col">Joined</th>
                                <td>{new Date(parsedUser.date).toGMTString()}</td>
                            </tr>
                        </tbody>
                        
                    </table>

                </div>
            </div>
        </>
    )
}

export default Navbar