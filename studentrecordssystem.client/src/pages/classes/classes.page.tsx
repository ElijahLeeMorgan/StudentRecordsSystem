import {useEffect, useState} from 'react';
import './classes.scss';
import httpModule from '../../helpers/http.module';
import objectDeleteModule from '../../helpers/objectDelete.module';
import { IClass, IUpdateClassDto } from '../../types/global.typing';
import { Button, CircularProgress, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Add, DeleteForever, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ClassesGrid } from '../../components/Classes/classesGrid.component';
import { isNumber } from '@mui/x-data-grid/internals';

const Classes = () => {
    const [classes, setClasses] = useState<IClass[]>([]);
    const [classId, setClassId] = useState<number>();
    const [formData, setFormData] = useState<IUpdateClassDto>({ subject: '', grade:'', studentID: ''});
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

    const handleClickDeleteButton = () => {
        const id: number = parseInt(prompt("Enter the class ID you want to delete:") || "-1");
        if (id <= 0 || !(isNumber(id))) {
            alert("Please enter a valid class ID to delete");
            return;
        } else {
            objectDeleteModule("Class", id);
        }
    }

    const handleClickUpdateButton = () => {
        const id: number = parseInt(prompt("Enter the class ID you want to edit:") || "-1");
        if (id <= 0 || !isNumber(id)) {
            alert("Please enter a valid class ID");
            return;
        } else {
            setClassId(id);
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
            .put(`/Class/Put?id=${classId}`, formData)
            .then(() => { redirect("/classes"); })
            .catch((error) => {
                console.error(error);
                alert(error.message); //Very basic error message. In a real-world app I'd want to display more information such as the network code.
            });

        setDialogOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        httpModule
            .get<IClass[]>('/Class/Get')
            .then(response => {
                setClasses(response.data);
                setLoading(false);
            })
            .catch((error) => {
                alert("Error")
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (<div className="content classes">
        <div className="heading">
            <h2>Classes</h2>
            <ButtonGroup variant="contained">
                <Button aria-label="Add" onClick={() => redirect("/classes/add")}>
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
            : classes.length === 0 ? <h3>No classes found</h3>
            : <ClassesGrid data={classes} />
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
                        name="subject"
                        label="Subject"
                        type="text"
                        fullWidth
                        value={formData.subject}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="grade"
                        label="Grade"
                        type="text"
                        fullWidth
                        value={formData.grade}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="studentID"
                        label="Student ID"
                        type="text"
                        fullWidth
                        value={formData.studentID}
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
    )};

export default Classes;
