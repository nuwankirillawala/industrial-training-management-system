import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
const TypeSelectionCard = ({ image, title, content, goto }) => {
    const navigate = useNavigate();
    
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
                <Button
                    size="small"
                    onClick={() => navigate(goto)}
                >
                    Continue
                </Button>
            </CardActions>
        </Card>
    )
}

export default InternProcessTypeCard;