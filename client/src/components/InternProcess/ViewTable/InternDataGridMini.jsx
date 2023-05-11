import { useTheme } from '@emotion/react';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Tile } from '../../../components/card/Tile'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const InternDataGridMini = ({users, rows, columns }) => {
    const [tableLoaded, setTableLoaded] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (users) {
            setTableLoaded(true);
        }
    }, [users]);

    return (
        <Box height='70vh'>
                {tableLoaded ? (
                    <DataGrid
                        rows={rows && rows}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        getRowId={(row) => row.id}
                        

                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'primary.light',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                            '& .data-grid-header': {
                                fontWeight: 'bold',
                                // backgroundColor: theme.palette.blueColor.main,
                                color: 'black',
                                fontSize: '1rem'
                            }
                        }}
                    />
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                )}
        </Box>
    );
}

export default InternDataGridMini