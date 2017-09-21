import React from 'react';
import ToggleButton from 'react-toggle-button';
import fetch from 'node-fetch';

export default class Register extends React.Component{
    constructor(props){
        super (props);
        this.submitRegisterForm = this.submitRegisterForm.bind(this);
        this.comparePasswrd = this.comparePasswrd.bind(this);
        this.state={
                loggedIn : this.props.isloggedInStat,
                name:'',
                email:'',
                password:'',
                confirmPassword:'',
                rOrw:'',
                match: false
        };
    }

    submitRegisterForm(evt){
        evt.preventDefault();
        let userInfo= {
                       Name:this.state.name,
                       Email:this.state.email,
                       password: this.state.password,
                       confirmPassword: this.state.confirmPassword
        }
        console.log(JSON.stringify(userInfo));
        $.ajax({
            url: '/registerUser',
            type:'POST',
            cache: false,
            dataType: 'json',
            data: JSON.stringify(userInfo),
        }).done((data) =>{
            console.log(JSON.stringify(data))
        }).fail((err) =>{
            console.log(JSON.stringify(err))
            });

        /*fetch('/registerUser',{
            method: 'post',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(function(response){
                return response.json()
            })
            .then(function(returnAsJson){
                console.log('returnAsJson')
            })
            .catch(function(err){
                console.log(JSON.stringify(err));
            })*/
    }

    comparePasswrd(event){
        event.preventDefault();
        this.setState({
            name:this.name.value,
            email:this.email.value,
            confirmPassword:this.cPasswrd.value,
            password:this.passwrd.value
        });
        let charCode = '';
        let cPwd = this.state.confirmPassword;
        let pwd =  this.state.password;
        let cPwdLen = cPwd.length;
        let match = false
        if (cPwdLen > 0){
            if(cPwd === pwd){
                charCode="\u2713";
                match=true;
            }
              else
                charCode="\u00d7"
        }
        this.setState({
            rOrw: charCode, /*String.fromCharCode(charCode)*/
            match: match
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
                <label className="col-md-4"> Name</label>
                <input className="col-md-6" type="text" ref={(input) => this.name = input} />
                <br/><br/>
                <label className="col-md-4" > Email </label>
                <input className="col-md-6" type="text" ref={(input) => this.email = input} />
                <br/><br/>
                <label className="col-md-4" > Password </label>
                <input className="col-md-6" type="password" ref={(input) => this.passwrd = input} />
                <br/><br/>
                <label className="col-md-4"> Confirm Password </label>
                <input className="col-md-6" type="password"
                       ref={(input) => this.cPasswrd = input}
                       onChange={this.comparePasswrd}  />
                {match ? (
                    <label className="col-md-2" style={right}> {this.state.rOrw} </label>
                ):(
                    <label className="col-md-2" style={wrong}> {this.state.rOrw} </label>
                )}

                <br/><br/>
                {/*<label> Reminder</label>
                <ToggleButton
                    value={ self.state.value || false }
                    onToggle={(value) => {
                        self.setState({
                            value: !value,
                        })
                    }} />*/}
        <button type="submit" style={submitButton} onSubmit={this.submitRegisterForm}> Submit </button>
            </form>
    )
    }
}
