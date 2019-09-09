import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        firstName:'',
        lastName:'',
        emailAddress:'',
        password:'',
        confirmPassword: '',
        errors: []
    }

    // update any changes
    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }

    // handles the submit button to sign up users and redirects them to the authenticated page
    submit = () => {
        const { context } = this.props;
    
        const {
          firstName, 
          lastName,
          emailAddress,
          password,
          confirmPassword
        } = this.state;
    
        // New user payload
        const user = {
          firstName,
          lastName,
          emailAddress,
          password,
        };

       // Making sure the passwords matches before creating the user profile 
      if (password !== confirmPassword) {
          this.setState(() => {
            return { errors: ['Passwords must match']}})
      } else {
      context.data.createUser(user)
        .then( errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            context.actions.signIn(emailAddress, password)
              .then(() => {
                this.props.history.push('/authenticated');
              });
          }
        })
        .catch( err => {
          console.log(err);
          this.props.history.push('/error'); 
        });
      }
    }
  
    // handles the cancel button
    cancel = () => {
      this.props.history.push('/');
    }

    // displays the sign up page
    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
        } = this.state

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign Up"
                            elements={() =>(
                                <React.Fragment>
                                    <input 
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={firstName}
                                        placeholder="First Name"
                                        onChange={this.change} />
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={lastName}
                                        placeholder="Last Name"
                                        onChange={this.change} />
                                    <input
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        value={emailAddress}
                                        placeholder="Email Address"
                                        onChange={this.change} />
                                    <input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={this.change} />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        placeholder="Confirm Password"
                                        onChange={this.change} />
                                </React.Fragment>
                            )}/>
                        <p>
                            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    }
    