import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export const NoticeBoard = () => {
  return (
    <List sx={{ width: '100%', maxHeigth: 30, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              <Typography variant='caption'>
               — I'll be in your neighborhood doing errands this…
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="middle" component="li" />
    </List>
  );
}
