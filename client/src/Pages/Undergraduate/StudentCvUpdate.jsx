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
                    <Tile height='89vh'>
                        <Stack direction='column'>
                            <Typography 
                                variant='h5'
                                align='center'
                            >
                                Curriculum Vitae
                            </Typography>
                            <StudentAddCompany/>
                            <Typography>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, saepe vero laborum voluptatum non, cumque quis quos amet exercitationem, laudantium perferendis praesentium accusamus. Quasi aliquid sint voluptas? Obcaecati, odit rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel culpa quia deserunt assumenda cum, minus dolor repellendus amet sequi, perferendis repellat excepturi sint. Libero perferendis obcaecati accusamus magni, quidem soluta. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias hic explicabo eius? Iure labore magni sed. Aut qui hic consequatur ducimus repellendus ipsa maxime! Dolore fuga exercitationem eligendi neque reiciendis? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt harum inventore hic cumque iste qui, ipsum commodi sed, blanditiis, mollitia ad consequatur. Neque quia unde dicta nostrum aspernatur, maiores eius! Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nesciunt aliquid rerum nisi totam quas ipsam illum molestias illo veniam explicabo, neque molestiae, ea accusamus? Beatae saepe delectus iure ratione. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, perferendis! Ea ad, distinctio nostrum, fugiat autem, ipsam nobis placeat animi quae tempora quaerat veniam. At culpa modi sint quas sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, non nam labore alias sunt architecto soluta aspernatur nihil? Dignissimos veritatis nam atque error enim dolorem aliquam magnam laboriosam, veniam deserunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur, atque eos a tempore excepturi molestiae odit aut doloribus harum explicabo corrupti delectus inventore, error quis rerum modi eligendi! Excepturi, repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, impedit ratione? Id illo ipsa voluptatem earum tenetur, ab eum, aspernatur saepe qui non optio debitis quibusdam nemo ea neque. Excepturi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, error ea? Non facere dolorem vel sequi, doloribus itaque esse vitae facilis, consequuntur nulla delectus odio ipsum culpa explicabo id. Nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate recusandae similique iusto culpa, eos sequi nostrum facilis minima esse nulla? Quod beatae repellendus maiores possimus impedit vitae, odit sed excepturi.
                            </Typography>
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
                                            <input
                                                type="file"
                                                hidden
                                             />
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