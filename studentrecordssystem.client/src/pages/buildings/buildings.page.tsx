import {useEffect, useState} from 'react';
import './buildings.scss';
import httpModule from '../../helpers/http.module';
import {IBuilding} from '../../types/global.typing';

const Buildings = () => {
    const [buildings, setBuildings] = useState<IBuilding[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    console.log(buildings);

    return (<div>Buildings.page</div>)
};

export default Buildings;
