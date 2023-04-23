import * as React from 'react';
import { IconButton, Divider, ListItemAvatar ,Typography ,Box, Grid, List, ListItemText, ListItem ,ListItemButton, Stack } from '@mui/material';
import { useState } from 'react';
import { Tile } from '../../components/card/Tile';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const notices = [
    {
        subject: 'Notice 1 akjd kjasd kslkdj kljasld  ksjdlk jslkd jskldjflsj kj ',
        notice: 'This is notice 1.',
        attachnemt : 'no',
        read : true,
        id : 1
    },
    {
        subject: 'Notice 2',
        notice: 'This is notice 2.',
        attachnemt : 'no',
        read :false,
        id : 2
    },
    {
        subject: 'Notice 3',
        notice: 'This is notice 3.',
        attachnemt : 'no',
        read : false,
        id : 3
    },
    {
        subject: 'Notice 4',
        notice: 'This is notice 4. as props to the onClick event handler in the button.The arrow function takes the event as an argument and calls clickHandler function. You can pass many parameters to the clickHandler function as per our needs. ss parameters without event object You can pass parameters without event object as given below.',
        attachnemt : 'no',
        read : true,
        id : 4
    },
    {
        subject: 'Notice 5',
        notice: 'This isssssssssssssss ssssssssss sssssssssss notice 5.',
        attachnemt : 'no',
        read : false,
        id : 5
    }

]

export const NoticeBoard = () => {
    
    const [displayText, setDisplayText] = useState('');
    const [showSubject, setShowSubject] = useState(false);
    const [expaned, setExpaned] = useState(false);
    const [noticeId, setNoticeId] = useState(null);

    const handleClick = (notice) => {
        console.log({notice});
    }    
    const handleExpanedMore = ({id}) => {
      setExpaned(true);
      setNoticeId(id);
      console.log("more expaned");
    }    
    const handleExpanedLess = () => {
      setExpaned(false);
      // setNoticeId(null);
      console.log("less expaned");
    }    

    return (

        <Grid container>
            <Grid item md={12}>
                <Tile>

                  <Box width={'100%'} height={'30vh'}>


                    {/* notice list */}


                    {expaned === false &&
                        <List>
                          {notices.map((notice, index) => (
                            // <Box maxHeight={10}>
                              <Stack direction={'row'}>

                              <ListItemButton
                                  key={index}
                                  onClick={() => {
                                    setNoticeId(notice.id);
                                    setExpaned(true);
                                    console.log("more expaned");
                                    console.log({noticeId});
                                  }}
                              >
                                <ListItemAvatar>
                                  { notice.read === true && 
                                  <MarkEmailReadOutlinedIcon color='disabled' />
                                  }
                                  { notice.read === false && 
                                    <MarkEmailUnreadOutlinedIcon  color='info' />
                                  }
                                </ListItemAvatar>

                                <Box
                                  sx={{overflow: 'auto'}}
                                >
                                  <ListItemText
                                      primary={notice.subject}
                                  />
                                </Box>

                              </ListItemButton>

                              {expaned === false && 
                                  <IconButton
                                    edge="end"
                                    aria-label="expanedMore"
                                    onClick={() => {
                                      setNoticeId(notice.id);
                                      setExpaned(true);
                                      console.log("more expaned");
                                      console.log({noticeId});
                                    }}
                                    >
                                    <ExpandMoreIcon />
                                  </IconButton>
                                }

                              </Stack>
                              // <Divider />
                            // </Box>
                          ))}
                      </List>
                    }

                    {expaned === true &&
                      <Box>
                        {notices.map((notice)=>(
                          <>
                          {notice.id === noticeId && 
                            <Stack direction={'column'} height={'100%'} spacing={1}>
                              <Stack flex={2} direction={'row'}>
                                <Box 
                                  flex={5} 
                                  maxHeight={'10vh'} 
                                  sx={{
                                  overflow: 'auto'
                                  }}>
                                    <Typography fontWeight={'bold'}>
                                      {notice.subject}
                                      </Typography>
                                </Box>

                                <Stack flex={1}>
                                {expaned === true && 
                                    <IconButton 
                                      edge="end"
                                      aria-label="expandLess"
                                      onClick={handleExpanedLess}
                                    >
                                      <ExpandLessIcon />
                                    </IconButton>
                                  }
                                </Stack>
                              </Stack>
                              <Divider />
                              <Stack flex={3}>
                              <Box 
                                  flex={5}
                                  maxHeight={'24vh'}
                                  sx={{overflow: 'auto'}}
                                >
                                    {notice.notice}
                                </Box>
                              </Stack>
                            </Stack>
                          }
                        </>
                        ))}
                      </Box>
                    }


                </Box>

                </Tile>
            </Grid>
        </Grid>

    );

}
















// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import { Button } from '@mui/material'

// const message = `Truncation should be conditionally applicable on this long line of text
//  as this is a much longer line than what the container can support. `;


//  export const NoticeBoard = () => {

//   return (
//       // <Button>
//         <Box style={{ whiteSpace: 'nowrap'}}>
//           <Stack
//             sx={{
//               // my: 0.5,
//               p: 1,
//               // border: '1px solid',
//               // borderRadius: 2,
//             }}
//             direction='row'
//             spacing={1}
//             >
//             <Box>
//               <Avatar>{message && (message ? message.charAt(0) : "")}</Avatar>
//             </Box>
//             <Box sx={{
//               padding:'10px',
//               alignItems:'center',
//               textOverflow: 'ellipsis',
//               overflow: 'hidden',
//             }}
//             >
//               {message}</Box>
//           </Stack>
//         </Box>
//     // </Button>
//   );
// }