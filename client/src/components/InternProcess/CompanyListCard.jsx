import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Tile } from '../card/Tile';

const CompanyListCard = ({ company, select, profile }) => {
    const navigate = useNavigate();

    const handleSelectButton = (companyId) => {
        navigate(`/intern-process-company/${companyId}`)
    }

    return (
        <Card sx={{ display: 'flex', backgroundColor: '#fff', justifyContent: 'space-between' }}>
            <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={company.image}
                alt="company logo"
            />
            <CardContent>
                <Typography component="div" variant="h6">
                    {company.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Company
                </Typography>
            </CardContent>
            <CardContent>
                {/* <Box> */}
                    <Typography variant="subtitle1" color="text.secondary">Intern List Count: 10</Typography>
                    <Typography variant="subtitle1" color="text.secondary">Application Round: 1</Typography>
                {/* </Box> */}
            </CardContent>
            <CardActions>
                <Button
                    size="medium"
                    variant='outlined'
                    onClick={() => navigate(profile)}
                >
                    See More Details
                </Button>
                <Button
                    size="medium"
                    variant='contained'
                    onClick={() => handleSelectButton(company._id)}
                >
                    Select
                </Button>
            </CardActions>

        </Card>
    )
}

export default CompanyListCard