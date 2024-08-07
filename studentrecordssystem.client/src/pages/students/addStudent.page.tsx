import { useState, useEffect } from 'react';
import './students.scss';
import { ICreateStudentDto, IGrade, IBuilding} from '../../types/global.typing';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpModule from '../../helpers/http.module';

const AddStudent = () => {
    const [student, setStudents] = useState<ICreateStudentDto>({ firstName: "", lastName: "", emergencyContact: "", email: "", gradeID: "" });
    const [grades, setGrades] = useState<IGrade[]>([]);
    const [building, setBuildings] = useState<IBuilding[]>([]);
    const redirect = useNavigate();

    useEffect(() => {
        httpModule
            .get<IGrade[]>('/Grade/Get')
            .then(response => {
                setGrades(response.data);
            })
            .catch((error) => {
                alert("Error")
                console.log(error);
            });
    }, []);

    useEffect(() => {
        httpModule
            .get<IBuilding[]>('/Building/Get')
            .then(response => {
                setBuildings(response.data);
            })
            .catch((error) => {
                alert("Error")
                console.log(error);
            });
    }, []);

    const handleClickSaveBtn = () => { //Quick and dirty, I'd refactor this in a production app.
        if (student.firstName === "" || student.lastName === "" || student.emergencyContact === "" || student.gradeID === "") {
            alert("Please fill in all required fields");
            return;
        }
        httpModule
            .post("/Student/Create", student)
            .then(() => {redirect("/students"); })
            .catch((error) => {
                console.error(error);
                alert(error.message); //Very basic error message. In a production app I'd want to display more information such as the network code.
             });
    };

    const handleClickBackBtn = () => {
        redirect("/students");
    };

    return (
        <div className="content">
            <div className="add-student">
                <h2>Add New Student</h2>
                <FormControl fullWidth>
                    <InputLabel>Grade</InputLabel>
                    <Select
                        value={student.gradeID}
                        label="Grade"
                        onChange={(e) => setStudents({ ...student, gradeID: e.target.value })}>

                        {grades.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Building</InputLabel>
                    <Select
                        value={building[student.gradeID]}
                        label="Building"
                        onChange={(e) => e.target.value}>
                        {/*FIXME Doesn't properly sort by building ID, but just by order in the returned array.*/}
                        {building.filter((e) => (e.id + 1) === student.gradeID).map((item) => (
                            <MenuItem key={item.id + 1} value={item.id + 1}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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

            </div>
            <div className="btn-group">
                <Button variant="contained" color="primary" onClick={handleClickSaveBtn}>Save</Button>
                <Button variant="contained" color="inherit" onClick={handleClickBackBtn}>Back</Button>
            </div>
        </div>
    );
};

export default AddStudent;