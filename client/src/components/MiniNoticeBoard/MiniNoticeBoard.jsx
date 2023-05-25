import * as React from "react";
import {
  IconButton,
  Divider,
  ListItemAvatar,
  Typography,
  Box,
  Grid,
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";

export const MiniNoticeBoard = () => {
  const [expaned, setExpaned] = useState(false);
  const [noticeId, setNoticeId] = useState(null);
  const [notices, setNoticeData] = useState([]); //state for fetched notice data

  //fetch data
  const getNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/notice/all");
      if (res.data.status === "success") {
        console.log(res.data.data);
        setNoticeData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);
  //End of fetch data

  const handleExpanedLess = () => {
    setExpaned(false);
    // setNoticeId(null);
    console.log("less expaned");
  };

  return (
    <Box width={"100%"} height={"35vh"}>
      {/* notice list */}
      {expaned === false && (
        <List>
          {notices.map((notice, index) => (
            <Box>
              <Stack direction={"row"}>
                <ListItemButton
                  key={index}
                  onClick={() => {
                    setNoticeId(notice._id);
                    setExpaned(true);
                    console.log("more expaned");
                    console.log({ noticeId });
                  }}
                >
                  {/* <ListItemAvatar>
                      { notice.read === true && 
                      <MarkEmailReadOutlinedIcon color='disabled' />
                      }
                      { notice.read === false && 
                        <MarkEmailUnreadOutlinedIcon  color='info' />
                      }
                    </ListItemAvatar> */}
                  <Box maxHeight={70} sx={{ overflow: "hidden" }}>
                    <ListItemText primary={notice.title} />
                  </Box>
                </ListItemButton>
                {expaned === false && (
                  <IconButton
                    edge="end"
                    aria-label="expanedMore"
                    onClick={() => {
                      setNoticeId(notice._id);
                      setExpaned(true);
                      console.log("more expaned");
                      console.log({ noticeId });
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                )}
              </Stack>
              <Divider />
            </Box>
          ))}
        </List>
      )}
      {expaned === true && (
        <Box>
          {notices.map((notice) => (
            <>
              {notice._id === noticeId && (
                <Stack direction={"column"} height={"100%"} spacing={1}>
                  <Stack flex={2} direction={"row"}>
                    <Box
                      flex={5}
                      maxHeight={"10vh"}
                      sx={{
                        overflow: "auto",
                      }}
                    >
                      <Typography fontWeight={"bold"}>
                        {notice.title}
                      </Typography>
                    </Box>
                    <Stack flex={1}>
                      {expaned === true && (
                        <IconButton
                          edge="end"
                          aria-label="expandLess"
                          onClick={handleExpanedLess}
                        >
                          <ExpandLessIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </Stack>
                  <Divider />
                  <Stack flex={3}>
                    <Box flex={5} maxHeight={"28vh"} sx={{ overflow: "auto" }}>
                      {notice.body}
                    </Box>
                  </Stack>
                </Stack>
              )}
            </>
          ))}
        </Box>
      )}
    </Box>
  );
};
