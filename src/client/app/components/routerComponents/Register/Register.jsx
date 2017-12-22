import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Col,ControlLabel,Form, Button,FormControl} from 'react-bootstrap'
import {updateNewUserInDB,registerUserInfoReq,registerUserFailed ,resetState} from '../../../../actions/indexAction.js';
import './register.css'


class Register extends Component{
    constructor(props){
        super (props);
        this.state=({
            emptyValues:'',
            rOrw: '',
            match: '',
            userInfo: {},
            registerSuccess: false,
            registerFailed: ''
        })
        this.comparePasswrd = this.comparePasswrd.bind(this);
        this.submitRegisterForm = this.submitRegisterForm.bind(this);
        this.clearAnyLabels = this.clearAnyLabels.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            registerSuccess: nextProps.registerSuccess,
            registerFailed: nextProps.registerFailed
        })
    }

    componentDidMount(){
        this.props.resetState();
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
            emptyValues: ''
        })

    }

    submitRegisterForm(evt){
        evt.preventDefault();
        if( this.username.value && this.email.value && this.password.value &&this.cPassword.value  ){
            this.setState({
                userInfo: {
                    username: this.username.value,
                    email: this.email.value,
                    password: this.password.value,
                    confirmPassword: this.cPassword.value
                }
            }, this.updateUserInfo);
        }
    else {
            this.setState({
                emptyValues: 'PLease fill the empty fields'
            })
        }
    }

    updateUserInfo(){
        let userInfo = this.state.userInfo;
        this.props.updateNewUserInState(userInfo);
        this.props.updateUserInDB(this.state.userInfo);
    }


    clearAnyLabels(evt){
        evt.preventDefault();
        this.username.value='';
        this.email.value= '';
        this.password.value='';
        this.cPassword.value='';
        this.setState({
            rOrw: ''
        })
        if (this.state.registerFailed !== ''){
            let registerError = ' ',
                userInfo={};
            this.props.updateNewUserInState(userInfo);
            this.props.registerUserFailed(registerError);
        }
    }

    render(){
        const formStyle= {
            display: "block",
            width: "100%",
            height: "100%",
            position: "relative",
            right: "55px",
            border: "1px solid darkgrey",
            borderRadius: "3px",
            backgroundColor: "antiquewhite",
            padding: "50px",
            marginTop: "40px"
        }
        const match = this.state.match;
        return(
            <div>
                <Col md={4}>
                </Col>
                <Col md={4}>
                    <form style={formStyle} >
                        <h3> Register here!! </h3>
                        <br/> <br/>
                        <ControlLabel> {this.state.registerFailed} </ControlLabel>
                        <ControlLabel> {this.state.emptyValues} </ControlLabel>
                        <br/><br/>
                        <Col md={5}>
                            <ControlLabel bsClass="labelLogin"> Username </ControlLabel>
                        </Col>
                        <Col md={6}>
                            <FormControl type="text" inputRef={(input) => this.username = input } onClick={this.clearAnyLabels}  />
                        </Col>
                        <br/><br/>
                        <Col md={5}>
                            <ControlLabel bsClass="labelLogin"> Email </ControlLabel>
                        </Col>
                        <Col md={6}>
                            <FormControl type="text" inputRef={(input) => this.email = input }  />
                        </Col>
                        <br/><br/>
                        <Col md={5}>
                            <ControlLabel bsClass="labelLogin"> Password </ControlLabel>
                        </Col>
                        <Col md={6}>
                            <FormControl type="password"
                                         minLength={8}
                                         inputRef={(input) => this.password = input }
                                            />
                        </Col>
                        <br/><br/>
                        <Col md={5}>
                            <ControlLabel bsClass="labelLogin"> Confirm Password </ControlLabel>
                        </Col>
                        <Col md={6}>
                            <FormControl type="password"
                                         inputRef={(input) => this.cPassword = input }
                                         onChange={this.comparePasswrd}/>
                        </Col>
                        {match ? (
                            <Col md={1}>
                                <ControlLabel bsClass="right"> {this.state.rOrw} </ControlLabel>
                            </Col>
                        ):(
                            <Col md={1}>
                                <ControlLabel bsClass="wrong"> {this.state.rOrw} </ControlLabel>
                            </Col>
                        )}

                        <br/><br/><br/>
                        {match ? (
                            <Button bsClass="submitButton" onClick={this.submitRegisterForm}> Submit  </Button>

                        ):(
                            <Button bsClass="submitButtonDisabled">Submit</Button>
                        )}

                    </form>
                </Col>
                <Col md={4}>
                </Col>
            </div>


    )
    }
}


const mapStateToProps = (state) =>{
    return{
        registerSuccess: state.RegisterUserInfo.registerSuccess,
        registerFailed: state.RegisterUserInfo.registerError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewUserInState: (userInfo) => dispatch(registerUserInfoReq(userInfo)),
        updateUserInDB: (userInfo) => dispatch(updateNewUserInDB(userInfo)),
        resetState: ()=> dispatch(resetState()),
        registerUserFailed: (registerError)=> dispatch(registerUserFailed(registerError))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(Register);
