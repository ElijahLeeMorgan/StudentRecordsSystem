import { useState, useEffect } from 'react';
import './classes.scss';
import { ICreateClassDto, IBuilding, IGrade, IStudent} from '../../types/global.typing';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpModule from '../../helpers/http.module';

const AddClass = () => {
    //Once again, calling a class "Class" or "ClassObject" was due to poor planning early on. I'll catch this in the future.
    const [classObject, setClasses] = useState<ICreateClassDto>({ subject: "", studentID: ""});
    //const [grades, setGrades] = useState<IGrade[]>([]);
    //const [building, setBuildings] = useState<IBuilding[]>([]);
    const [student, setStudents] = useState<IStudent[]>([]);
    const redirect = useNavigate();


    //// Really should be functionalized.
    //useEffect(() => {
    //    httpModule
    //        .get<IGrade[]>('/Grade/Get')
    //        .then(response => {
    //            setGrades(response.data);
    //        })
    //        .catch((error) => {
    //            alert("Error")
    //            console.log(error);
    //        });
    //}, []);

    //useEffect(() => {
    //    httpModule
    //        .get<IBuilding[]>('/Building/Get')
    //        .then(response => {
    //            setBuildings(response.data);
    //        })
    //        .catch((error) => {
    //            alert("Error")
    //            console.log(error);
    //        });
    //}, []);

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

    const handleClickSaveBtn = () => { //Quick and dirty, I'd refactor this in a production app.
        if (classObject.subject === "" || classObject.studentID === "") {
            alert("Please fill in all required fields");
            return;
        }
        httpModule
            .post("/Class/Create", classObject)
            .then(() => {redirect("/classes"); })
            .catch((error) => {
                console.error(error);
                alert(error.message); //Very basic error message. In a production app I'd want to display more information such as the network code.
             });
    };

    const handleClickBackBtn = () => {
        redirect("/classes");
    };
    
    return (
        <div className="content">
            <div className="add-classObject">
                <h2>Enroll Student in New Class</h2>
                {/* Yes, a dropdown menu here makes for an awful UX, but I'm still learning.*/}
                <FormControl fullWidth>
                    <InputLabel>Student</InputLabel>
                    <Select
                        value={classObject.studentID}
                        label="Student"
                        onChange={(e) => setClasses({ ...classObject, studentID: e.target.value })}>

                        {student.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.firstName + ' ' + item.lastName}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <TextField
                    autoComplete="off"
                    label="Subject"
                    variant="outlined"
                    value={classObject.subject}
                    onChange={(e) => setClasses({ ...classObject, subject: e.target.value })}>
                </TextField>

            </div>
            <div className="btn-group">
                <Button variant="contained" color="primary" onClick={handleClickSaveBtn}>Save</Button>
                <Button variant="contained" color="inherit" onClick={handleClickBackBtn}>Back</Button>
            </div>
        </div>
    );
};

export default AddClass;