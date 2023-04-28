import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import InternDataGridMini from '../../../components/InternProcess/ViewTable/InternDataGridMini'
import useFetch from '../../../Hooks/useFetch';
import { Tile } from '../../../components/card/Tile';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

const SelectStudent = () => {
    const navigate = useNavigate();
    const { data } = useFetch('GET', 'http://localhost:5000/api/v1/undergraduate/view-intern-list', null);
    const students = data.users;

    const rows =
        students &&
        students.map((student) => {
            return {
                id: student._id,
                regNo: student.regNo,
                name: student.name,
                gpa: student.gpa,
                weightedGPA: student.weightedGPA,
                status: student.status,
            };
        });

    const columns = [
        { field: 'regNo', headerName: 'Registration No.', width: 180, headerClassName: 'data-grid-header' },
        { field: 'name', headerName: 'Name', width: 200, headerClassName: 'data-grid-header' },
        { field: 'gpa', headerName: 'GPA', type: 'number', width: 100, headerClassName: 'data-grid-header' },
        { field: 'weightedGPA', headerName: 'Weighted GPA', type: 'number', width: 150, headerClassName: 'data-grid-header' },
        { field: 'status', headerName: 'Status', width: 120, headerClassName: 'data-grid-header' },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            headerClassName: 'data-grid-header',
            renderCell: (params) => (<Button onClick={() => handleClick(params.row)} endIcon={<NavigateNextIcon/>}>Select</Button>)
            // renderCell: (params) => (<Button type='close' onClick={() => handleRemoveStudent(params.row)} startIcon={<DeleteIcon />} />)

        },
    ];

    const handleClick = (student) => {
        navigate(`/intern-process-student/${student.id}`)
    }
    return (
        <Box>
            <Typography variant="head3">Select a Student</Typography>
            <Tile>
                <InternDataGridMini
                    users={students && students}
                    rows={rows}
                    columns={columns}
                />
            </Tile>
        </Box>
    )
}

export default SelectStudent