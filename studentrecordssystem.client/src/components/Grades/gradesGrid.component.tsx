import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import './gradesGrid.scss';
import { IGrade } from '../../types/global.typing';

const GradeColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "year", headerName: "Year", width: 200 },
    { field: "buildingName", headerName: "Building Name", width: 200 },
    { field: "createdAt", headerName: "Created", width: 200,
        renderCell: (params) => moment(params.row.createdAt).fromNow(),
    }
];

interface IGradesGridProps {
    data: IGrade[];
}

export const GradesGrid: React.FC<IGradesGridProps> = ({ data }) => {
    return (
        <Box sx={{width:"100%", height:450}} className="grades-grid">
            <DataGrid rows={data} columns={GradeColumns} getRowId={(row) => row.id} rowHeight={50} />
        </Box>
    );
};

export default GradesGrid;