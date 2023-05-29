import { useEffect, useState } from "react";
import React from "react";
import {
  Stack,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Tile } from "../../components/card/Tile";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import axios from "axios";

function resultsData(courseUnitCode, courseUnitName, courseUnitGrade) {
  return {
    courseUnitCode,
    courseUnitName,
    courseUnitGrade,
  };
}

// const results = [
//   resultsData("AMT112β", "Mathematical Foundations of Computer Science", "A"),
//   resultsData("CSC1113", "Programing Techniques", "A-"),
//   resultsData("CSC1122", "Computer Systems I", "C"),
//   resultsData("CSC113α", "Internet Services and Web Development", "B+"),
//   resultsData("CSC1142", "System Analyst & Design", "D+"),
//   resultsData("CSC1153", "Laboratory Assignments", "B+"),
//   resultsData("MAT112δ", "Differential Equation", "A"),
//   resultsData("MAT113δ", "Introductory Statistics", "A-"),
//   resultsData("CSC1213", "Database Management Systems", "B"),
//   resultsData("CSC1223", "Data Structure and Algorithms", "B+"),
//   resultsData("CSC1233", "Software Engineering", "C"),
//   resultsData("CSC1242", "Object Oriented System Development", "B-"),
//   resultsData("CSC1251", "Computer Laboratory", "B"),
//   resultsData("ENG1201", "Preliminary English II (Level 01)", "D+"),
//   resultsData("MAT121β", "Algebra", "B"),
//   resultsData("MAT122β", "Calculus", "B"),
//   resultsData("AMT212β", "Computational Mathematics", "C+"),
//   resultsData("CSC2113", "Data Communication & Computer Networks", "B-"),
//   resultsData("CSC2123", "Object Oriented Programming", "B"),
//   resultsData("CSC2133", "Operating Systems", "B"),
//   resultsData("CSC2143", "Computer Graphics and Image Processing", "MC"),
//   resultsData("MAT211β", "Linear Algebra", "A-"),
//   resultsData("PHY2112", "Electronics", "C"),
//   resultsData("CSC2263", "Multimedia and Video Production", "B+"),
// ];

const tableHeight = 480;

