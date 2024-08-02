import {useEffect, useState} from 'react';
import './buildings.scss';
import httpModule from '../../helpers/http.module';
import { IBuilding } from '../../types/global.typing';
import { Button, CircularProgress, ButtonGroup } from '@mui/material';
import { Add, DeleteForever } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BuildingsGrid } from '../../components/Buildings/buildingsGrid.component';

const Buildings = () => {
    const [buildings, setBuildings] = useState<IBuilding[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

    //TODO Make this work on an array of IDs.
    //TODO Move this to a helper module.
    const deleteBuilding = (id: number) => {
        //console.log(id);
        httpModule
            .delete(`/Building/Delete?id=${id}`)
            .then(() => { //(response) =>
                //console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                alert("Error")
                console.log(error);
            });
    }

    const handleClickDeleteButton = () => {
        const id: number = parseInt(prompt("Enter the building ID you want to delete:") || "-1");

        if (id <= 0) {
            alert("Please enter a valid building ID to delete");
            return;
        } else {
            deleteBuilding(id);
        }
    }

    useEffect(() => {
        setLoading(true);
        httpModule
            .get<IBuilding[]>('/Building/Get')
            .then(response => {
                setBuildings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                alert("Error")
                console.log(error);
                setLoading(false);
            });
    }, []);

    //console.log(buildings);

    // I would make these MUI IconButtons but, it wouldn't fit the theme of the app. Plus, I'd have to play around with the darkmode styles.
    return (<div className="content buildings">
        <div className="heading">
            <h2>Buildings</h2>
            <ButtonGroup variant="contained"> 
                <Button onClick={() => redirect("/buildings/add")}>
                    <Add />
                </Button>
                <Button color="error" onClick={() => handleClickDeleteButton()}>
                    <DeleteForever />
                </Button>
            </ButtonGroup>
        </div>
        {loading ?
              <CircularProgress size={100}></CircularProgress>
            : buildings.length === 0 ? <h3>No buildings found</h3>
            : <BuildingsGrid data={buildings} />
        }
    </div>
    )};

export default Buildings;
