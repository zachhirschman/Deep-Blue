import React, { Component } from "react";
import { connect } from 'react-redux';
import "./Contributions.scss"

export class Contributions extends Component{

    constructor(props){
        super(props);
        this.state = {
            bio:""
        }
    }

    render(){

        return (
            <div className="contributions-container">
                <div>
                    <h3>Bio:</h3>
                    <input/>
                </div>
    
                <button>Save</button>
                
            </div>
        )
    }
   
}

const mapStateToProps = (state) => {
    return{
        currentUser:state.currentUser
    }
}

export default connect(mapStateToProps, {})(Contributions);

/* 

Contributions <br/>
            Functionality:<br/>
                Send / Receive messages:<br/>
                    Users can message the poster of an issues<br/>
                    Should users be able to message other people in the system?<br/>
                Update Users issues (Resolve, Update Urgency, Update Description, Add Images)<br/>
                View User information<br/>
                    Update Profile picture<br/>
                    Update Bio<br/>
                Show Graph of user contributions over the last 3 months<br/>
                Followed By<br/>

*/