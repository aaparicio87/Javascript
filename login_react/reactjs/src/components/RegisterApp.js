import React from 'react';
import { Link } from "react-router-dom";

const RegisterApp = ()=> {
    return(
        <div className="form-style">
            <h3 className="pb-3">Sign up.</h3>
             <form>
             <div className="form-group pb-3">
                        <input type="email" name="email" placeholder="Email" 
                        className="form-control" id="email" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group pb-3"> 
                        <input type="password" name="password" placeholder="Password" 
                        className="form-control" id="password"/>
                </div>
                <div className="form-group pb-3"> 
                        <input type="password" name="password1" placeholder="Re-enter password" 
                        className="form-control" id="password1"/>
                </div>
                <div className="pb-2">
                        <button type="submit" className="btn btn-danger w-100 font-weight-bold mt-2">Sign up</button>
                </div>
                <div className="pt-4 text-center">
                    <span>Already have an acount? </span>
                    <Link to="/" className="font-weight-bold text-danger">Log in</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterApp