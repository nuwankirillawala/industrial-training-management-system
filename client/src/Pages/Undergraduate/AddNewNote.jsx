import { TextField, Stack, Button, Typography, Box } from "@mui/material";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Tile } from "../../components/card/Tile";
import axios from "axios";
import { StatusSnackBar } from "../../components/StatusSnackBar/StatusSnackBar";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";

export const AddNewNote = ({ userId }) => {
  const [note, setNote] = useState({
    userId: "",
    title: "",
    content: "",
  });

  //State for back drop
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //statusSnackBar state
  const [trigger, setTrigger] = useState({
    success: false,
    error: false,
  });

  //End of statusSnackBar state
  const handleSnackBar = (key) => {
    setTrigger((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      return newState;
    });
  };

  //onchange Note
  const onChangeNote = (e) => {
    setNote((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async () => {
    setOpenBackdrop(true);
    console.log(note);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/undergraduate/note`,
        {
          title: note.title,
          content: note.content,
        },
        { withCredentials: true }
      );
      window.location.reload(false);
      console.log(res.status);

      if (res.status === 201) {
        handleSnackBar("success");
      } else {
        handleSnackBar("error");
      }
    } catch (error) {
      console.log(error);
      handleSnackBar("error");
    }
    setOpenBackdrop(false);
  };

  return (
    <Box>
      <Stack direction={"row"}>
        <Tile>
          <form>
            <>
              <Stack direction="column" spacing={2}>
                <Stack width="300px">
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    onChange={onChangeNote}
                    placeholder={"Title"}
                    value={note.title} //if u use User here it will not let change text
                    name="title"
                  />
                </Stack>

                <Stack width="300px">
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    onChange={onChangeNote}
                    placeholder={"Content"}
                    value={note.content} //if u use User here it will not let change text
                    name="content"
                  />
                </Stack>
              </Stack>

              <Stack
                direction="row"
                display={"flex"}
                justifyContent="flex-end"
                paddingRight={"0px"}
              >
                <Button variant="itms" onClick={handleFormSubmit}>
                  Submit
                </Button>
                <Button variant="itms" type="reset">
                  Reset
                </Button>
              </Stack>
            </>
          </form>
          <StatusSnackBar
            severity="success"
            trigger={trigger.success}
            setTrigger={() => {
              handleSnackBar(" Update success");
            }}
            alertMessage={"Update Succefully"}
          />
          <StatusSnackBar
            severity="error"
            trigger={trigger.error}
            setTrigger={() => {
              handleSnackBar("error");
            }}
            alertMessage={"Update Fail"}
          />
        </Tile>
        {openBackdrop && <CustomBackdrop />}
      </Stack>
    </Box>
  );
};
