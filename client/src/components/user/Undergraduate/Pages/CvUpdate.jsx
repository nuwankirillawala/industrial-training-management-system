import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
} from '@mui/material'
import { Tile } from '../../../card/Tile'

export const CvUpdate = () => {
    return (
        <Box sx={{display: 'flex', height: '100%'}}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    {/* content here */}
                    <Tile>
                        <Box sx={{display: 'flex'}}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ducimus alias iusto fuga libero natus quas earum, molestiae error voluptatem labore culpa, quia quaerat at aspernatur nemo magnam enim ratione? Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae praesentium natus, placeat repellat quasi, atque architecto illum maxime dolorem aperiam modi iure eligendi? Voluptas ipsum repellendus mollitia, nisi excepturi cum.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas explicabo illum deleniti, ratione porro quas, praesentium similique incidunt cum laboriosam culpa voluptatum dolorem qui distinctio accusamus nulla facere ullam commodi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit ullam blanditiis, enim recusandae officiis nobis nulla, doloribus minima deleniti beatae, possimus velit quisquam vero culpa est numquam error natus iusto.
                            </Typography>
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