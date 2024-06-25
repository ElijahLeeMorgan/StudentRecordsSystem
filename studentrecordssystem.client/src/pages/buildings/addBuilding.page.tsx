import { useState } from 'react';
import './buildings.scss';
import { ICreateBuildingDto } from '../../types/global.typing';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpModule from '../../helpers/http.module';

const AddBuilding = () => {
    const [building, setBuilding] = useState<ICreateBuildingDto>({ name: "", address: "", phoneNumber: "" });

    const redirect = useNavigate();

    const handleClickSaveBtn = () => {
        if(building.name === "" || building.address === "" || building.phoneNumber === "") {
            alert("Please fill in all fields");
            return;
        }
        httpModule
            .post("/Building/Create", building)
            .then(() => {redirect("/buildings"); })
            .catch((error) => {
                console.error(error);
                alert(error.message); //Very basic error message. In a real-world app I'd want to display more information such as the network code.
             });
    };

    const handleClickBackBtn = () => {
        redirect("/buildings");
    };

    return (
        <div className="content">
            <div className="add-building">
                <h2>Add New Building</h2>
                <TextField
                    autoComplete="off"
                    label="Building Name"
                    variant="outlined"
                    value={building.name}
                    onChange={(e) => setBuilding({ ...building, name: e.target.value })}>
                </TextField>
                <TextField
                    autoComplete="off"
                    label="Address"
                    variant="outlined"
                    value={building.address}
                    onChange={(e) => setBuilding({ ...building, address: e.target.value })}>
                </TextField>
                <TextField
                    autoComplete="off"
                    label="Phone Number"
                    variant="outlined"
                    value={building.phoneNumber}
                    onChange={(e) => setBuilding({ ...building, phoneNumber: e.target.value })}>
                </TextField>
                
            </div>
            <div className="btn-group">
                <Button variant="contained" color="primary" onClick={handleClickSaveBtn}>Save</Button>
                <Button variant="contained" color="inherit" onClick={handleClickBackBtn}>Back</Button>
            </div>
        </div>
    );
};

export default AddBuilding;