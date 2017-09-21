import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header1 from './header/header.jsx';
import Footer from './footer/footer.jsx'

export default class Welcome extends React.Component{
    constructor(){
        super();
    }
    render(){
        const headerStyle={
            width: "100%",
            height:"20%",
        }
        const WelcomeStyle={
            width:"100%",
            height:"100%"
        }
        const footerStyle={
            width:"100%",
            height:"20%"
        }

        return(
            <div>
               <div className="row" style={headerStyle}>
                   <Header1 chkLoginStatus={this.loginStatus} />
               </div>
                <div className="row" style={WelcomeStyle} >
                    <h2> This is the welcome page</h2>
                </div>

               <div className ="row" style={footerStyle}>
                   <Footer/>
               </div>
            </div>
        )

    }

}