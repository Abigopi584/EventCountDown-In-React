import React from 'react';
import {connect} from 'react-redux';
import {logInCheckInDB,updateLoginState} from '../../../../actions/indexAction';
import {Col, ControlLabel, FormControl, Button} from 'react-bootstrap'
import './login.css'



 class Login extends React.Component{
    constructor(props){
        super(props);
        this.loginForm = this.loginForm.bind(this);
        this.state={
            isLoggedIn:this.props.isloggedInStat,
            userLoginInfo:{
                username:'',
                password:''
            }
        }
    }

    loginForm(evt){
        evt.preventDefault();
        this.setState({
            userLoginInfo:{
                username: this.username.value,
                password:this.password.value
            }
        },this.checkDBForLogin)
    }

     checkDBForLogin(){
         let logInInfo = this.state.userLoginInfo;
         this.props.loginInDB(logInInfo);
         this.props.updLoginState(this.state.userLoginInfo);
         this.props.history.push('/Events');
     }

     componentWillReceiveProps(nextProps){
         this.setState({
             isLoggedIn: nextProps.isLoggedInStat
         })
     }


    render(){
        const formStyle= {
                            display: "block",
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            right: "70px",
                            border: "1px solid darkgrey",
                            borderRadius: "3px",
                            backgroundColor: "antiquewhite",
                            padding: "50px",
                            marginTop: "40px"
                        } ,
      h3Style= {
                textAlign: "center"
               }


        return(
            // there is no need to chk the state of loggedIn here as the whole component is removed wen the state changes
                <div>
                    <Col md={4}>
                    </Col>
                    <Col md={4} >
                        <form style={formStyle} >
                            <h3 style={h3Style}> Login into your Events Account </h3>
                            <br/><br/>
                            <Col md={4}>
                                <ControlLabel bsClass="label"> Username </ControlLabel>
                            </Col>
                            <Col md={6}>
                                <FormControl type="text" inputRef={(input) => this.username = input } />
                            </Col>
                            <br/><br/>
                            <Col md={4}>
                                <ControlLabel bsClass="label"> Password </ControlLabel>
                            </Col>
                            <Col md={6}>
                                <FormControl type="password" inputRef={(input) => this.password = input } />
                            </Col>
                            <br/><br/><br/>
                            <Button onClick={this.loginForm} bsClass="submitButton" > Submit </Button>

                        </form>
                    </Col>
                    <Col md={4}>
                    </Col>
                </div>

        )}
}

const mapStateToProps = (state) =>{
     return {
         isLoggedInStat: state.logInStatus.isLoggedIn
     }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginInDB : (userLogInInfo) => dispatch(logInCheckInDB(userLogInInfo)),
        updLoginState: (userLogInInfo) => dispatch(updateLoginState(userLogInInfo))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);