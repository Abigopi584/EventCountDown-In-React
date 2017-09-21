import React from 'react';
import {BrowserRouter as Router,Switch, Route, Link,  } from 'react-router-dom';
import Register from './Register.jsx';
import Login from './login.jsx'
export default class Header extends React.Component{
    constructor(){
        super();
            this.state={
                isLoggedIn: false
            }
    }

    render(){
        const headerStyle ={
            padding: '10px',
            width: "100%",
            backgroundColor:"beige",
            margin:"10px"
        }
        const headingStyle ={
            fontWeight: 200,
            fontSize: '20px',
            color:"darkcyan"
        }
        const linkStyle= {
            float:"right",
            position:'relative',
            top:'5px'
        }

        return(
            <Router>
                <div className="col-md-10" style={headerStyle}>
                    <div className="col-md-5" style={headingStyle}>
                        <h3>An Event to remember </h3>
                    </div>
                    <div className="col-md-5">
                        <Header isLoggedIn={this.state.isLoggedIn} />
                    </div>
                    <div className="col-md-5">
                        <Main isLoggedIn={this.state.isLoggedIn} />
                    </div>
                </div>
            </Router>
        )

        function Header(props){
            const isLoggedIn =  props.isLoggedIn;
            return (
                <div style={linkStyle}>
                    {isLoggedIn ? (
                        <div className="col-md-5" >
                            <nav>
                                <Link to="/logout">Logout</Link>
                            </nav>
                        </div>
                    ):(
                        <div className="col-md-5">
                            <nav>
                                <Link to="/register">Register</Link>
                                <Link to="/login"> Login </Link>
                            </nav>
                        </div>
                    )
                    }
                </div>


            )}// end of header component

        function Main(props){
            const isLoggedIn =props.isLoggedIn;
            return(
                <div>
                    {isLoggedIn ? (
                        <Switch>
                            {console.log('isLoggedIn' + isLoggedIn)}
                            <Route exact path="/logout" component={Logout} />
                        </Switch>
                    ):
                        (
                        <Switch>
                            <Route exact path="/register"
                                   render ={ (props) => (<Register {...props} isloggedInStat={isLoggedIn} />)} />
                            {console.log('isLoggedIn' + isLoggedIn)}
                            <Route exact path="/login"
                                   render ={ (props) => (<Login {...props} isloggedInStat={isLoggedIn}/>)} />/>

                        </Switch>)}


                </div>

            )


        }// end of Main component

        function Logout(){
            return (
                <div>
                    <h3>Logout</h3>
                </div>
            )
        }

    }
//end of render
}
