import {
    Box,
    Grid,
    Typography,
    Button,
} from '@mui/material'
import { Tile } from '../../../card/Tile'

export const CvUpdate = () => {
    return (
        <Box sx={{display: 'flex', height: '100%'}}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    {/* content here */}
                    <Tile>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ducimus alias iusto fuga libero natus quas earum, molestiae error voluptatem labore culpa, quia quaerat at aspernatur nemo magnam enim ratione? Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae praesentium natus, placeat repellat quasi, atque architecto illum maxime dolorem aperiam modi iure eligendi? Voluptas ipsum repellendus mollitia, nisi excepturi cum.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas explicabo illum deleniti, ratione porro quas, praesentium similique incidunt cum laboriosam culpa voluptatum dolorem qui distinctio accusamus nulla facere ullam commodi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit ullam blanditiis, enim recusandae officiis nobis nulla, doloribus minima deleniti beatae, possimus velit quisquam vero culpa est numquam error natus iusto.
                        </Typography>
                    </Tile>
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction= 'column' spacing={1}>
                        <Grid item>
                            {/* content here */}
                            <Tile>hello
                                <Button 
                                    variant='itms'
                                >
                                    hello
                                </Button>
                            </Tile>
                        </Grid>
                        <Grid item>
                            {/* content here */}
                            <Tile>
                                <Typography>
                                    Upload your CV
                                </Typography>
                                <Typography>Choose file:</Typography>
                            </Tile>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
} 