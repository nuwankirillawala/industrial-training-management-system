// import React from "react"
// import { UpdateAlumniForm } from "../Forms/UpdateAlumniForm";
// import { RemoveUserForm } from "../Forms/RemoveUserForm";
// import { Stack } from "@mui/system";
// import { useState, useEffect } from "react";
// import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
// import { Tile } from "../../../card/Tile";
// import Dialogbox from "../../../Dialogbox/Dialogbox";
// import axios from "axios";

// export const UpdateNRemoveAlumni = () => {
//     const [Records, setRecords] = useState([])

//     const getAlumniData = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/api/v1/admin/users/alumni', { withCredentials: true });
//             console.log(res);
//             if (res.status === 200) {
//                 console.log(res.data.users);
//                 setRecords(res.data.users)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         getAlumniData();
//     }, [])


//     const Column = [
//         { columnName: 'Registration No' },
//         { columnName: 'Alumni Name' },
//         { columnName: 'E-mail' },
//         { columnName: 'Graduated Year' },
//         { columnName: 'Contact No' }
//     ]


//     return (
//         <>
//             <Typography variant="pageTitle">Update or Remove Alumni</Typography>
//             <Typography>Refresh browser for get recently updated data </Typography>
//             <Tile>
//                 <Stack>
//                     <Table sx={{ border: '1px solid #4665D2' }}>
//                         <TableHead>
//                             <TableRow>
//                                 {Column.map((c, i) =>
//                                     <TableCell key={i}>
//                                         <Typography fontWeight={'bold'}>{c.columnName}</Typography>
//                                     </TableCell>
//                                 )}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>

//                             {Records.map((r, i) =>
//                                 <TableRow key={i} >
//                                     <TableCell >   {r.regNo}  </TableCell>
//                                     <TableCell >   {r.name}  </TableCell>
//                                     <TableCell >   {r.email} </TableCell>
//                                     <TableCell >   {r.graduatedYear} </TableCell>
//                                     <TableCell >   {r.contactNo} </TableCell>
//                                     <TableCell> <Dialogbox title="Update Alumni user" btn_name="update"><UpdateAlumniForm userId={r._id} /></Dialogbox></TableCell>
//                                     <TableCell ><Dialogbox title="Remove Alumni user" btn_name="remove"><RemoveUserForm /></Dialogbox>

//                                     </TableCell>
//                                 </TableRow> //id,title,description need to change as json file
//                             )}

//                         </TableBody>
//                     </Table>

//                 </Stack>
//             </Tile>
//         </>

//     )
// }