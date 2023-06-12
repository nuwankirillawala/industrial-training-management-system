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
  Paper,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const NoticeBoard = () => {
  const [expaned, setExpaned] = useState(false);
  const [noticeId, setNoticeId] = useState(null);
  const [notices, setNoticeData] = useState([]); //state for fetched notice data
  const navigate = useNavigate();

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
    // <Paper variant="outlined" sx={{ bgcolor: "#fff" }}>
    <Stack direction={"column"} spacing={1} padding={0}>
      <Stack>
        <Typography variant="head6">Notice </Typography>
      </Stack>
      <Divider />
      <Stack>
        {/* <Paper variant="outlined"> */}
        <Box width={"100%"} height={"35vh"} overflow={"clip"}>
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
                        <Box
                          flex={5}
                          maxHeight={"28vh"}
                          sx={{ overflow: "auto" }}
                        >
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
      </Stack>
      <Stack>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/notice");
          }}
        >
          Full Notice
        </Button>
      </Stack>
    </Stack>
    // </Paper>
  );
};
