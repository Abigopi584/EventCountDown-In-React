import React from 'react';


export default class General extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const img={
            width:'40%',
            height:'50%'
        }
        const mainContent ={
            width: '60%',
            height: '60%',
            textAlign: 'justify',
            float: 'right',
            fontSize:'18px',
            fontcolor: 'violet',
        }
        const general={
            padding:'10px',
            marginLeft:'10px'
        }
        const h3={
            color:'darkgrey'
        }
        return(
            <div>
                <div className="col-md-12" style={general} >
                    <div className="col-md-4" style={img} >
               {/* Issue to be fixed -- image not getting displayed.   */}
                        <img src={require('./images/iforgotImage.jpg')} alt="iforgot"/>
                    </div>
                    <div className="col-md-8" style={mainContent} >
                        <h3> From a Normal Human Being</h3>
                        <br/>
                        <p>
                            I'm not the greatest at remembering dates. I sometimes forget the birthdays of my friends
                            and even family members by like a day or two, and sometimes they forget mine by the same,
                            but it doesn't bother me. And I've usually remembered my wife's birthdays and the anniversaries
                            and so forth...until a few days ago.
                        </p>
                        <p>
                            But I forgot. I've had a busy week with work and I forgot her birthday. It wasn't like
                            I forgot what day it was, it's just that I called her after work and it hadn't dawned on me what
                            day it was. We didn't really even talk about it beforehand, either. A simple reminder or hint a
                            day or two before and I would've remembered for sure, but I didn't this time. Short of it is,
                            she's "disappointed"...which is, as any married person knows, a hell of a lot worse than "pissed."
                        </p>
                        <p>

                            Ugh. Any ideas?
                        </p>
                        <p>
                            To have a happy life and time ahead remember to register/ Login and let you remind
                            important days in your life
                        </p>
                    </div>
                </div>

        </div>
        )
    }
}