import {useEffect, useState} from 'react';
import './grades.scss';
import httpModule from '../../helpers/http.module';
import { IGrade } from '../../types/global.typing';
import { Button, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GradesGrid } from '../../components/Grades/gradesGrid.component';

const Grades = () => {
    const [grades, setGrades] = useState<IGrade[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

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
            <Button variant="outlined" onClick={() => redirect("/grades/add")}>
                <Add />
            </Button>
        </div>
        {loading ?
              <CircularProgress size={100}></CircularProgress>
            : grades.length === 0 ? <h3>No grades found</h3>
            : <GradesGrid data={grades} />
        }
    </div>
    )};

export default Grades;
