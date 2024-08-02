import {useEffect, useState} from 'react';
import './classes.scss';
import httpModule from '../../helpers/http.module';
import objectDeleteModule from '../../helpers/objectDelete.module';
import { IClass } from '../../types/global.typing';
import { Button, CircularProgress, ButtonGroup } from '@mui/material';
import { Add, DeleteForever } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ClassesGrid } from '../../components/Classes/classesGrid.component';

const Classes = () => {
    const [classes, setClasses] = useState<IClass[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

    const handleClickDeleteButton = () => {
        const id: number = parseInt(prompt("Enter the class ID you want to delete:") || "-1");
        if (id <= 0) {
            alert("Please enter a valid class ID to delete");
            return;
        } else {
            objectDeleteModule("Class", id);
        }
    }

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
                <Button onClick={() => redirect("/classes/add")}>
                    <Add />
                </Button>
                <Button color="error" onClick={() => handleClickDeleteButton()}>
                    <DeleteForever />
                </Button>
            </ButtonGroup>
        </div>
        {loading ?
              <CircularProgress size={100}></CircularProgress>
            : classes.length === 0 ? <h3>No classes found</h3>
            : <ClassesGrid data={classes} />
        }
    </div>
    )};

export default Classes;
