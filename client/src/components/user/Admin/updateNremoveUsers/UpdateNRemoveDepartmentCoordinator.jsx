import React from "react"
import { UpdateDepartmentCoordinator } from "../Forms/UpdateDepartmentCoordinator";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Tile } from "../../../card/Tile";
import Dialogbox from "../../../Dialogbox/Dialogbox";
import { RemoveUserForm } from "../Forms/RemoveUserForm";
import axios from "axios";


export const UpdateNRemoveDepartmentCoordinator = () => {
    const [Records, setRecords] = useState([])

    const getCoordinatornData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/admin/users/admin', { withCredentials: true });
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.users);
                const filteredRecords = res.data.users.filter(record => record.role === 'department-coordinator');
                setRecords(filteredRecords);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCoordinatornData();
    }, [])

    const Column = [
        { columnName: 'Admin Name' },
        { columnName: ' Email' },
        { columnName: ' Contact No' },
        { columnName: ' Staff ID' }
    ]


    return (
        <>
            <Typography variant="PageTitle">Update or Remove Department coordinator</Typography>

            <Tile>
                <Stack>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {Column.map((c, i) =>
                                    <TableCell key={i}>
                                        <Typography fontWeight={'bold'}> {c.columnName}</Typography>
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {Records.map((r, i) =>
                                <TableRow key={i} >
                                    <TableCell >   {r.name}  </TableCell>
                                    <TableCell >   {r.email}  </TableCell>
                                    <TableCell >   {r.contactNo}  </TableCell>
                                    <TableCell >   {r.staffId} </TableCell>
                                    <TableCell> <Dialogbox title="Update Department Coordinator" btn_name="update"><UpdateDepartmentCoordinator userId={r._id} /></Dialogbox></TableCell>
                                    <TableCell> <Dialogbox title="Remove Department Coordinator" btn_name="remove"><RemoveUserForm /></Dialogbox></TableCell>
                                </TableRow> //id,title,description need to change as json file
                            )}

                        </TableBody>
                    </Table>

                </Stack>
            </Tile>
        </>
    )
}  