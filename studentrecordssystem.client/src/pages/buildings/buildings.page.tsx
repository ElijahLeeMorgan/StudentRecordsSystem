import { useEffect, useState } from 'react';
import './buildings.scss';
import httpModule from '../../helpers/http.module';
import objectDeleteModule from '../../helpers/objectDelete.module';
import { IBuilding, IUpdateBuildingDto } from '../../types/global.typing';
import { Button, CircularProgress, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Add, DeleteForever, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BuildingsGrid } from '../../components/Buildings/buildingsGrid.component';
import { isNumber } from '@mui/x-data-grid/internals';

const Buildings = () => {
    const [buildings, setBuildings] = useState<IBuilding[]>([]);
    const [buildingId, setBuildingId] = useState<number>();
    const [formData, setFormData] = useState<IUpdateBuildingDto>({ name: '', address: '', phoneNumber: '' });
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

    const handleClickDeleteButton = () => {
        const id: number = parseInt(prompt("Enter the building ID you want to delete:") || "-1");
        if (id <= 0 || !isNumber(id)) {
            alert("Please enter a valid building ID ");
            return;
        } else {
            objectDeleteModule("Building", id);
            return;
        }
    };

    const handleClickUpdateButton = () => {
        const id: number = parseInt(prompt("Enter the building ID you want to edit:") || "-1");
        if (id <= 0 || !isNumber(id)) {
            alert("Please enter a valid building ID");
            return;
        } else {
            setBuildingId(id);
            setDialogOpen(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //console.log('Building ID:', buildingId);
        //console.log('Form Data:', formData);
        //TODO Perform your update logic here
        //TODO Autofill dialogue options

        httpModule
            .put(`/Building/Put?id=${buildingId}`, formData)
            .then(() => { redirect("/buildings"); })
            .catch((error) => {
                console.error(error);
                alert(error.message); //Very basic error message. In a real-world app I'd want to display more information such as the network code.
            });

        setDialogOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        httpModule
            .get<IBuilding[]>('/Building/Get')
            .then(response => {
                setBuildings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                alert("Error");
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="content buildings">
            <div className="heading">
                <h2>Buildings</h2>
                <ButtonGroup variant="contained">
                    <Button aria-label="Add" onClick={() => redirect("/buildings/add")}>
                        <Add />
                    </Button>
                    <Button color="warning" aria-label="Edit" onClick={handleClickUpdateButton}>
                        <Edit />
                    </Button>
                    <Button color="error" aria-label="Delete" onClick={handleClickDeleteButton}>
                        <DeleteForever />
                    </Button>
                </ButtonGroup>
            </div>
            {loading ?
                <CircularProgress size={100} />
                : buildings.length === 0 ? <h3>No buildings found</h3>
                    : <BuildingsGrid data={buildings} />
            }

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Update Building</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter any new details.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="address"
                            label="Address"
                            type="text"
                            fullWidth
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="phoneNumber"
                            label="Phone Number"
                            type="text"
                            fullWidth
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Buildings;
