import { useTheme } from '@emotion/react';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Tile } from '../../card/Tile'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const InternDataGridCompany = ({ heading, companies, rows, columns }) => {
    const [tableLoaded, setTableLoaded] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (companies) {
            setTableLoaded(true);
        }
    }, [companies]);

    return (
        <Box>
            <Typography variant="head3">{heading}</Typography>
            <Tile height='80vh' width='100%'>
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
            </Tile>
        </Box>
    );
}

export default InternDataGridCompany