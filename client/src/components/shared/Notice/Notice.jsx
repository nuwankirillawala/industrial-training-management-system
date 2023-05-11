import * as React from 'react';
import { InputBase, IconButton, Typography, Grid, List, ListItemText, ListItemButton, Paper, ListItemSecondaryAction, Toolbar } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Tile } from '../../card/Tile';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotices, setFilteredNotices] = useState(notices);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        const filtered = notices.filter((notice) =>
            notice.primary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.secondary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.ternary.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNotices(filtered);
        if (searchQuery === '') {
            setSelectedNotice(null);
            setDisplayText('');
        } else if (filtered.length === 1) {
            setSelectedNotice(filtered[0]);
            setDisplayText(filtered[0].ternary);
        } else {
            setSelectedNotice(null);
            setDisplayText('There are many results');
        }
    };

    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // if (query === '') {
        //     setFilteredNotices(notices);
        //     setSelectedNotice(null);
        //     return;
        // }

        const filtered = notices.filter((notice) =>
            notice.primary.toLowerCase().includes(query.toLowerCase()) ||
            notice.secondary.toLowerCase().includes(query.toLowerCase()) ||
            notice.ternary.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredNotices(filtered);
    };

    const handleClick = (notice) => {
        setDisplayText(notice.ternary);
        // setSelectedNotice(notice)
    };

    const getCurrentDate = () => {
        const date = new Date();
        return date.toLocaleDateString();
    };

    const searchStyles = {
        position: 'sticky',
        zIndex: 1,
        transform: 'translate(-5%, 0)',
        minWidth: '250px',
        top: 0,
        marginBottom: 2
    };

    const listStyles = {
        height: 500,
        width: 438,
        overflow: 'auto'
    };

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
                    height={'88vh'} sx={{overflowY: 'hidden'}}
                >
                    {/* Search bar & Search button */}
                    <Toolbar sx={searchStyles}>
                        <Paper
                            component={'form'}
                            sx={{ p: '2px 4px', display: 'flex', alignItems: "center", width: 270 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder='Search...'
                                onChange={handleSearchQueryChange}
                            />
                                <IconButton type='submit' sx={{ p: '10px', marginLeft: '10px', bgcolor: 'black' }} aria-label='search' onClick={handleSearch}>
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
                            <IconButton color='primary' sx={{ p: '10px', bgcolor: 'black', left: 0.5 }} aria-label='refresh' onClick={() => {setFilteredNotices(notices); setSelectedNotice(null); setDisplayText('')}}>
                                <RefreshIcon />
                            </IconButton>
                        </Paper>
                    </Toolbar>

                    {/* List item buttons */}
                    <List sx={ listStyles }>
                        {filteredNotices.map((notice, index) => (
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
                            {selectedNotice ? selectedNotice.ternary : displayText}
                        </Typography>
                    </List>
                </Tile>
            </Grid>

        </Grid>

    );

}