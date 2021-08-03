import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginApp from './LoginApp'
import HomeApp from './HomeApp'
import RegisterApp from './RegisterApp'
import photo from '../helpers/foto.jpg'

const AuthApp =()=>{
    return(
        <div className="container">
            <div className="row m-5 no-gutters shadow-lg">
                <div className="col-md-6 d-none d-md-block">
                <img className="img-fluid img-bg" alt="" src={photo}/>
                </div>
                <Router>
                <div className="col-md-6 bg-white p-5">
                    <Switch>
                        <Route exact path="/">
                            <LoginApp/>
                        </Route>
                        <Route path="/register">
                            <RegisterApp/>
                        </Route>
                        <Route path="/dashboard">
                            <HomeApp/>
                        </Route>
                    </Switch>
                    
                </div>
                </Router>
            </div>
        </div>
    )
}

export default AuthApp;