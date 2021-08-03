import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

const LoginApp = ()=>{
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const user={
      email: email,
      password: password,
     
    }
    const postLogin = ()=> {
      axios.post("http://localhost:8000/api/signin", user)
      .then(res => {
        if(res.status === 200){
          setLoggedIn(true);
        }
        else{
          setIsError(true);
        }
      })
      .catch(err=>{
        setIsError(true);
      });
    }
  
    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return(

        <div className="form-style">
            <h3 className="pb-3">Log in.</h3>
            <form onSubmit={postLogin}>
                <div className="form-group pb-3">
                        <input type="email" name="email" placeholder="Email" 
                        className="form-control" id="email" aria-describedby="emailHelp" onChange={e => setUserName(e.target.value)}/>
                </div>
                <div className="form-group pb-3"> 
                        <input type="password" name="password" placeholder="Password" 
                        className="form-control" id="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center"><input name="" type="checkbox" value="" />
                        <span className="pl-2">Keep me looged in</span>
                    </div>
                </div>
                <div className="pb-2">
                        <button type="submit" className="btn btn-danger w-100 font-weight-bold mt-2">Log in</button>
                </div>
                <div className="pt-4 text-center">
                        <span>Don't have an account? </span>
                        <Link to="/register" className="font-weight-bold text-danger">Sign Up</Link>
                </div>
                <div className="pt-4 text-center">
                <Link to="" className="font-weight-bold text-danger">Forgot password?</Link>
               
                </div>
                <div>
                { isError &&<span>The username or password provided were incorrect!</span> }
                </div>

            </form>
        </div>
    )
}

export default LoginApp

