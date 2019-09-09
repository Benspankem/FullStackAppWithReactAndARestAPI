import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
        courses: []
    };
}
    
    componentDidMount() {
// Used axios get request to retrieve the list of courses
        axios.get('http://localhost:5000/api/courses/')
            .then(response => { 
                this.setState({
                    courses: response.data.courses}) })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
            })
    }

    // Display the courses to the homepage
    render() {
        return (
    // Convert the markup from index.html to JSX
            <div className="bounds">
            {/* link to its respective "Course Detail" screen */}
                {this.state.courses.map((course) => (
                    <div className="grid-33" key={course.id}>
                        <Link className="course--module course--link" to={'/courses/' + course.id}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    </div>
                ))}
                <div className="grid-33"> 
                {/* Link to render create courses */}
                    <Link className="course--module course--add--module" to="/courses/create">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>
                            New Course
                        </h3>
                    </Link>
                </div>
            </div>
       )}
}

