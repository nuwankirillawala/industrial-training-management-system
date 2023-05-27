import React from "react";
import { useState } from "react";
import { Box, Grid, Typography, Stack, IconButton, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Tile } from "../../components/card/Tile";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { EnglishProficiency } from "../../components/user/Undergraduate/studentCV/EnglishProficiency";
import { PopUpDialog } from "../../components/user/Undergraduate/studentCV/PopUpDialog";
import { CVUpload } from "./CVUpload";
import { ProgrammingLanguages } from "../../components/user/Undergraduate/studentCV/ProgrammingLanguages";

export const StudentCvUpdate = () => {
  //state for fetched data
  const [data, setData] = useState([]);
  //End of State

  //useState for PopUpDialog
  const [openForm, setOpenForm] = useState({
    englishProficiency: false,
    programmingLanguages: false,
    otherSkills: false,
    projects: false,
  });
  //End of useState for PopUpDialog

  //Control Stack toggle
  // const [isStackOpen, setStackOpen] = useState({
  //   englishProficiency: false,
  //   programmingLanguages: false,
  //   otherSkills: false,
  //   projects: false,
  // });

  // const toggleStack = (key) => {
  //   setStackOpen((prevState) => {
  //     prevState[key] = !prevState[key];
  //   });
  // };
  //End of Control Stack toggle

  //Handling state for PopUpDialog
  const togglePopup = (key) => {
    setOpenForm((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      // console.log(newState);
      return newState;
    });
  };
  //End of handling state for PopUpDialog

  return (
    <Box sx={{ height: "88vh" }}>
      <Box>
        <Typography
          variant="h6"
          color="primary"
          marginBottom={"5px"}
          paddingLeft={"15px"}
        >
          Additional Information
        </Typography>
      </Box>
      <Box sx={{ height: "100%" }}>
        <Grid container spacing={1} sx={{ height: "100%" }}>
          <Grid item xs={12}>
            {/* content here */}
            <Stack
              height={"100%"}
              spacing={1}
              display={"flex"}
              direction={"column"}
              justifyContent={"space-around"}
            >
              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    English Proficiency
                  </Typography>
                  <IconButton
                    name="addEnglishProficiency"
                    onClick={() => {
                      togglePopup("englishProficiency");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.englishProficiency}
                    setOpen={() => {
                      togglePopup("englishProficiency");
                    }}
                    id={"EnglishProficiency"}
                  >
                    <EnglishProficiency />
                  </PopUpDialog>
                </Stack>
                <Stack mt={1} direction={"row"} spacing={0.5}>
                  {data.olResult !== "" && (
                    <>
                      <Chip
                        label={`Ordinary Level result : ${data.olResult}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.alResult !== "" && (
                    <>
                      <Chip
                        label={`Ordinary Level result : ${data.alResult}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.speakingLevel !== "" && (
                    <>
                      <Chip
                        label={`Ordinary Level result : ${data.speakingLevel}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.writingLevel !== "" && (
                    <>
                      <Chip
                        label={`Ordinary Level result : ${data.writingLevel}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.readingLevel !== "" && (
                    <>
                      <Chip
                        label={`Ordinary Level result : ${data.readingLevel}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                </Stack>
              </Tile>
              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    Programming languages
                  </Typography>
                  <IconButton
                    name="addProgrammingLanguages"
                    onClick={() => {
                      togglePopup("programmingLanguages");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.programmingLanguages}
                    setOpen={() => {
                      togglePopup("programmingLanguages");
                    }}
                    id={"ProgrammingLanguages"}
                  >
                    <ProgrammingLanguages />
                  </PopUpDialog>
                </Stack>
                <Stack mt={1} direction={"row"} spacing={0.5}>
                  {data.language !== "" && (
                    <>
                      <Chip
                        label={`Language : ${data.language}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.languageLevel !== "" && (
                    <>
                      <Chip
                        label={`Level : ${data.languageLevel}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                </Stack>
              </Tile>

              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    Other Skills
                  </Typography>
                  <IconButton
                    name="addOtherSkills"
                    onClick={() => {
                      togglePopup("otherSkills");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.otherSkills}
                    setOpen={() => {
                      togglePopup("otherSkills");
                    }}
                    id={"OtherSkills"}
                  ></PopUpDialog>
                </Stack>
                <Stack mt={1} direction={"row"} spacing={0.5}>
                  {data.skill !== "" && (
                    <>
                      <Chip
                        label={`Other Skill : ${data.skill}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.skillCertificates !== "" && (
                    <>
                      <Chip
                        label={`Certificate : ${data.skillCertificates}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                </Stack>
              </Tile>

              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    Projects
                  </Typography>
                  <IconButton
                    name="addProjects"
                    onClick={() => {
                      togglePopup("projects");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.projects}
                    setOpen={() => {
                      togglePopup("projects");
                    }}
                    id={"projects"}
                  ></PopUpDialog>
                </Stack>
                <Stack mt={1} direction={"row"} spacing={0.5}>
                  {data.projects !== "" && (
                    <>
                      <Chip
                        label={`project Name : ${data.projects}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.projectDescription !== "" && (
                    <>
                      <Chip
                        label={`Project Description : ${data.projectDescription}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.projectTechnologies !== "" && (
                    <>
                      <Chip
                        label={`Used Technologies : ${data.projectTechnologies}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.projectRepoLink !== "" && (
                    <>
                      <Chip
                        label={`Project Repositary : ${data.projectRepoLink}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {data.projectLiveLink !== "" && (
                    <>
                      <Chip
                        label={`Project URL : ${data.projectLiveLink}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                </Stack>
              </Tile>
            </Stack>
          </Grid>
          {/* <Grid item xs={3}>
            <Stack direction="column" spacing={1} height={"100%"}>
              <Box sx={{ height: "100%" }}>
                <Tile sx={{ height: "100%" }}>
                  <CVUpload />
                </Tile>
              </Box>
            </Stack>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};
