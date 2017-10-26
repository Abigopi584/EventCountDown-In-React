import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateNewUserInDB,registerUserInfoReq } from '../../../../actions/indexAction.js';


class Register extends Component{
    constructor(props){
        super (props);
        this.state=({
            rOrw: '',
            match: '',
            userInfo: {
                username: '',
                email: '',
                password:'',
                confirmPassword: ''
            },
            registerSuccess: false
        })
        this.comparePasswrd = this.comparePasswrd.bind(this);
        this.submitRegisterForm = this.submitRegisterForm.bind(this);
    }

    // needs to be fixed
    componentWillReceiveProps(nextProps){
        const {regsiterSuccess} = this.props
    }
    submitRegisterForm(evt){
        evt.preventDefault();
        let userInfo = this.state.userInfo;
        this.props.updateNewUserInState(userInfo);
        this.props.updateUserInDB(this.state.userInfo);
    }

    comparePasswrd(event){
        const {registerSuccess} = this.props;
        event.preventDefault();
        let charCode = '';
        let cPwd = this.cPassword.value;
        let pwd =  this.password.value;
        let cPwdLen = cPwd.length;
        let match = false;
        if (cPwdLen > 0){
            if(cPwd === pwd){
                charCode="\u2713";
                match=true;
            }
              else
                charCode="\u00d7"
        }
        this.setState({
            rOrw: charCode,
            match: match,
            userInfo: {
                username: this.username.value,
                email: this.email.value,
                password: this.password.value,
                confirmPassword: this.cPassword.value
            }
        });
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
            width:'80px',
            height: '35px',
            left:"160px",
            fontSize:"16px",
            fontWeight:"400",
            color:'black',
            outline:"1px important",
            backgroundColor:'transparent'
        }
        const submitButtonDisabled={
            border: "1px solid darkgrey",
            position:"relative",
            width:'80px',
            height: '35px',
            left:"160px",
            fontSize:"16px",
            fontWeight:"400",
            color:'darkgrey',
            outline:"1px important",
            backgroundColor:'grey'
        }
        const right ={
            color:'blue',
            fontSize:"20px",
            fontWeight:"200",
            fontStyle:"italic"
        }
        const wrong={
            color:'red',
            fontSize:"20px",
            fontWeight:"200",
            fontStyle:"italic"
        }
        const match = this.state.match;
        return(
            <form className="col-md-12" style={formStyle}    >
                <label className="col-md-4"> Username</label>
                <input className="col-md-6" type="text" ref={(input) => this.username = input} required />
                <br/><br/>
                <label className="col-md-4" > Email </label>
                <input className="col-md-6" type="text" ref={(input) => this.email = input} required />
                <br/><br/>
                <label className="col-md-4" > Password </label>
                <input className="col-md-6" type="password" ref={(input) => this.password = input} required/>
                <br/><br/>
                <label className="col-md-4"> Confirm Password </label>
                <input className="col-md-6" type="password"
                       ref={(input) => this.cPassword = input}
                       required
                       onChange={this.comparePasswrd}  />
                {match ? (
                    <label className="col-md-2" style={right}> {this.state.rOrw} </label>
                ):(
                    <label className="col-md-2" style={wrong}> {this.state.rOrw} </label>
                )}

                <br/><br/>
                {match ? (
                     <button type="submit" style={submitButton} onClick={this.submitRegisterForm} > Submit </button>

                ):(
                    <button type="submit" style={submitButtonDisabled} disabled> Submit </button>

                )}

            </form>
    )
    }
}


const mapStateToProps = (state) =>{
    return{
        registerSuccess: state.RegisterUserInfo.registerSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewUserInState: (userInfo) => dispatch(registerUserInfoReq(userInfo)),
        updateUserInDB: (userInfo) => dispatch(updateNewUserInDB(userInfo))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(Register);
