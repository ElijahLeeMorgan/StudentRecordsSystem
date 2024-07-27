import { useState, useEffect } from 'react';
import './grades.scss';
import { ICreateGradeDto, IBuilding } from '../../types/global.typing';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpModule from '../../helpers/http.module';


const yearsArray: string[] = [
    "PRESCHOOL", 
    "KINDERGARTEN", 
    "FIRST", 
    "SECOND", 
    "THIRD", 
    "FOURTH", 
    "FIFTH", 
    "SIXTH", 
    "SEVENTH", 
    "EIGHTH", 
    "FRESHMAN",
    "SOPHOMORE",
    "JUNIOR",
    "SENIOR"];

const AddGrade = () => {
    const [grade, setGrade] = useState<ICreateGradeDto>({ year:"", buildingId:"" });

    const [buildings, setBuildings] = useState<IBuilding[]>([]);

    const redirect = useNavigate();

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

    const handleClickSaveBtn = () => {
        if(grade.year === "" || grade.buildingId === "") {
            alert("Please fill in all fields");
            return;
        }
        httpModule
            .post("/Grade/Create", grade)
            .then(() => {redirect("/grades"); })
            .catch((error) => {
                console.error(error);
                alert(error.message); //Very basic error message. In a real-world app I'd want to display more information such as the network code.
             });
    };

    const handleClickBackBtn = () => {
        redirect("/grades");
    };

    return (
        <div className="content">
            <div className="add-grade">
                <h2>Add New Grade</h2>
                <FormControl fullWidth>
                <InputLabel>Grade Year</InputLabel>
                    <Select
                        value={grade.year}
                        label="Grade Year"
                        onChange={(e) => setGrade({ ...grade, year: e.target.value })}>

                        {yearsArray.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Building</InputLabel>
                    <Select
                        value={grade.buildingId}
                        label="Building"
                        onChange={(e) => setGrade({ ...grade, buildingId: e.target.value })}>

                        {buildings.map((item) => (
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

export default AddGrade;