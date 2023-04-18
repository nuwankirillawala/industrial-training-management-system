import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material'

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;


 export const NoticeBoard = () => {

  return (
      // <Button>
        <Box style={{ whiteSpace: 'nowrap'}}>
          <Stack
            sx={{
              // my: 0.5,
              p: 1,
              // border: '1px solid',
              // borderRadius: 2,
            }}
            direction='row'
            spacing={1}
            >
            <Box>
              <Avatar>{message && (message ? message.charAt(0) : "")}</Avatar>
            </Box>
            <Box sx={{
              padding:'10px',
              alignItems:'center',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            >
              {message}</Box>
          </Stack>
        </Box>
    // </Button>
  );
}