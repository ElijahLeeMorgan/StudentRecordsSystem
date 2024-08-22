import {useEffect, useState} from 'react';
import './students.scss';
import httpModule from '../../helpers/http.module';
import objectDeleteModule from '../../helpers/objectDelete.module';
import { IStudent, IUpdateStudentDto } from '../../types/global.typing';
import { Button, CircularProgress, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Add, DeleteForever, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StudentsGrid } from '../../components/Students/studentsGrid.component';
import { isNumber } from '@mui/x-data-grid/internals';

const Students = () => {
    const [students, setStudents] = useState<IStudent[]>([]);
    const [studentId, setStudentId] = useState<number>();
    const [formData, setFormData] = useState<IUpdateStudentDto>({ firstName: '', lastName: '', detentions: '', absences: '', emergencyContact: '', gpa: '', email: '', gradeID: ''});
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

    const handleClickDeleteButton = () => {
        const id: number = parseInt(prompt("Enter the student ID you want to delete:") || "-1");
        if (id <= 0 || !(isNumber(id))) {
            alert("Please enter a valid student ID to delete");
            return;
        } else {
            objectDeleteModule("Student", id);
        }
    }

    const handleClickUpdateButton = () => {
        const id: number = parseInt(prompt("Enter the student ID you want to edit:") || "-1");
        if (id <= 0 || !isNumber(id)) {
            alert("Please enter a valid student ID");
            return;
        } else {
            setStudentId(id);
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
            .put(`/Student/Put?id=${studentId}`, formData)
            .then(() => { redirect("/students"); })
            .catch((error) => {
                console.error(error);
                alert(error.message); //Very basic error message. In a real-world app I'd want to display more information such as the network code.
            });

        setDialogOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        httpModule
            .get<IStudent[]>('/Student/Get')
            .then(response => {
                setStudents(response.data);
                setLoading(false);
            })
            .catch((error) => {
                alert("Error")
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (<div className="content students">
        <div className="heading">
            <h2>Students</h2>
            <ButtonGroup variant="contained">
                <Button aria-label="Add" onClick={() => redirect("/students/add")}>
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
            : students.length === 0 ? <h3>No students found</h3>
            : <StudentsGrid data={students} />
        }
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Update Student</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter any new details.
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="detentions"
                        label="Detentions"
                        type="number"
                        fullWidth
                        value={formData.detentions}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="absences"
                        label="Absences"
                        type="number"
                        fullWidth
                        value={formData.absences}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="emergencyContact"
                        label="Emergency Contact"
                        type="text"
                        fullWidth
                        value={formData.emergencyContact}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="gpa"
                        label="GPA"
                        type="number"
                        fullWidth
                        value={formData.gpa}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="text"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="gradeID"
                        label="Grade ID"
                        type="number"
                        fullWidth
                        value={formData.gradeID}
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

export default Students;
