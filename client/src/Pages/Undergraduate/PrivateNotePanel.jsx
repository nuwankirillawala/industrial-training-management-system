import React from "react";
import { useState, useEffect } from "react";
import { Tile } from "../../components/card/Tile";
import Typography from "@mui/material/Typography";
import { Button, Divider, Stack, Box, Paper } from "@mui/material";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Dialogbox from "../../components/Dialogbox/Dialogbox";
import { AddNewNote } from "./AddNewNote";

const PrivateNotePanel = () => {
  const { user } = useAuth();
  // console.log(" hi Auth", user); //_id, title, title came from back
  const [allNote, setAllNote] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleTitleClick = (note) => {
    setSelectedNote(note);
  };

  // useEffect(() => {
  //   if (user.notes) {
  //     setAllNote(user.notes);
  //   }
  // }, []);

  const getNotices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/note/all"
      );
      if (res.status === 200) {
        console.log("hi", res.data);
        setAllNote(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <Tile>
      <Stack direction={"column"} spacing={1}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="head4">Private Notes</Typography>
          {user && (
            <Dialogbox
              title="Add New Note"
              btn_name="+"
              fontSize={20}
              fontWeight={"bold"}
            >
              <AddNewNote userId={user._id} />
            </Dialogbox>
          )}
        </Stack>
        <Divider />

        <Stack>
          <Box height={"30vh"} overflow={"auto"} padding={2}>
            <Stack spacing={2}>
              {allNote.map((note, index) => (
                <Stack spacing={2}>
                  <Stack>
                    <Typography
                      variant="body4"
                      fontWeight={"bold"}
                      onClick={() => handleTitleClick(note)}
                      style={{ cursor: "pointer" }}
                    >
                      {index + 1} : {note.title}
                    </Typography>
                    {selectedNote === note && (
                      <Paper variant="outlined">
                        <Box
                          pt={1}
                          pl={2}
                          pr={1}
                          variant="outlined"
                          sx={{ bgcolor: "#fff" }}
                        >
                          <Typography variant="body5">
                            {note.content}
                          </Typography>
                        </Box>
                      </Paper>
                    )}
                  </Stack>
                  <Divider />
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Tile>
  );
};

export default PrivateNotePanel;
