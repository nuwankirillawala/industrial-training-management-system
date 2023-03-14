import * as React from 'react';
import { InputBase, styled, IconButton, Typography, Grid, List, ListItemText, ListItemButton } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Tile } from '../../card/Tile';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: 'calc(1rem + ${theme.spacing(4)})'
    }

}));

const buttonStyles = {
    position:'relative',
    right:120,
}

const notices = [
    {
        primary: 'Notice 1',
        secondary: 'This is notice 1.',
        ternary: 'Display message 1 here.'
    },
    {
        primary: 'Notice 2',
        secondary: 'This is notice 2.',
        ternary: 'Display message 2 here.'
    },
    {
        primary: 'Notice 3',
        secondary: 'This is notice 3.',
        ternary: 'Display message 3 here.'
    }

]

export default function Notice () {
    
    const [displayText, setDisplayText] = useState('');

    const handleClick = (notice) => {
        setDisplayText(notice.ternary);
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
                md={3}
            >
                <Tile
                    height={'88vh'}
                >
                    {/* search bar */}
                    <Grid
                        border={1} 
                        borderRadius={2}
                        bgcolor={'white'}
                        /*width={350}*/
                        height={40}
                        position={'relative'}
                        top={10}
                        item
                        xs={9}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                    >
                        <StyledInputBase
                            placeholder='Search...'
                            inputProps={{'aria-label': "search"}}
                            sx={{
                                bottom:0.5,
                                left:20,
                                width:180
                            }}                        
                        />
                    </Grid>

                    {/* Search icon button */}
                    <Grid
                        item
                        sm={6}
                        md={4}
                        lg={10}
                        xl={10}
                    >
                        <IconButton
                            type='button'
                            sx={{
                                bgcolor:'black',
                                border:1,
                                position:'relative',
                                bottom:25,
                                left:0,
                                width:30,
                                height:30,
                                borderRadius:2,
                                ml: {
                                    xs: 15,
                                    sm: 20,
                                    md: 20,
                                    lg: 25,
                                    xl: 26
                                }
                            }}
                        >
                            <SearchIcon
                                sx={{
                                    color:'white',
                                    "&:hover":{ color:'black' }
                                }}
                            />
                        </IconButton>
                    </Grid>

                    {/* Refresh icon button  */}
                    <Grid>
                        <IconButton
                            type='button'
                            sx={{
                                border:1,
                                position:'absolute',
                                top:99, left:460,
                                width:30,
                                height:30,
                                borderRadius:2,
                                bgcolor:'black',
                                ml: {
                                    xs: -11,
                                    xl: 0
                                }
                            }}
                        >
                            <AutorenewIcon
                                sx={{
                                    width:28,
                                    height:28,
                                    color:'white',
                                    '&:hover':{
                                        color:'black',
                                        bgcolor:'white',
                                        borderRadius:2
                                    }
                                }}
                            />
                        </IconButton>
                    </Grid>

                    {/* List item buttons */}
                    <List>
                        {notices.map((notice, index) => (
                            <ListItemButton
                                key={index}
                                onClick={() => handleClick(notice)}
                            >
                                <ListItemText
                                    primary={notice.primary}
                                    secondary={notice.secondary}
                                />
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
                md={9}
            >
                <Tile
                    height={'88vh'}
                >
                    <List>
                        <Typography
                            sx={{
                                height:'83vh',
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