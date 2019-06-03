import React, {Component} from "react";
import Axios from "axios";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";

class New extends Component {

    state = {
        emails: []
    }

    sendRequest = () => {
        let objectAr = this.state.emails.map(email => {
            return {
                email,
                accepted: false
            }
        })
        let postObj = {
            topic: 'Test meeting 101',
            members: objectAr,
            timeStamp: new Date().getTime()
        }
        console.log(postObj)
        Axios.post('https://cupido-backend.herokuapp.com/api/meetings/new', postObj)
        .then(data => {
            console.log(data)
        })
    }

    emailAdder = (e) => {
        e.preventDefault()
        let emails = this.state.emails; 
        let newEmail = document.getElementById("emailadd").value
        console.log(newEmail)
        emails.push(newEmail)
        console.log(emails)
        this.setState({
            emails: emails
        })
        console.log('State: ', this.state)
        document.getElementById("emailadd").value=''
    }

    // addemail = (e) => {
    //     console.log(e.target.id, e.target.value)
    //     console.log(this.state)
    //     e.target.value=''
    // }

    render() {
        let mailingList = this.state.emails.map(email => {
            return (
                <li key={email}>{email}</li>
            )
        }) 
        return (
            <div className="container">
                <div className="row">
                    <div className="landing-copy col s12 center-align">
                        <h5>Invite by Email</h5>
                        <ul>
                            {mailingList}
                        </ul>
                        <input className="input-field s12 col" id="emailadd" type="text"></input>
                        <button style={{ width: '100%' }} onClick={this.emailAdder} className="btn btn-large waves-effect waves-light hoverable accent-3">Add More</button>
                        <button style={{ width: '100%', marginTop: '5rem' }} onClick={this.sendRequest} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default New
