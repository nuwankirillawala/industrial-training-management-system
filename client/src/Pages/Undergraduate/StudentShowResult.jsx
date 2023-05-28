import { useState } from "react";
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

function resultsData(courseUnitCode, courseUnitName, courseUnitGrade) {
  return {
    courseUnitCode,
    courseUnitName,
    courseUnitGrade,
  };
}

const results = [
  resultsData("AMT112β", "Mathematical Foundations of Computer Science", "A"),
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

const tableHeight = 480;

export const StudentShowResult = () => {
  const [level, setLevels] = useState("");
  const [semester, setSemesters] = useState("");
  const [unitcode, setUnitCode] = useState("");

  return (
    <Box>
      <Stack direction={"column"} spacing={1}>
        <Box>
          <Typography variant="pageTitle">View Results</Typography>
        </Box>
        <Tile>
          <Stack direction={"column"} spacing={2} height={"82vh"}>
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
                <Select variant="outlined" size="small" fullWidth>
                  <MenuItem
                    onClick={() => {
                      setLevels("1");
                      console.log(level);
                    }}
                  >
                    Level 1
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setLevels("2");
                      console.log(level);
                    }}
                  >
                    Level 2
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setLevels("3");
                      console.log(typeof level);
                    }}
                  >
                    Level 3
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setLevels("");
                      console.log(level);
                    }}
                  >
                    All
                  </MenuItem>
                </Select>
              </Stack>
              <Stack direction={"row"} spacing={2} flex={3}>
                <Typography variant="body" fontWeight={"bold"}>
                  Semester
                </Typography>
                <Select variant="outlined" size="small" fullWidth>
                  <MenuItem onClick={() => setSemesters("1")}>
                    Semester 1
                  </MenuItem>
                  <MenuItem onClick={() => setSemesters("2")}>
                    Semester 2
                  </MenuItem>
                  <MenuItem onClick={() => setSemesters("")}>All</MenuItem>
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
    </Box>
  );
};
