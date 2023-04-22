import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
const InternProcessTypeCard = ({image, title, content}) => {
    return (
        <Card sx={{ maxWidth: 380, backgroundColor: '#fff' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="gray">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Continue</Button>
            </CardActions>
        </Card>
    )
}

export default InternProcessTypeCard;