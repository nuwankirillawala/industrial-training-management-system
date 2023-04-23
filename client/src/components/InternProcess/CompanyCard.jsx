import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

const CompanyCard = ({company}) => {
    return (
        <Card sx={{ display: 'flex', backgroundColor: '#fff', maxWidth: 400}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {company.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Company
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={company.image}
                alt="Live from space album cover"
            />
        </Card>
    )
}

export default CompanyCard