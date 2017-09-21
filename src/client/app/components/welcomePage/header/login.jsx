import React from 'react';


export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.loginForm = this.loginForm.bind(this);
        this.state={
            isLoggedIn: this.props.isloggedInStat,
            email:'',
            password:''
        }
    }
    componentDidMount(){
          console.log('isloggedInStat '+ this.state.isLoggedIn);
    }

    loginForm(evt){
        evt.preventDefault();
        this.setState({
            email: this.email.value,
            password:this.password.value
        })
        let loginInfo = {
            email:this.state.email,
            password:this.state.password
        }
        $.ajax({
            url: '/loginForm',
            type:'POST',
            cache: false,
            dataType: 'json',
            data: loginInfo,
        }).done((data) =>{
            this.setState({
                isLoggedIn: true
        });

        }).fail((err) =>{
            console.log(JSON.stringify(err))
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
            left:"120px",
            fontSize:"16px",
            fontWeight:"400",
            outline:"1px important"
        }
        return(
        (this.state.isLoggedIn ? (
            <h2> Welcome {this.state.email }</h2>
        ):
            (
                <form className="col-md-12" style= {formStyle} >
                    <label className="col-md-4 col-md-offset-2" > EMail</label>
                    <input className="col-md-6" type="text" ref={(input) => this.email = input} />
                    <br/><br/>
                    <label className="col-md-4 col-md-offset-2"> Password </label>
                    <input className="col-md-6" type="text" ref={(input) => this.password = input} />
                    <br/><br/>
                    <button type="submit" style={submitButton} onClick={this.loginForm} > Submit </button>
                </form>
            ))


        )
    }
}