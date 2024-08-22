import {useEffect, useState} from 'react';
import './grades.scss';
import httpModule from '../../helpers/http.module';
import objectDeleteModule from '../../helpers/objectDelete.module';
import { IGrade, IUpdateGradeDto } from '../../types/global.typing';
import { Button, CircularProgress, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Add, DeleteForever, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GradesGrid } from '../../components/Grades/gradesGrid.component';
import { isNumber } from '@mui/x-data-grid/internals';

const Grades = () => {
    const [grades, setGrades] = useState<IGrade[]>([]);
    const [gradeId, setGradeId] = useState<number>();
    const [formData, setFormData] = useState<IUpdateGradeDto>({ year: '', buildingID: '',});
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

    const handleClickDeleteButton = () => {
        const id: number = parseInt(prompt("Enter the grade ID you want to delete:") || "-1");
        if (id <= 0 || !(isNumber(id))) {
            alert("Please enter a valid grade ID to delete");
            return;
        } else {
            objectDeleteModule("Grade", id);
        }
    }

    const handleClickUpdateButton = () => {
        const id: number = parseInt(prompt("Enter the grade ID you want to edit:") || "-1");
        if (id <= 0 || !isNumber(id)) {
            alert("Please enter a valid grade ID");
            return;
        } else {
            setGradeId(id);
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

        httpModule
            .put(`/Grade/Put?id=${gradeId}`, formData)
            .then(() => { redirect("/grades"); })
            .catch((error) => {
                console.error(error);
                alert(error.message); //Very basic error message. In a real-world app I'd want to display more information such as the network code.
            });

        setDialogOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        httpModule
            .get<IGrade[]>('/Grade/Get')
            .then(response => {
                setGrades(response.data);
                setLoading(false);
            })
            .catch((error) => {
                alert("Error")
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (<div className="content grades">
        <div className="heading">
            <h2>Grades</h2>
            <ButtonGroup variant="contained">
                <Button aria-label="Add" onClick={() => redirect("/grades/add")}>
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
            <CircularProgress size={100}></CircularProgress>
            : grades.length === 0 ? <h3>No grades found</h3>
                : <GradesGrid data={grades} />
        }
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Update Grade</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter any new details.
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="year"
                        label="Year"
                        type="text"
                        fullWidth
                        value={formData.year}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="buildingID"
                        label="BuildingID"
                        type="number"
                        fullWidth
                        value={formData.buildingID}
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

export default Grades;
