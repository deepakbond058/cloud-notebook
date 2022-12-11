import React, { useState, useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import noteContext from './Context/NoteContext'
import logo from "./mainlogo.png";
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const { showAlert } = useContext(noteContext);
  const [creds, setcreds] = useState({ name: "", email: "", password: "", cpassword: "" })
  

  const onSumbit = async (e) => {
    e.preventDefault();
    if (creds.password !== creds.cpassword) {
      showAlert("circle-exclamation","Warning", "Passwords do not match, Please try again");
      setcreds({name:creds.name,email:creds.email,password:"",cpassword:""});
    } else {
      try {
        const response = await axios({
          method: 'post',
          url: "api/auth/createuser",
          headers: {
            'Content-Type': 'application/json'   
          },
          data: JSON.stringify({name:creds.name,email:creds.email,password:creds.password})
        })
            const json = await response.data;
            if (response.status===200) {
              //save token and redirect 
              localStorage.setItem('authtoken', json.jsnToken);
              navigate("/");
              showAlert('thumbs-up','Success','Your Account has been created successfully')
            } 
      } catch (error) {
        showAlert("circle-exclamation",'Warning',error.response.data.error);
      }  
    }
  }

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  }

  return (
    <div className='text-center container-sm my-5' style={{maxWidth:"300px"}}>
      <img src={logo} alt="" style={{width:"100%",filter:"invert(1)"}} />
      <h2 className='my-4'>Sign up</h2>
      <form  onSubmit={onSumbit}>
        <div className="mb-3">
 
          <input type="text" placeholder='Name' className="form-control" value={creds.name} name="name" onChange={onChange} id="name" minLength={5} required/>
        </div>

        <div className="mb-3">
     
          <input type="email" className="form-control" placeholder='Email' value={creds.email} name="email" onChange={onChange} id="exampleInputEmail1" required/>
        </div>

        <div className="mb-3">

          <input type="password" className="form-control" placeholder='Password' value={creds.password} name="password" id="exampleInputPassword1" onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
      
          <input type="password" className="form-control" placeholder='Confirm Password' value={creds.cpassword} name="cpassword" id="exampleInputPassword2" onChange={onChange} minLength={5} required/>
        </div>

        <button  type="submit" className="btn btn-primary" style={{width:"100%"}}>Sign up</button>
        <div className='my-2 '>Already have an account? <Link className='text-warning' to="/login">Log in</Link></div>
      </form>
    </div>
  )
}

export default Signup