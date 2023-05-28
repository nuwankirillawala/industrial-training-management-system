import React, { useState } from "react";
import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import { CustomBackdrop } from "../../../backdrop/CustomBackdrop";
import axios from "axios";

export const SoftSkills = () => {
  //State for backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  //State for input data
  const [softSkills, setSoftSkills] = useState("");
  //End of States

  //handleSubmit for submit button      End point
  const handleSubmit = async () => {
    setOpenBackdrop(true);
    // console.log(softSkills);
    try {
      const req = await axios.post(
        "http://localhost:5000/api/v1/undergraduate/info/soft-skill",
        {
          skill: softSkills,
        },
        { withCredentials: true }
      );
      if (req.status === 201) console.log(created);
      else console.log(req);
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };
  //End of handle submit
  return (
    <Box>
      <Stack direction={"column"}>
        <FormControl fullWidth>
          <Box sx={{ minWidth: 60, mt: 1 }}>
            <TextField
              id="soft-skills"
              label="SoftSkill"
              variant="outlined"
              value={softSkills}
              onChange={(e) => setSoftSkills(e.target.value)}
            />
          </Box>
        </FormControl>
        <Box sx={{ mt: 1, mb: 1 }}>
          <Button variant="itms" size="itms-x-small" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
        {openBackdrop && <CustomBackdrop />}
      </Stack>
    </Box>
  );
};
