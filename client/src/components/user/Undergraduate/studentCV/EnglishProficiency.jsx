import React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button } from "@mui/material";
import axios from "axios";

export const EnglishProficiency = ({ passDataFromChild }) => {
  const [value, setValue] = useState({
    olResult: "",
    alResult: "",
    speakingLevel: "",
    writingLevel: "",
    readingLevel: "",
  });

  //Controllers of Slider TEMP
  const handleSliderChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === "" ? "" : Number(e.target.value),
    }));
  };

  const handleBlur = (e) => {
    if (value < 0) {
      setValue((prevState) => ({
        ...prevState,
        [e.target.name]: 0,
      }));
    } else if (value > 100) {
      setValue((prevState) => ({
        ...prevState,
        [e.target.name]: 100,
      }));
    }
  };
  //End of Controllers of Slider TEMP

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
    console.log(value);
    // console.log("now from parent");
    // passDataFromChild({
    //   olResult: value.olResult,
    //   alResult: value.alResult,
    //   speakingLevel: value.speakingLevel,
    //   writingLevel: value.writingLevel,
    //   readingLevel: value.readingLevel,
    // });
    try {
      const req = await axios.post(
        "http://localhost:5000/api/v1/undergraduate/info/english-skill",
        {
          odinaryLevel: value.olResult,
          advancedLevel: value.alResult,
          level01: value.level1,
          level02: value.level2,
          certificates: value.certificates,
        },
        { withCredentials: true }
      );
      if (req.status === 200) {
        console.log("success");
      } else console.log("failed");
    } catch (error) {
      console.log(error);
    }
  };
  //end of handle submit button

  return (
    <form>
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
        <FormControl>
          <Stack>
            <Box sx={{ width: 300 }}>
              <FormLabel id="label-speakinLevel">Speaking Level</FormLabel>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <RecordVoiceOverIcon />
                </Grid>
                <Grid item xs>
                  <Slider
                    value={
                      typeof value.speakingLevel === "number"
                        ? // typeof otherProps.speakingLevel === "number"
                          value.speakingLevel
                        : // ? otherProps.speakingLevel
                          0
                    }
                    onChange={handleSliderChange}
                    aria-labelledby="speakingLevel"
                    name="speakingLevel"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{
                      width: "70px",
                    }}
                    name="speakingLevel"
                    variant="standard"
                    value={value.speakingLevel}
                    // value={otherProps.speakingLevel}
                    size="small"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 100,
                      type: "number",
                      "aria-labelledby": "speakingLevel",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ width: 300 }}>
              <FormLabel id="label-readingLevel">Reading Level</FormLabel>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <AutoStoriesIcon />
                </Grid>
                <Grid item xs>
                  <Slider
                    value={
                      typeof value.readingLevel === "number"
                        ? value.readingLevel
                        : // typeof otherProps.readingLevel === "number"
                          //   ? otherProps.readingLevel
                          0
                    }
                    onChange={handleSliderChange}
                    aria-labelledby="readingLevel"
                    name="readingLevel"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{
                      width: "70px",
                    }}
                    name="readingLevel"
                    variant="standard"
                    value={value.readingLevel}
                    // value={otherProps.readingLevel}
                    size="small"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 100,
                      type: "number",
                      "aria-labelledby": "readingLevel",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ width: 300 }}>
              <FormLabel id="label-writingLevel">Writing Level</FormLabel>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <BorderColorIcon />
                </Grid>
                <Grid item xs>
                  <Slider
                    value={
                      typeof value.writingLevel === "number"
                        ? value.writingLevel
                        : // typeof otherProps.writingLevel === "number"
                          //   ? otherProps.writingLevel
                          0
                    }
                    onChange={handleSliderChange}
                    aria-labelledby="writingLevel"
                    name="writingLevel"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{
                      width: "70px",
                    }}
                    name="writingLevel"
                    variant="standard"
                    value={value.writingLevel}
                    // value={otherProps.writingLevel}
                    size="small"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 100,
                      type: "number",
                      "aria-labelledby": "writingLevel",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </FormControl>
        <br />
        <Button variant="itms" size="itms-small" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};
