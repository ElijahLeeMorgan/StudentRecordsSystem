import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import './studentsGrid.scss';
import { IStudent } from '../../types/global.typing';

const StudentColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "gpa", headerName: "GPA", width: 50 },
    { field: "detentions", headerName: "Detentions", width: 100 },
    { field: "absences", headerName: "Absenses", width: 100 },
    { field: "emergencyContact", headerName: "Emergency Contact", width: 150 },
    { field: "gradeYear", headerName: "Grade", width: 150 },
    { field: "createdAt", headerName: "Created", width: 200,
        renderCell: (params) => moment(params.row.createdAt).fromNow(),
    }
];

interface IStudentsGridProps {
    data: IStudent[];
}

export const StudentsGrid: React.FC<IStudentsGridProps> = ({ data }) => {
    return (
        <Box sx={{width:"100%", height:450}} className="students-grid">
            <DataGrid rows={data} columns={StudentColumns} getRowId={(row) => row.id} rowHeight={50} />
        </Box>
    );
};

export default StudentsGrid;