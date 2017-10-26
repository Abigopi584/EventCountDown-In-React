import React from 'react';
import {connect} from 'react-redux';
import {logInCheckInDB,updateLoginState} from '../../../../actions/indexAction';


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
        const {loginInDB,isLoggedInStat } =this.props;
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
         this.updateUsernameinState();
     }


     updateUsernameinState(){
         this.props.updLoginState(this.state.userLoginInfo);
     }

     componentWillReceiveProps(nextProps){
         this.setState({
             isLoggedIn: nextProps.isLoggedInStat
         })
     }


    render(){
        const formStyle= {
            display:"block",
            width: "100%",
            height:"65%",
            position: "relative",
            right: "130px",
            border:"1px solid darkgrey",
            borderRadius: "3px",
            backgroundColor:"lavenderblush",
            paddingTop:"10px",
            paddingBottom: "10px",
            /*opcacity:"0.8",*/
            outline: "1px important",
        }
        const submitButton={
            border: "1px solid darkgrey",
            position:"relative",
            left:"120px",
            fontSize:"16px",
            fontWeight:"400",
            outline:"1px important"
        }
        return(
            // there is no need to chk the state of loggedIn here as the whole component is removed wen the state changes
            (this.state.isLoggedIn ? (
            <h2> Welcome {this.state.userLoginInfo.username }</h2>
        ):
            (
                <form className="col-md-12" style= {formStyle} >
                    <label className="col-md-4 col-md-offset-2" > Username</label>
                    <input className="col-md-6" type="text" ref={(input) => this.username = input} />
                    <br/><br/>
                    <label className="col-md-4 col-md-offset-2"> Password </label>
                    <input className="col-md-6" type="password" ref={(input) => this.password = input} />
                    <br/><br/>
                    <button type="submit" style={submitButton} onClick={this.loginForm} > Submit </button>
                </form>
            ))
        )
    }
}

const mapStateToProps = (state) =>{
/*     console.log('state from login page '+ JSON.stringify(state) )*/
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