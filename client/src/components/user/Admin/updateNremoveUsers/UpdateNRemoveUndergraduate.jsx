import React from "react"
import { UpdateAdminForm } from "../Forms/UpdateAdminForm";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Tile } from "../../../card/Tile";
import Dialogbox from "../../../Dialogbox/Dialogbox";
import { RemoveUserForm } from "../Forms/RemoveUserForm";
import { UpdateUndergraduateForm } from "../Forms/UpdateUndergraduateForm";
import axios from "axios";



export const UpdateNRemoveUndergraduate = () => {
    const [Records, setRecords] = useState([])

    const getUndergraduateData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/admin/view-all-users/undergraduate');
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
        getUndergraduateData();
    }, [])


    const Column = [
        { columnName: 'Registration No' },
        { columnName: 'Name' },
        { columnName: '  Email' },
        { columnName: ' GPA' },
        { columnName: ' Weighted GPA' },
        // { columnName: ' Linkedin URL' },
        // { columnName: ' Intern Status' },
        // { columnName: ' Supervisor' }
    ]


    return (
        <>
            <Typography variant="PageTitle">Update or Remove Undergraduate</Typography>
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
                                    <TableCell >   {r.regNo}  </TableCell>
                                    <TableCell >   {r.name}  </TableCell>
                                    <TableCell >   {r.email} </TableCell>
                                    <TableCell >   {r.gpa}  </TableCell>
                                    <TableCell >   {r.weightedGPA}  </TableCell>
                                    {/*  <TableCell >   {r.linkdinURL} </TableCell>
                                    <TableCell >   {r.internStatus}   </TableCell>
                                    <TableCell >   {r.supervisor}  </TableCell> */}
                                    <TableCell> <Dialogbox title="Update Undergraduate" btn_name="update"><UpdateUndergraduateForm /></Dialogbox></TableCell>
                                    <TableCell> <Dialogbox title="Remove Undergraduate" btn_name="remove"><RemoveUserForm /></Dialogbox></TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>

                </Stack>
            </Tile>
        </>
    )
}  