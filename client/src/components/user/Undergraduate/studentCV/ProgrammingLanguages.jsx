import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useState } from "react";

export const ProgrammingLanguages = () => {
  //Knowledge level
  const level = ["Beginer", "Intermediate", "Pro"];
  //End of Knowledge level

  //useState for colected values
  const [value, setValue] = useState({
    language: "",
    level: "",
  });
  //End of statesS

  //onchange Radio group
  const onChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //End of onchange Radio group

  //handleChange the submit button        End point
  const handleSubmit = () => {
    console.log("End point here!");
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
              {level.map((option, index) => (
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
        <Button variant="itms" size="itms-x-small" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};