export const StudentShowResult = () => {
  //State for selected Level
  const [level, setLevels] = useState("");
  //state for selected semester
  const [semester, setSemesters] = useState("");
  //State for selected unicode
  const [data, setData] = useState([]);
  //State for backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  //End of States

  //MenuItems for selection
  // const level = ['level-01', 'level-02', ]
  //End of menu items for selection

  //Onchange function in select
  const onChangeLevel = (e) => {
    setLevels(e.target.value);
  };

  const onChangeSemester = (e) => {
    setSemesters(e.target.value);
  };
  //End of onChange

  //Fetch data from the backend
  const getData = async () => {
    setOpenBackdrop(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/result/individual",
        { withCredentials: true }
      );
      if (res.status === 200) {
        // console.log(res.data.courses);
        setData(res.data.courses);
      } else console.log(res);
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };

  useEffect(() => {
    getData();
  }, []);
  //End of fetching data

  //Result object
  const results = [
    resultsData("AMT112β", "Mathematical Foundations of Computer Science", "C"),
    resultsData("CSC1113", "Programing Techniques", "A-"),
    resultsData("CSC1122", "Computer Systems I", "C"),
    resultsData("CSC113α", "Internet Services and Web Development", "B+"),
    resultsData("CSC1142", "System Analyst & Design", "D+"),
    resultsData("CSC1153", "Laboratory Assignments", "B+"),
    resultsData("MAT112δ", "Differential Equation", "A"),
    resultsData("MAT113δ", "Introductory Statistics", "A-"),
    resultsData("CSC1213", "Database Management Systems", "B"),
    resultsData("CSC1223", "Data Structure and Algorithms", "B+"),
    resultsData("CSC1233", "Software Engineering", "C"),
    resultsData("CSC1242", "Object Oriented System Development", "B-"),
    resultsData("CSC1251", "Computer Laboratory", "B"),
    resultsData("ENG1201", "Preliminary English II (Level 01)", "D+"),
    resultsData("MAT121β", "Algebra", "B"),
    resultsData("MAT122β", "Calculus", "B"),
    resultsData("AMT212β", "Computational Mathematics", "C+"),
    resultsData("CSC2113", "Data Communication & Computer Networks", "B-"),
    resultsData("CSC2123", "Object Oriented Programming", "B"),
    resultsData("CSC2133", "Operating Systems", "B"),
    resultsData("CSC2143", "Computer Graphics and Image Processing", "MC"),
    resultsData("MAT211β", "Linear Algebra", "A-"),
    resultsData("PHY2112", "Electronics", "C"),
    resultsData("CSC2263", "Multimedia and Video Production", "B+"),
  ];
  //End of Result object

  return (
    <Box>
      <Stack direction={"column"} spacing={1}>
        <Box>
          <Typography variant="pageTitle">View Results</Typography>
        </Box>
        <Tile>
          <Stack direction={"column"} spacing={2} height={"75vh"}>
            <Stack
              direction={"row"}
              spacing={2}
              width={"100%"}
              maxHeight={"35px"}
            >
              <Stack direction={"row"} spacing={2} flex={3}>
                <Typography variant="body" fontWeight={"bold"}>
                  Level
                </Typography>
                <Select
                  value={level}
                  variant="outlined"
                  size="small"
                  onChange={onChangeLevel}
                  fullWidth
                >
                  <MenuItem value="1">Level 1</MenuItem>
                  <MenuItem value="2">Level 2</MenuItem>
                  <MenuItem value="3">Level 3</MenuItem>
                  <MenuItem value="">All</MenuItem>
                </Select>
              </Stack>
              <Stack direction={"row"} spacing={2} flex={3}>
                <Typography variant="body" fontWeight={"bold"}>
                  Semester
                </Typography>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={semester}
                  onChange={onChangeSemester}
                >
                  <MenuItem value="1">Semester 1</MenuItem>
                  <MenuItem value="2">Semester 2</MenuItem>
                  <MenuItem value="">All</MenuItem>
                </Select>
              </Stack>
            </Stack>

            <Stack width={"100%"} height={tableHeight}>
              <TableContainer sx={{ maxHeight: "60vh" }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" width={"130px"}>
                        <Typography fontWeight={"bold"}>Course Unit</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight={"bold"}>Subjet Name</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight={"bold"}>Grade</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {results.map((result, index) => (
                      <>
                        {level === "" && (
                          <>
                            {semester === "" && (
                              <TableRow key={index}>
                                <TableCell align="left">
                                  {result.courseUnitCode}
                                </TableCell>
                                <TableCell align="left">
                                  {result.courseUnitName}
                                </TableCell>
                                <TableCell align="center">
                                  {result.courseUnitGrade}
                                </TableCell>
                              </TableRow>
                            )}
                            {semester === result.courseUnitCode.charAt(4) && (
                              <TableRow key={index}>
                                <TableCell align="left">
                                  {result.courseUnitCode}
                                </TableCell>
                                <TableCell align="left">
                                  {result.courseUnitName}
                                </TableCell>
                                <TableCell align="center">
                                  {result.courseUnitGrade}
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        )}
                        {level === result.courseUnitCode.charAt(3) && (
                          <>
                            {semester === "" && (
                              <TableRow key={index}>
                                <TableCell align="left">
                                  {result.courseUnitCode}
                                </TableCell>
                                <TableCell align="left">
                                  {result.courseUnitName}
                                </TableCell>
                                <TableCell align="center">
                                  {result.courseUnitGrade}
                                </TableCell>
                              </TableRow>
                            )}
                            {semester === result.courseUnitCode.charAt(4) && (
                              <TableRow key={index}>
                                <TableCell align="left">
                                  {result.courseUnitCode}
                                </TableCell>
                                <TableCell align="left">
                                  {result.courseUnitName}
                                </TableCell>
                                <TableCell align="center">
                                  {result.courseUnitGrade}
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        </Tile>
      </Stack>
      {openBackdrop && <CustomBackdrop />}
    </Box>
  );
};
