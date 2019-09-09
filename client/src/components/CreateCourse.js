import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateCourse extends Component {

    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }
    // Update any changes 
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

    // Handles the submit button to create a new course when its clicked
    submit = e => {
        e.preventDefault();

        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const emailAddress = authUser.emailAddress;
        const password = prompt("Please enter you password to confirm this action");
        const userId = authUser.id;
        const credentials = btoa(`${authUser.emailAddress}:` + password);
        // Display an error message, if the description and title entries are empty
        if (this.state.description === '' || this.state.title === '') {
            this.setState({
                errors: 'Course and Description are required'
            })
        } else {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/courses', 
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${credentials}`
            },
            auth: { 
                username: emailAddress,
                password: password
            },
            data: {
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded,
                userId: userId
            }
        }).then(() => {
                alert(this.state.title + ' was successfully created.')
                this.props.history.push('/');
            }).catch(err => {
                if (err.response.status === 400) {
                    this.setState({
                        errors: err.response.data.message
                    })
                } else if (err.response.status === 401) {
                    this.setState({
                        errors: err.response.data.message
                    })
                }
            })
        }
    }

    // Display the create course page
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                {/* validating errors */}
                    {
                        this.state.errors.length ?
                        (
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        <li>{this.state.errors}</li>
                                    </ul>
                                </div>
                            </div> 
                        ): null
                    }
                </div>
                <form onSubmit={this.submit}>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                                <input 
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="input-title course--title--input"
                                    placeholder="Course title..."
                                    value={this.state.title}
                                    onChange={this.change}
                                />
                            </div>
                            <p>By {authUser.firstName} {authUser.lastName}</p>
                            <div className="course--description">
                                <div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Course description..."
                                        value={this.state.description}
                                        onChange={this.change}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input
                                                id="estimatedTime"
                                                name="estimatedTime"
                                                type="text"
                                                className="course--time--input"
                                                placeholder="Hours"
                                                value={this.state.estimatedTime}
                                                onChange={this.change}
                                            />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                placeholder="List materials..."
                                                value={this.state.materialsNeeded}
                                                onChange={this.change}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Create Course</button>
                        <Link to="/" className="button button-secondary">Cancel</Link>            
                    </div>
                </form>
            </div>
        )
    }
}