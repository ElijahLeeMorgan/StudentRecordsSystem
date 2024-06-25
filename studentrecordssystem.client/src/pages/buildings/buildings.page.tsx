import {useEffect, useState} from 'react';
import './buildings.scss';
import httpModule from '../../helpers/http.module';
import { IBuilding } from '../../types/global.typing';
import { Button, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BuildingsGrid } from '../../components/Buildings/buildingsGrid.component';

const Buildings = () => {
    const [buildings, setBuildings] = useState<IBuilding[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();

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

    return (<div className="content buildings">
        <div className="heading">
            <h2>Buildings</h2>

            <Button variant="outlined" onClick={() => redirect("/buildings/add")}>
                <Add />
            </Button>
        </div>
        {loading ?
              <CircularProgress size={100}></CircularProgress>
            : buildings.length === 0 ? <h3>No buildings found</h3>
            : <BuildingsGrid data={buildings} />
        }
    </div>
    )};

export default Buildings;
