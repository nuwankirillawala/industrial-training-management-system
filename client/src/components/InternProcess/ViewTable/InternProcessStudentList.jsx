import React from 'react'

const InternProcessStudentList = ({users, btnType}) => {
  return (
    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Registration No.</StyledTableCell>
                <StyledTableCell align="right">GPA</StyledTableCell>
                <StyledTableCell align="right">Weighted GPA</StyledTableCell>
                <StyledTableCell align="right">Selection Order</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
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
                  <TableCell align="right">{user.order}</TableCell>
                  {/* <TableCell align="right"><Button onClick={() => {btnType === 'add' ? handleAddStudent(student) : handleAddStudent(student) }}>{button}</Button></TableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default InternProcessStudentList