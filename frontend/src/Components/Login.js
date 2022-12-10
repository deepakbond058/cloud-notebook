import React,{useState,useContext} from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import noteContext from './Context/NoteContext'
import logo from "./mainlogo.png";

function Login() {
    const navigate =useNavigate();
    const {showAlert} = useContext(noteContext);
    const [creds, setcreds] = useState({email:"",password:""}) 

    const onSumbit = async(e)=>{
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/login`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    });
        const json= await response.json();
  
        if(json.success){
            //save token and redirect 
            localStorage.setItem('authtoken',json.jsnToken);           
            navigate("/");
            showAlert('thumbs-up','Success','Login Successful')
        }else{
            showAlert("circle-exclamation",'Warning','Invalid credentials');
        }
    } 

    const onChange=(e)=>{
        setcreds({...creds,[e.target.name]:e.target.value});
    }

    return (
        <div className='text-center container-sm my-5' style={{maxWidth:"300px"}}>
            <img src={logo} alt="" style={{width:"100%",filter:"invert(1)"}} />
            <h2 className='my-4'>Log in</h2>
            <form onSubmit={onSumbit}>
                <div className="mb-3">
                    <input type="email" className="form-control" value={creds.email} name="email" onChange={onChange} id="exampleInputEmail1" placeholder='Email' required / >
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" value={creds.password} name="password" id="exampleInputPassword1" onChange={onChange} minLength={1} placeholder='Password' required/>
                </div>
                <button  type="submit" className="btn btn-primary" style={{width:"100%"}}>Log in</button>
                <div className='my-2'>Don't have an account? <Link className='text-warning' to="/signup">Sign up</Link></div>
            </form>
        </div>
    )
}

export default Login