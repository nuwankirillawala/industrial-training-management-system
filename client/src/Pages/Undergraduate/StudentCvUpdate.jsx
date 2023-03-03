import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    Stack,
} from '@mui/material'
import { Tile } from '../../components/card/Tile'
import { StudentAddCompany } from '../../components/user/Undergraduate/StudentAddCompany'

export const StudentCvUpdate = () => {
    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    {/* content here */}
                    <Tile>
                        <Stack direction='column'>
                            <Typography 
                                variant='h5'
                                align='center'
                            >
                                Curriculum Vitae
                            </Typography>
                            <StudentAddCompany/>
                            <Box display='flex' justifyContent='flex-end'>
                                <Stack direction='row'>
                                    <Button
                                        variant='itms'
                                        size='itms-small'
                                    >
                                        edit
                                    </Button>
                                    <Button
                                        variant='itms'
                                        size='itms-small'
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant='itms'
                                        size='itms-small'
                                    >
                                        previous
                                    </Button>
                                    <Button
                                        variant='itms'
                                        size='itms-small'
                                    >
                                        next
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>
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
                                    <Typography variant='body2'>
                                        Upload your CV:
                                    </Typography><br/>
                                    <Typography variant='body2'>Choose file:</Typography>
                                    <Stack direction='row'>
                                        <TextField
                                            id='outlined-basic'
                                            label= 'Select your file'
                                            variant='outlined'
                                            size='small'
                                        />
                                        <Button
                                            variant='itms'
                                            size='itms-small'
                                        >
                                            Browse
                                        </Button>
                                    </Stack>
                                    <Button
                                        variant='itms'
                                        size='itms-small'
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