import * as React from 'react';
import { Box, Paper, Button, AppBar, TextField, InputBase, styled, InputAdornment, IconButton, Toolbar, Collapse, Typography, } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { alpha, color, padding, positions, Stack, textAlign, width } from '@mui/system';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';

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

export default function Notice () {
    
    const [displayText, setDisplayText] = useState(false);

    const handleClick = () => {
        setDisplayText(!displayText);
    }    

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                },
            }}
        >
            <Paper 
                elevation={0} 
                sx={{
                    bgcolor: '#eaf0ff',
                    borderRadius: 2,
                    position: 'relative',
                    top:50,
                    // left: 180,
                    width:310,
                    height:630
                }}                
            />

            <Box>                        
                <Paper
                    component='form'
                    sx={{
                        p: '2px 8px',
                        display:'flex',
                        width:200,
                        position:'relative',
                        top:70,
                        right:305
                    }}
                >
                    <StyledInputBase
                        placeholder='Search...'
                        inputProps={{'aria-label': "search"}}
                    />
                    <IconButton type='button' sx={{ p: '10px', border:1 }} aria-label='search'>
                        <SearchIcon/>
                        {/* <AutorenewIcon /> */}
                    </IconButton>
                </Paper>
                <Box>
                <Paper sx={{ width:50, height:50, position:'relative', top:20, right:85, display:'flex' }} component='form'>
                    <IconButton type='button' sx={{ p:1.3, position:'relative', left:3 }} disabled={false}>
                        <AutorenewIcon />
                    </IconButton>
                </Paper>
                </Box>
            </Box>

            <Stack sx={buttonStyles} spacing={1} >
                <Button
                    variant='contained'
                    style={{justifyContent:'flex-start'}}
                    sx={{
                        width:150,
                        top:250,
                        right:417,
                        borderRadius: '10px 10px 0px 0px',
                        textTransform: 'none',
                    }}
                    onClick={handleClick}
                >
                        Notice 1
                </Button>
                <Button
                    variant='contained'
                    style={{justifyContent:'flex-start'}}
                    sx={{
                        width:150,
                        top:250,
                        right:417,
                        borderRadius: 0,
                        textTransform: 'none'
                    }}
                    // onClick={{handleClick}}
                >
                        Notice 2
                </Button>
                <Button
                    variant='contained'
                    style={{justifyContent:'flex-start'}}
                    sx={{
                        width:150,
                        top:250,
                        right:417,
                        borderRadius: 0,
                        textTransform:'none'
                    }}
                    // onClick={{handleClick}}
                >
                        Notice 3
                </Button>
                <Button
                    variant='contained'
                    style={{justifyContent:'flex-start'}}
                    sx={{
                        width:150,
                        top:250,
                        right:417,
                        borderRadius:'0px 0px 10px 10px',
                        textTransform:'none'
                    }}
                    // onClick={{handleClick}}
                >
                        Notice 4
                </Button>
            </Stack>            
           
            <Paper
                elevation={0}
                sx={{
                    bgcolor: '#eaf0ff',
                    borderRadius: 2,
                    position: 'relative',
                    bottom: 596,
                    left:330,
                    width: 1150,
                    height: 630
                }}
            >

                <Collapse in={displayText}>
                    <Typography variant='h5' sx={{height:630, display:'flex', alignItems:'center', justifyContent:'center'}}>

                        {/* switch (displayText) {
                            case  'displayText':
                                
                                return 1;
                        
                            default:
                                break;
                        } */}

                        Display notice 1 here.
                    </Typography>
                </Collapse>
            </Paper>
        </Box>
        
    );

}