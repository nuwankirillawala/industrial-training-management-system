import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
} from '@mui/material'
import { Tile } from '../../../card/Tile'

export const StudentCvUpdate = () => {
    return (
        <Box sx={{display: 'flex', height: '100%'}}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    {/* content here */}
                    <Tile>
                        <Box sx={{display: 'flex'}}>
                            <Box>
                                <Typography 
                                    variant='h4'
                                    align='center'
                                >
                                    Curriculum Vitae
                                </Typography>
                            </Box>
                        </Box>
                    </Tile>
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction= 'column' spacing={1}>
                        <Grid item>
                            {/* left top content here */}
                            <Box>
                                <Tile>hello
                                </Tile>
                            </Box>
                        </Grid>
                        <Grid item>
                            {/* left bottom content here */}
                            <Box>
                                <Tile>
                                    <Typography>
                                        Upload your CV;
                                    </Typography>
                                    <Typography>Choose file:</Typography>
                                    <TextField
                                        id='outlined-basic'
                                        label= 'Select your file'
                                        variant='outlined'
                                    /><br/>
                                    <Button
                                        variant='itms'
                                        size='large'
                                    >
                                        Browse
                                    </Button><br/>
                                    <Button
                                        variant='itms'
                                    >
                                        Upload
                                    </Button>
                                </Tile>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
} 