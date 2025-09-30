import React, { Component } from 'react';
import StudentService from '../services/StudentService';

class ViewStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            student: {}
        }
    }

    componentDidMount(){
        StudentService.getStudentById(this.state.id).then(res => {
            this.setState({ student: res.data });
        });
    }

    render() {
        const { student } = this.state;
        const rowStyle = { display: 'flex', margin: 0, padding: '2px 0' };
        const labelStyle = { fontWeight: 'bold', width: '120px' };
        const valueStyle = { flex: 1 };

        return (
            <div className="container mt-3">
                <div className="card shadow-sm p-2">
                    <div className="card-header bg-primary text-white p-2 text-center">
                        Student Details
                    </div>
                    <div className="card-body p-2">
                        <div style={rowStyle}>
                            <div style={labelStyle}>First Name:</div>
                            <div style={valueStyle}>{student.firstName}</div>
                        </div>
                        <div style={rowStyle}>
                            <div style={labelStyle}>Last Name:</div>
                            <div style={valueStyle}>{student.lastName}</div>
                        </div>
                        <div style={rowStyle}>
                            <div style={labelStyle}>Email Id:</div>
                            <div style={valueStyle}>{student.emailId}</div>
                        </div>
                        <div style={rowStyle}>
                            <div style={labelStyle}>Course:</div>
                            <div style={valueStyle}>{student.course}</div>
                        </div>
                        <div className="text-center mt-2">
                            <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => this.props.history.push('/students')}
                            >
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewStudentComponent;
