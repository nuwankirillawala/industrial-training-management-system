import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, Typography } from "@mui/material";
import useFetch from "../../../Hooks/useFetch";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const StyledTableCell = styled(TableCell)(() => {
  const theme = useTheme();
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

const ViewInternList = () => {

  const { data } = useFetch('GET', 'http://localhost:5000/api/v1/undergraduate/view-intern-list', null);
  console.log(data.users);
  const users = data.users;
  // light blue 6EA8FF med-blue 6382D9 blue-purple 675FD6 green 65D246 red D24665

  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant="h6" color="initial">Intern Candidate List</Typography>
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Registration No.</StyledTableCell>
                <StyledTableCell align="right">GPA</StyledTableCell>
                <StyledTableCell align="right">Weighted GPA</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.map((user) => (
                <StyledTableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{user.name}</TableCell>
                  <TableCell align="right">{user.regNo}</TableCell>
                  <TableCell align="right">{user.gpa}</TableCell>
                  <TableCell align="right">{user.weightedGPA}</TableCell>
                  {/* <TableCell align="right">{row.protein}</TableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default ViewInternList