import React from 'react';
import { Router,Switch, Route, Link, Redirect,NavLink,HashRouter} from 'react-router-dom';
import history from '../../../history.js';
import {connect} from 'react-redux';
import Home from './routerComponents/Home/home.jsx';
import Events from './routerComponents/Events/DisplayEvents.jsx';
import LogOut from './routerComponents/Logout/logout.jsx';
import Register from './routerComponents/Register/Register.jsx';
import LogIn from './routerComponents/LogIn/login.jsx';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn:this.props.isLoggedIn,
            username: this.props.username
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isLoggedIn: nextProps.isLoggedIn,
            username: nextProps.username
        })
    }
    render(){
        const linkCss ={
            margin:"10px",
            padding: "10px",
            backgroundColor: "cornsilk",
            textAlign:"center"
        },
        routeStyles= {
            paddingTop: "8px",
            paddingBottom:"8px",
            paddingRight:"25px",
            fontSize: "20px",
            fontColor: "cadetblue",
            fontFamily: ' Comic Sans MS',
        }
        return(
            <Router history={history} >
                    <div style={linkCss}>
                        <div>
                            <Header isLoggedIn={this.state.isLoggedIn} />
                        </div>
                        <div >
                            <Main isLoggedIn={this.state.isLoggedIn} />
                        </div>
                    </div>

            </Router>
        )


        function Header(props){
            const isLoggedIn =  props.isLoggedIn;
            return (
                <div >
                    {isLoggedIn ? (
                        <div >
                            <nav>
                                <NavLink to="/Home" style={routeStyles}>Home</NavLink>
                                <NavLink to="/Events" style={routeStyles}>Events</NavLink>
                                <NavLink to="/logout" style={routeStyles}>Logout</NavLink>
                            </nav>
                        </div>
                    ):(
                        <div>
                            <nav>
                                <NavLink to="/" style={routeStyles}> Home </NavLink>
                                <NavLink to="/login" style={routeStyles}> Login </NavLink>
                                <NavLink to="/register" style={routeStyles}> Register </NavLink>
                            </nav>

                        </div>
                    )
                    }
                </div>
            )}

        function Main(props){
            const isLoggedIn =props.isLoggedIn;
            return(
                <div>
                    {isLoggedIn ? (
                        <Switch>
                            <Route  path="/Home"
                                   render ={(props) => (<Home {...props}/>)} />
                            <Route exact  path="/Events"
                                    render ={(props)=> (<Events {...props} isloggedInStat={isLoggedIn} username={props.username}/>)} />
                            <Route  path="/logout"
                                   render={(props) => (<LogOut {...props} isLoggedInStat={isLoggedIn} />)}/>
                        </Switch>
                    ):
                        (
                            <Switch>
                                <Route exact path="/"
                                       render ={ (props) => (<Home {...props} />)} />
                                <Route  path="/login"
                                       render ={ (props) => (<LogIn {...props} isloggedInStat={isLoggedIn}/>)} />
                                <Route  path="/register"
                                       render ={ (props) => (<Register {...props} isloggedInStat={isLoggedIn}/>)} />
                            </Switch>)}

                </div>
            )
        }//

    }

}
const mapStateToProps = (state)=> {
    console.log('State from Main Page ' + JSON.stringify(state))
    return {
        isLoggedIn: state.logInStatus.isLoggedIn,
        username: state.logInStatus.userInfo.username
    }

}

export default connect(mapStateToProps)(Main);