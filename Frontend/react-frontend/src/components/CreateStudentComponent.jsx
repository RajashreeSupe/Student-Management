import React, { Component } from 'react';
import StudentService from '../services/StudentService';

//So we can put state and lifecycle methods and render the add/update student form.
class CreateStudentComponent extends Component {
    constructor(props) {
        super(props);

        //state holds the values shown in the form (controlled inputs).
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            course: ''
        };

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeCourseHandler = this.changeCourseHandler.bind(this);
        this.saveOrUpdateStudent = this.saveOrUpdateStudent.bind(this);
    }
//componentDidMount is the right place to fetch initial data.
    componentDidMount() {
        //If id is '_add', it does nothing (we’re creating a new student).
        if (this.state.id === '_add') return;
//Otherwise it calls StudentService.getStudentById(id) to fetch the existing student and fills the form (setState) with the returned data.
        StudentService.getStudentById(this.state.id).then(res => {
            let student = res.data;
            this.setState({
                firstName: student.firstName,
                lastName: student.lastName,
                emailId: student.emailId,
                course: student.course
            });
        });
    }
//A function that checks form values are present and the email looks valid.
    validateForm() {
        const { firstName, lastName, emailId, course } = this.state;

        if (!firstName || !lastName || !emailId || !course) {
            alert("All fields are required!");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailId)) {
            alert("Please enter a valid email address!");
            return false;
        }

        return true;
    }
//e.preventDefault() stops the browser from reloading the page when the form button is clicked.
    saveOrUpdateStudent = (e) => {
        e.preventDefault();
//“Stop! Don’t continue if the form is invalid.”
        if (!this.validateForm()) return;

        let student = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            course: this.state.course
        };

        if (this.state.id === '_add') {
            StudentService.createStudent(student).then(res => {
                alert("Student added successfully!");
                //“Move to the Students page after saving or canceling. without reloading the website.”
               // props.match → info about URL
              //props.location → info about current page
                //props.history → allows us to go forward/back/change pages
                this.props.history.push('/students');
            });
        } else {
            StudentService.updateStudent(student, this.state.id).then(res => {
                alert("Student updated successfully!");
                this.props.history.push('/students');
            });
        }
    };
//Each handler updates one field in the component state when the user types in the input.
    changeFirstNameHandler = (event) => this.setState({ firstName: event.target.value });
    changeLastNameHandler = (event) => this.setState({ lastName: event.target.value });
    changeEmailHandler = (event) => this.setState({ emailId: event.target.value });
    changeCourseHandler = (event) => this.setState({ course: event.target.value });

    cancel() {
        this.props.history.push('/students');
    }

    getTitle() {
        return this.state.id === '_add' ? <h3 className="text-center">Add Student</h3> : <h3 className="text-center">Update Student</h3>;
    }

    render() {
        return (
            <div>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" className="form-control"
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" className="form-control"
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" className="form-control"
                                               value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Course: </label>
                                        <input placeholder="Course" className="form-control"
                                               value={this.state.course} onChange={this.changeCourseHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateStudent}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateStudentComponent;
