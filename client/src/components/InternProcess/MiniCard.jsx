import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MiniCard = ({title, content, goto}) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ minWidth: 275, backgroundColor: '#fff'}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                size="small"
                onClick={() => navigate(goto)}
                >See More</Button>
            </CardActions>
        </Card>
    )
}

export default MiniCard