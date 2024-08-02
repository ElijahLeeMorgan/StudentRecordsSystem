import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import './buildingsGrid.scss';
import { IBuilding } from '../../types/global.typing';

//TODO: Add an image column for the building image
const BuildingColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "createdAt", headerName: "Created", width: 200,
        renderCell: (params) => moment(params.row.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
    }
];

interface IBuildingsGridProps {
    data: IBuilding[];
}

export const BuildingsGrid: React.FC<IBuildingsGridProps> = ({ data }) => {
    return (
        <Box sx={{width:"100%", height:450}} className="buildings-grid">
            <DataGrid rows={data} columns={BuildingColumns} getRowId={(row) => row.id} rowHeight={50} />
        </Box>
    );
};

export default BuildingsGrid;