import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import './classesGrid.scss';
import { IClass } from '../../types/global.typing';

const ClassColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "subject", headerName: "Subject", width: 100 },
    { field: "grade", headerName: "Grade", width: 50 },
    { field: "studentFirstName", headerName: "Student First Name", width: 200 },
    { field: "studentLastName", headerName: "Student Last Name", width: 200 },
    { field: "createdAt", headerName: "Created", width: 100,
        renderCell: (params) => moment(params.row.createdAt).fromNow(),
    }
];

interface IClassesGridProps {
    data: IClass[];
}

export const ClassesGrid: React.FC<IClassesGridProps> = ({ data }) => {
    return (
        <Box sx={{width:"100%", height:450}} className="classes-grid">
            <DataGrid rows={data} columns={ClassColumns} getRowId={(row) => row.id} rowHeight={50} />
        </Box>
    );
};

export default ClassesGrid;