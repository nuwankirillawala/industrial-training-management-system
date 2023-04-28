import React from "react"
import { UpdateDepartmentCoordinator } from "../Forms/UpdateDepartmentCoordinator";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Tile } from "../../../card/Tile";
import Dialogbox from "../../../Dialogbox/Dialogbox";
import { RemoveUserForm } from "../Forms/RemoveUserForm";



export const UpdateNRemoveDepartmentCoordinator = () => {

    const [Column, setColumn] = useState([])
    const [Records, setRecords] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products')  //url need to changed into json url(this is dummy data from a site)
            .then(result => result.json())
            .then(data => {
                setColumn(Object.keys(data.products[0])) //products(word) need to changed according json 
                setRecords(data.products)
            })
    }, [])


    return (
        <>
            <Typography variant="subtitle1">Update or Remove Administrator</Typography>

            <Tile>
                <Stack>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {Column.map((c, i) =>
                                    <TableCell key={i}>
                                        {c}
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {Records.map((r, i) =>
                                <TableRow key={i} >
                                    <TableCell >   {r.id}  </TableCell>
                                    <TableCell >   {r.title}  </TableCell>
                                    <TableCell >   {r.description} </TableCell>
                                    <TableCell> <Dialogbox title="Update Department Coordinator" btn_name="update"><UpdateDepartmentCoordinator /></Dialogbox></TableCell>
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