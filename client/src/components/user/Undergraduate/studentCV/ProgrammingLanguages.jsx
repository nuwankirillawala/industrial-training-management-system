import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { CustomBackdrop } from "../../../backdrop/CustomBackdrop";
import axios from "axios";

export const ProgrammingLanguages = () => {
  //Knowledge level
  const level = ["Beginer", "Intermediate", "Pro"];
  //End of Knowledge level

  //Programming languages
  const languages = ["java", "javascript", "python", "c", "c++"];

  //useState for colected values
  const [value, setValue] = useState({
    language: "",
    level: "",
  });

  //use State for button disable
  const [isDisabled, setIsDisabled] = useState(true);

  //State for backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  //End of states

  //onchange Radio group
  const onChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (
      e.target.name === "language" &&
      e.target.value !== "" &&
      value.level !== ""
    ) {
      setIsDisabled(false);
    }
    if (
      e.target.name === "level" &&
      e.target.value !== "" &&
      value.language !== ""
    ) {
      setIsDisabled(false);
    }
  };
  //End of onchange Radio group

  //handleChange the submit button        End point
  const handleSubmit = async () => {
    try {
      setOpenBackdrop(true);
      const req = await axios.post(
        "http://localhost:5000/api/v1/undergraduate/info/technology-skill",
        {
          name: value.language,
          level: value.level,
        },
        { withCredentials: true }
      );

      if (req.status === 201) {
        console.log("created!");
      } else console.log(req);
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };
  //End of handleChange

  return (
    <Box>
      <Stack direction={"column"}>
        <FormLabel id="label-langues">Programming Languages</FormLabel>
        <Box sx={{ minWidth: 60, mt: 1, mb: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="languages">language</InputLabel>
            <Select
              labelId="languages"
              id="language"
              name="language"
              value={value.language}
              label="language"
              onChange={onChange}
            >
              {languages.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormLabel id="label-level">Level Two English</FormLabel>
        <Box sx={{ minWidth: 60, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="skill-level">Level</InputLabel>
            <Select
              labelId="skill-level"
              id="level"
              name="level"
              value={value.level}
              label="Level"
              onChange={onChange}
            >
              {level.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <br />
        <Button
          type="submit"
          variant="itms"
          size="itms-x-small"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Submit
        </Button>
      </Stack>
      {openBackdrop && <CustomBackdrop />}
    </Box>
  );
};
