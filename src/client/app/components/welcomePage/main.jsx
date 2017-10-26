import React from 'react';
import {connect} from 'react-redux';
import {logInStatus} from '../../../actions/indexAction.js'
// Importing child components
import Header1 from './header/header.jsx';
import Footer from './footer/footer.jsx'
import MainEvent from './main/mainEvent.jsx'

class Welcome extends React.Component{
    constructor(props){
        super(props);
            this.state= ({
                isLoggedIn: false
            })
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
                   <Header1 isloggedIn={this.state.isLoggedIn} />
               </div>
                <div className="row" style={WelcomeStyle} >
                    <MainEvent isloggedIn={this.state.isLoggedIn} />
                </div>
                <div className ="row" style={footerStyle}>
                   <Footer/>
               </div>
            </div>
        )

    }

}


export default Welcome; /* connect(mapStateToProps)(Welcome)*/;