import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MiniCardType2 = ({ title, content, goto }) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ minWidth: 275, backgroundColor: '#fff' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Divider sx={{ m: 1 }} />
                <Typography variant="body2">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="medium"
                    onClick={() => navigate(goto)}
                    endIcon={<NavigateNextIcon />}
                >
                    Continue
                </Button>
            </CardActions>
        </Card>
    )
}

export default MiniCardType2