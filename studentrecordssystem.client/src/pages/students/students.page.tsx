import {useEffect, useState} from 'react';
import './students.scss';
import httpModule from '../../helpers/http.module';
import { IStudent } from '../../types/global.typing';
import { Button, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StudentsGrid } from '../../components/Students/studentsGrid.component';

const Students = () => {
    const [students, setStudents] = useState<IStudent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

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
            <Button variant="outlined" onClick={() => redirect("/students/add")}>
                <Add />
            </Button>
        </div>
        {loading ?
              <CircularProgress size={100}></CircularProgress>
            : students.length === 0 ? <h3>No students found</h3>
            : <StudentsGrid data={students} />
        }
    </div>
    )};

export default Students;
