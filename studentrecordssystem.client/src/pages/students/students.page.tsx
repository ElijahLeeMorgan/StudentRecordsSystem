import {useEffect, useState} from 'react';
import './students.scss';
import httpModule from '../../helpers/http.module';
import objectDeleteModule from '../../helpers/objectDelete.module';
import { IStudent } from '../../types/global.typing';
import { Button, CircularProgress, ButtonGroup } from '@mui/material';
import { Add, DeleteForever } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StudentsGrid } from '../../components/Students/studentsGrid.component';

const Students = () => {
    const [students, setStudents] = useState<IStudent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

    const handleClickDeleteButton = () => {
        const id: number = parseInt(prompt("Enter the student ID you want to delete:") || "-1");
        if (id <= 0) {
            alert("Please enter a valid student ID to delete");
            return;
        } else {
            objectDeleteModule("Student", id);
        }
    }

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
                <Button onClick={() => redirect("/students/add")}>
                    <Add />
                </Button>
                <Button color="error" onClick={() => handleClickDeleteButton()}>
                    <DeleteForever />
                </Button>
            </ButtonGroup>
        </div>
        {loading ?
              <CircularProgress size={100}></CircularProgress>
            : students.length === 0 ? <h3>No students found</h3>
            : <StudentsGrid data={students} />
        }
    </div>
    )};

export default Students;
