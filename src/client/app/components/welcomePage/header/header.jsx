import React from 'react';
import {Router,Switch, Route, Link } from 'react-router-dom';
import history from '../../../../../history.js';
import {connect} from 'react-redux';
import Register from './Register.jsx';
import Login from './login.jsx';
import Logout from './logout.jsx';

 class Header extends React.Component{
    constructor(props){
        super(props);
            this.state={
                username:'',
                isLoggedIn:''
            }
    }

    componentWillReceiveProps(nextProps){
              const {isLoggedInStat, username} = this.props;
              this.setState({
                    isLoggedIn: nextProps.isLoggedInStat,
                    username:nextProps.username
                 })
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
            <Router history={history} >
                {this.state.isLoggedIn? (
                    <div className="col-md-10" style={headerStyle}>
                        <div className="col-md-5" style={headingStyle}>
                            <h2>An Event to remember  </h2>
                            <h3>Welcome {this.state.username} </h3>
                        </div>
                        <div className="col-md-5">
                            <Header isLoggedIn={this.state.isLoggedIn} />
                        </div>
                        <div className="col-md-5">
                            <Main isLoggedIn={this.state.isLoggedIn} />
                        </div>
                    </div>
                ):(
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
                )}

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

                                <Link to="/login"> Login </Link>
                                <Link to="/register"> Register </Link>
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
                            <Route exact path="/logout"
                                    render={(props) => (<Logout {...props} isLoggedInStat={isLoggedIn} />)}/>
                        </Switch>
                    ):
                        (
                        <Switch>
                            <Route exact path="/login"
                                   render ={ (props) => (<Login {...props} isloggedInStat={isLoggedIn}/>)} />
                            <Route exact path="/register"
                                   render ={ (props) => (<Register {...props} isloggedInStat={isLoggedIn}/>)} />
                        </Switch>)}

                </div>
            )
        }// end of Main component



    }
//end of render
}

const mapStateToProps = (state) =>{
    console.log('state from header page '+ JSON.stringify(state) )
    return {
        isLoggedInStat: state.logInStatus.isLoggedIn,
        username: state.updateLogInState.username
    }
}

export default connect(mapStateToProps)(Header);
