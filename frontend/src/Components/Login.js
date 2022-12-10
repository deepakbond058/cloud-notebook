import React, { useState, useContext } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import noteContext from './Context/NoteContext'
import logo from "./mainlogo.png";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const { showAlert } = useContext(noteContext);
    const [creds, setcreds] = useState({ email: "", password: "" })

    const onSumbit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios({
                method: 'post',
                url: "api/auth/login",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(creds)
            })
            const json = await response.data;
            if (response.status===200) {
                //save token and redirect 
                localStorage.setItem('authtoken', json.jsnToken);
                navigate("/");
                showAlert('thumbs-up', 'Success', 'Login Successful')
            }
        }catch (error){
            showAlert("circle-exclamation", 'Warning',error.response.data.error);
        }
    }

    const onChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value });
    }

    return (
        <div className='text-center container-sm my-5' style={{ maxWidth: "300px" }}>
            <img src={logo} alt="" style={{ width: "100%", filter: "invert(1)" }} />
            <h2 className='my-4'>Log in</h2>
            <form onSubmit={onSumbit}>
                <div className="mb-3">
                    <input type="email" className="form-control" value={creds.email} name="email" onChange={onChange} id="exampleInputEmail1" placeholder='Email' required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" value={creds.password} name="password" id="exampleInputPassword1" onChange={onChange} minLength={1} placeholder='Password' required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Log in</button>
                <div className='my-2'>Don't have an account? <Link className='text-warning' to="/signup">Sign up</Link></div>
            </form>
        </div>
    )
}

export default Login