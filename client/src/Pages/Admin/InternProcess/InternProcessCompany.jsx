import { Fragment, useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { Button, Grid, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, Typography, Alert, AlertTitle, Card, Box, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import * as assets from '../../../assets'
import CompanyCard from "../../../components/InternProcess/CompanyCard";
import { useParams } from "react-router-dom";
import { red } from "@mui/material/colors";

const InternProcessCompany = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [company, setCompany] = useState({})
  const [dialogOpen, setDialogOpen] = useState(false);
  const { companyId } = useParams();

  const { data } = useFetch('POST', 'http://localhost:5000/api/v1/company/intern-process-company', { companyId: companyId })

  const theme = useTheme();

  useEffect(() => {
    if (data && data.users) {
      setStudents(data.users);
    }

    if (data && data.company) {
      setCompany(data.company);
    }
  }, [data]);
  console.log(students);

  const handleAddStudent = (student) => {
    if (selectedStudents.length < 10) {
      setSelectedStudents([...selectedStudents, student]);
      setStudents(students.filter(s => s._id !== student._id));
    }
    else {
      setAlertOpen(true);
    }
  };

  const handleRemoveStudent = (student) => {
    setStudents([...students, student]);
    setSelectedStudents(selectedStudents.filter(s => s._id !== student._id));
  };

  const handleSave = () => {
    setDialogOpen(true);
    // const { data } = useFetch('POST', 'http://localhost:5000/api/v1/company/intern-process-save-company-list', { list: selectedStudents });
    if (true) {
      setDialogOpen(true);
    }
  }

  const handleDialogClose = () => {
    ;
  }

  const StyledTableCell = styled(TableCell)(() => {
    // const theme = useTheme();
    return {
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.blueColor.main,
        color: '#fff',
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }
  });

  const StyledTableRow = styled(TableRow)(() => {
    const theme = useTheme();
    return {
      cursor: 'pointer',
      '&:hover': {
        // backgroundColor: theme.palette.blueColor.light,
        backgroundColor: theme.palette.gray.light,

      },
    };
  });

  const demo = {
    name: 'Creative Software',
    image: assets.Creative
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item xs={12}>
        <Tile>
          <Grid container direction='row'>
            <Grid item xs={8}>
              <Typography variant="head1" sx={{ marginBottom: 1 }}>Intern Selection For Company</Typography>
              <Typography variant="h6" color="secondary">Instructions</Typography>
              <Tile padding='10px'>
                <Typography variant="body1" color="secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, illum?</Typography>
                <Typography variant="body1" color="secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, illum?</Typography>
              </Tile>
            </Grid>

            <Grid item xs={4}>
              <CompanyCard company={company} />
            </Grid>

          </Grid>
        </Tile>
      </Grid>

      <Grid item>
        <Grid container spacing={1}>

          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"List Saved!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                List Saved Successfully. <br />
                Company Name: 
                Saved candidates: 
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Back to Company Page</Button>
              <Button onClick={() => setDialogOpen(false)} autoFocus type="close">Close</Button>
            </DialogActions>
          </Dialog>

          <Grid item xs={6}>
            <Tile>
              <Typography variant="h5" color="">Undergraduate List</Typography><br />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="left">Registration No.</StyledTableCell>
                      <StyledTableCell align="left">GPA</StyledTableCell>
                      <StyledTableCell align="left">Weighted GPA</StyledTableCell>
                      <StyledTableCell align="left">Choice</StyledTableCell>
                      <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students && students.map((user, index) => (
                      <StyledTableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="left">{user.regNo}</TableCell>
                        <TableCell align="left">{user.gpa}</TableCell>
                        <TableCell align="left">{user.weightedGPA}</TableCell>
                        <TableCell align="left">{user.order}</TableCell>
                        <TableCell align="left"><Button onClick={() => handleAddStudent(user)}>Add</Button></TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Tile>
          </Grid>

          <Grid item xs={6}>
            <Tile>
              <Typography variant="h5" color="">Selected Intern List</Typography><br />
              {alertOpen && <Fragment>
                <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle>
                  Company Intern List is Full — <strong>save list or !</strong>
                </Alert>
                <br />
              </Fragment>}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="left">Registration No.</StyledTableCell>
                      <StyledTableCell align="left">GPA</StyledTableCell>
                      <StyledTableCell align="left">Weighted GPA</StyledTableCell>
                      <StyledTableCell align="left">Choice</StyledTableCell>
                      <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedStudents && selectedStudents.map((user, index) => (
                      <StyledTableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="left">{user.regNo}</TableCell>
                        <TableCell align="left">{user.gpa}</TableCell>
                        <TableCell align="left">{user.weightedGPA}</TableCell>
                        <TableCell align="left">{user.order}</TableCell>
                        <TableCell align="left"><Button color='error' onClick={() => handleRemoveStudent(user)}>Remove</Button></TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              <Button variant="contained" size="large" onClick={handleSave}>Save List</Button>
            </Tile>
          </Grid>
        </Grid>
      </Grid>




    </Grid>
  )
}

export default InternProcessCompany