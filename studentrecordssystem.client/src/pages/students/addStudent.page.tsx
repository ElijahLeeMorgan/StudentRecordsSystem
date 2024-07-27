import { useState, useEffect } from 'react';
import './students.scss';
import { ICreateStudentDto, IGrade, IStudent } from '../../types/global.typing';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpModule from '../../helpers/http.module';

const AddStudent = () => {
    const [student, setStudents] = useState<ICreateStudentDto>({ firstName:"", lastName:"", emergencyContact:"", email:"", gradeID:"" });

    const [grades, setGrades] = useState<IGrade[]>([]);

    const redirect = useNavigate();

    useEffect(() => {
        httpModule
            .get<IStudent[]>('/Student/Get')
            .then(response => {
                setStudents(response.data);
            })
            .catch((error) => {
                alert("Error")
                console.log(error);
            });
    }, []);

    const handleClickSaveBtn = () => { //Quick and dirty, I'd refactor this into a separate function in a real-world app.
        if (student.firstName === "" || student.lastName === "" || student.emergencyContact === "" || student.gradeID === "") {
            alert("Please fill in all required fields");
            return;
        }
        httpModule
            .post("/Student/Create", student)
            .then(() => {redirect("/students"); })
            .catch((error) => {
                console.error(error);
                alert(error.message); //Very basic error message. In a real-world app I'd want to display more information such as the network code.
             });
    };

    const handleClickBackBtn = () => {
        redirect("/students");
    };

    return (
        <div className="content">
            <div className="add-student">
                <h2>Add New Student</h2>
                <TextField
                    autoComplete="off"
                    label="First Name"
                    variant="outlined"
                    value={student.firstName}
                    onChange={(e) => setStudents({ ...student, firstName: e.target.value })}>
                </TextField>
                <TextField
                    autoComplete="off"
                    label="Last Name"
                    variant="outlined"
                    value={student.lastName}
                    onChange={(e) => setStudents({ ...student, lastName: e.target.value })}>
                </TextField>
                <TextField
                    autoComplete="off"
                    label="Emergency Contact"
                    variant="outlined"
                    value={student.emergencyContact}
                    onChange={(e) => setStudents({ ...student, emergencyContact: e.target.value })}>
                </TextField>
                <TextField
                    autoComplete="off"
                    label="Email (optional)"
                    variant="outlined"
                    value={student.email}
                    onChange={(e) => setStudents({ ...student, email: e.target.value })}>
                </TextField>
                <FormControl fullWidth>
                    <InputLabel>Grade</InputLabel>
                    <Select
                        value={student.gradeID}
                        label="Grade"
                        onChange={(e) => setGrade({ ...student, gradeID: e.target.value })}>

                        {grades.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
                
            </div>
            <div className="btn-group">
                <Button variant="contained" color="primary" onClick={handleClickSaveBtn}>Save</Button>
                <Button variant="contained" color="inherit" onClick={handleClickBackBtn}>Back</Button>
            </div>
        </div>
    );
};

export default AddStudent;