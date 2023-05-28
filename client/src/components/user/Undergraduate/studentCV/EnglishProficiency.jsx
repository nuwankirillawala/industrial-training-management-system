import React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { CustomBackdrop } from "../../../backdrop/CustomBackdrop";

export const EnglishProficiency = () => {
  //Result array for level-01/02 english
  const grade = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "E",
  ];
  //End of result array

  //useState for colected values
  const [value, setValue] = useState({
    olResult: "",
    alResult: "",
    level01: "",
    level02: "",
    certificates: [],
  });

  //State for back drop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  //End of statesS

  //onchange Radio group
  const onChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //End of onchange Radio group

  //handle submit button
  const handleSubmit = async () => {
    setOpenBackdrop(true);
    console.log(value);
    try {
      const req = await axios.post(
        "http://localhost:5000/api/v1/undergraduate/info/english-skill",
        {
          odinaryLevel: value.olResult,
          advancedLevel: value.alResult,
          level01: value.level01,
          level02: value.level02,
          certificates: value.certificates,
        },
        { withCredentials: true }
      );
      if (req.status === 201) {
        console.log("success");
      } else console.log("failed");
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };
  //end of handle submit button

  return (
    <Stack>
      <FormControl required>
        <FormLabel id="label-olResult">Ordinary Level</FormLabel>
        <RadioGroup
          row
          aria-labelledby="olResult"
          name="olResult"
          value={value.olResult}
          onChange={onChange}
        >
          <FormControlLabel value="A" control={<Radio />} label="A" />
          <FormControlLabel value="B" control={<Radio />} label="B" />
          <FormControlLabel value="C" control={<Radio />} label="C" />
          <FormControlLabel value="S" control={<Radio />} label="S" />
          <FormControlLabel value="F" control={<Radio />} label="F" />
        </RadioGroup>

        <FormLabel id="label-alResult">Advance Level</FormLabel>
        <RadioGroup
          row
          aria-labelledby="alResult"
          name="alResult"
          value={value.alResult}
          // value={otherProps.alResult}
          onChange={onChange}
        >
          <FormControlLabel value="A" control={<Radio />} label="A" />
          <FormControlLabel value="B" control={<Radio />} label="B" />
          <FormControlLabel value="C" control={<Radio />} label="C" />
          <FormControlLabel value="S" control={<Radio />} label="S" />
          <FormControlLabel value="F" control={<Radio />} label="F" />
        </RadioGroup>
      </FormControl>
      <FormLabel id="label-olResult">Level One English</FormLabel>
      <Box sx={{ minWidth: 60, mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="level-one-english">Level01</InputLabel>
          <Select
            labelId="level-one-english"
            id="level01"
            name="level01"
            value={value.level01}
            label="Level01"
            onChange={onChange}
          >
            {grade.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormLabel id="label-olResult">Level Two English</FormLabel>
      <Box sx={{ minWidth: 60, mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="level-two-english">Level02</InputLabel>
          <Select
            labelId="level-two-english"
            id="level02"
            name="level02"
            value={value.level02}
            label="Level02"
            onChange={onChange}
          >
            {grade.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        type="submit"
        variant="itms"
        size="itms-x-small"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {openBackdrop && <CustomBackdrop />}
    </Stack>
  );
};
