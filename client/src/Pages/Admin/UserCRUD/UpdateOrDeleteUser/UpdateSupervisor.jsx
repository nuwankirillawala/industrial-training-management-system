import { UpdateCompanySupervisorForm } from "../../../../components/user/Admin/Forms/UpdateCompanySupervisorForm";
import { RemoveUserForm } from "../../../../components/user/Admin/Forms/RemoveUserForm";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Tile } from "../../../../components/card/Tile";
import Dialogbox from "../../../../components/Dialogbox/Dialogbox";
import axios from "axios";


const UpdateSupervisor = () => {
  const [Records, setRecords] = useState([])

  const getSupervisorData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/admin/users/supervisor', { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.users);
        setRecords(res.data.users)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSupervisorData();
  }, [])

  const Column = [
    { columnName: 'Supervisor Name' },
    { columnName: '  Email' },
    { columnName: '  Job Role' }
  ]

  return (
    <>
      <Typography variant="pageTitle">Update or Remove Company Supervisor</Typography>
      <Tile>
        <Stack>
          <Table sx={{ border: '1px solid #4665D2' }}>
            <TableHead>
              <TableRow>
                {Column.map((c, i) =>
                  <TableCell key={i}>
                    <Typography fontWeight={'bold'}>{c.columnName}</Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>

              {Records.map((r, i) =>
                <TableRow key={i} >
                  <TableCell >   {r.name}  </TableCell>
                  <TableCell >   {r.email}  </TableCell>
                  <TableCell >   {r.jobRole} </TableCell>
                  <TableCell> <Dialogbox title="Update Company supervisor" btn_name="update"><UpdateCompanySupervisorForm userId={r._id} /></Dialogbox></TableCell>
                  <TableCell ><Dialogbox title="Remove Company supervisor" btn_name="remove"><RemoveUserForm userId={r._id} userRole={r.role} /></Dialogbox>

                  </TableCell>
                </TableRow> //id,title,description need to change as json file
              )}

            </TableBody>
          </Table>

        </Stack>
      </Tile >
    </>
  )
}
export default UpdateSupervisor