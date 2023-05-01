import * as React from 'react';
import { InputBase, IconButton, Typography, Grid, List, ListItemText, ListItemButton, Paper, Box, ListItemSecondaryAction, Toolbar, ListItem } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Tile } from '../../card/Tile';
import { red } from '@mui/material/colors';

const notices = [
    {
        primary: 'Notice 1',
        secondary: 'This is notice 1.',
        ternary: 'Dashboard'
    },
    {
        primary: 'Notice 2',
        secondary: 'This is notice 2.',
        ternary: 'Notice'
    },
    {
        primary: 'Notice 3',
        secondary: 'This is notice 3.',
        ternary: 'Application'
    },
    {
        primary: 'Notice 4',
        secondary: 'This is notice 4.',
        ternary: 'Intern'
    },
    {
        primary: 'Notice 5',
        secondary: 'This is notice 5.',
        ternary: 'CV'
    },
    {
        primary: 'Notice 6',
        secondary: 'This is notice 6.',
        ternary: 'Daily Report'
    },
    {
        primary: 'Notice 7',
        secondary: 'This is notice 7.',
        ternary: 'Settings'
    },
    {
        primary: 'Notice 8',
        secondary: 'This is notice 8.',
        ternary: 'Back'
    },
    {
        primary: 'Notice 9',
        secondary: 'This is notice 9.',
        ternary: 'Drawer'
    },
    {
        primary: 'Notice 10',
        secondary: 'This is notice 10.',
        ternary: 'Navbar'
    }

]

export default function Notice () {
    
    const [displayText, setDisplayText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleClick = (notice) => {
        setDisplayText(notice.ternary);
    }

    const getCurrentDate = () => {
        const date = new Date();
        return date.toLocaleDateString();
    };

    const searchStyles = {
        position: 'sticky',
        zIndex: (theme) => theme.zIndex.appbar,
        // left: '10%',
        transform: 'translate(-5%, 0)',
        minWidth: '250px',
        top: 0
    };

    const listStyles = {
        paddingTop: (theme) => theme.spacing(4)
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (

        <Grid
            container
            spacing={1}
            alignItems='center'
        >

            <Grid
                item
                xs={10}
                sm={6}
                md={4}
            >
                <Tile
                    height={'88vh'}
                >
                    {/* Search bar & Search button */}
                    {/* <Box sx={{ height: '10vh', overflow: 'sroll' }}> */}
                    <Toolbar sx={searchStyles}>
                        <Paper
                        component={'form'}
                        sx={{ p: '2px 4px', display: 'flex', alignItems: "center", width: 270, /*marginBottom: 0*/}}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder='Search...'
                                inputProps={{ 'aria-label': 'Search' }}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <IconButton type='button' sx={{ p: '10px', marginLeft: '10px', bgcolor: 'black' }} aria-label='search'>
                                <SearchIcon
                                    sx={{
                                        color:'white',
                                        "&:hover":{ color:'black' }
                                    }}
                                />
                            </IconButton>
                        </Paper>

                        {/* Refresh button */}
                        <Paper sx={{ borderRadius: 20, width: 45, position: 'relative', top: 0, left: 10 }} elevation={0}>
                            <IconButton color='primary' sx={{ p: '10px', bgcolor: 'black', left: 0.5 }} aria-label='refresh' >
                                <RefreshIcon />
                            </IconButton>
                        </Paper>
                    </Toolbar>
                    {/* </Box> */}

                    {/* List item buttons */}
                    <List sx={listStyles}>
                        {notices.map((notice, index) => (
                            <ListItemButton
                                key={index}
                                onClick={() => handleClick(notice)}
                            >
                                <ListItemText
                                    primary={notice.primary}
                                    secondary={notice.secondary}
                                />
                            <ListItemSecondaryAction>
                                <Typography variant='caption' color={'black'}>{getCurrentDate()}</Typography>
                            </ListItemSecondaryAction>
                            </ListItemButton>
                        ))}
                    </List>
                </Tile>
            </Grid>

            {/* Display notices */}
            <Grid
                item
                xs={10}
                sm={6}
                md={8}
                paddingRight={1}
            >
                <Tile
                    height={'88vh'}
                >
                    <List>
                        <Typography
                            sx={{
                                height:'80vh',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {displayText}
                        </Typography>
                    </List>
                </Tile>
            </Grid>

        </Grid>

    );

}