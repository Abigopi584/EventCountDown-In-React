import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, Link} from 'react-router-dom';

export default class Header extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <Main/>
            </div>
        )

        function Header(){
            return (
                <header>
                    <h3>An Event to remember </h3>
                    <nav>
                        <Link to="/register">Register</Link>
                        <Link to="/login"> Login </Link>
                    </nav>
                </header>
                )}// end of header component

        function Main(){
            return(
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            )
        }// end of Main component

        function Register(){
            return(
                <div>
                    <h2> Register</h2>
                </div>
            )
        }// end of Register

    }
//end of render
}



