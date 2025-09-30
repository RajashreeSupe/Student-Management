import React, { Component } from 'react';
import StudentService from '../services/StudentService';
//StudentService which contains API calls (like get, delete students).
class ListStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            students: [],
            searchTerm: '',
            sortColumn: '',
            sortOrder: 'asc'
        }
        this.addStudent = this.addStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.viewStudent = this.viewStudent.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount(){
        StudentService.getStudents().then(res => {
            this.setState({ students: res.data });
        });
    }

    deleteStudent(id){
        if(window.confirm("Are you sure you want to delete this student?")) {
            StudentService.deleteStudent(id).then(res => {
                alert("Student deleted successfully!");
                this.setState({students: this.state.students.filter(student => student.id !== id)});
            });
        }
    }

    viewStudent(id){
        this.props.history.push(`/view-student/${id}`);
    }

    editStudent(id){
        this.props.history.push(`/add-student/${id}`);
    }

    addStudent(){
        this.props.history.push('/add-student/_add');
    }

    handleSearch(e) {
        this.setState({ searchTerm: e.target.value });
    }

    sortBy(column) {
        const { sortColumn, sortOrder, students } = this.state;
        let order = 'asc';
        if(sortColumn === column && sortOrder === 'asc') order = 'desc';

        const sorted = [...students].sort((a, b) => {
            if(a[column] < b[column]) return order === 'asc' ? -1 : 1;
            if(a[column] > b[column]) return order === 'asc' ? 1 : -1;
            return 0;
        });

        this.setState({ students: sorted, sortColumn: column, sortOrder: order });
    }

    render() {
        const { students, searchTerm } = this.state;
        const filteredStudents = students.filter(student =>
            student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.course.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="container mt-4">
                <h2 className="text-center mb-4">Students List</h2>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <input 
                        type="text" 
                        placeholder="Search by Name or Course" 
                        className="form-control w-50"
                        value={this.state.searchTerm}
                        onChange={this.handleSearch}
                    />
                    <button className="btn btn-primary ms-3" onClick={this.addStudent}>
                        Add Student
                    </button>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered align-middle">
                                <thead className="table-primary">
                                    <tr>
                                        <th onClick={() => this.sortBy('firstName')} style={{cursor: 'pointer'}}>First Name</th>
                                        <th onClick={() => this.sortBy('lastName')} style={{cursor: 'pointer'}}>Last Name</th>
                                        <th onClick={() => this.sortBy('emailId')} style={{cursor: 'pointer'}}>Email Id</th>
                                        <th onClick={() => this.sortBy('course')} style={{cursor: 'pointer'}}>Course</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map(student =>
                                        <tr key={student.id}>
                                            <td>{student.firstName}</td>   
                                            <td>{student.lastName}</td>
                                            <td>{student.emailId}</td>
                                            <td>{student.course}</td>
                                            <td>
                                                <button onClick={() => this.editStudent(student.id)} className="btn btn-sm btn-info me-2 mb-1">Update</button>
                                                <button onClick={() => this.deleteStudent(student.id)} className="btn btn-sm btn-danger me-2 mb-1">Delete</button>
                                                <button onClick={() => this.viewStudent(student.id)} className="btn btn-sm btn-secondary mb-1">View</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {filteredStudents.length === 0 && 
                            <p className="text-center text-muted mt-3">No students found.</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ListStudentComponent;

