import React from "react"
import { UpdateAlumniForm } from "../Forms/UpdateAlumniForm";
import { RemoveUserForm } from "../Forms/RemoveUserForm";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Tile } from "../../../card/Tile";
import Dialogbox from "../../../Dialogbox/Dialogbox";


export const UpdateNRemoveAlumni = () => {

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
            <Typography variant="subtitle1">Update or Remove Alumni</Typography>
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
                                    <TableCell> <Dialogbox title="Update Alumni user" btn_name="update"><UpdateAlumniForm /></Dialogbox></TableCell>
                                    <TableCell ><Dialogbox title="Remove Alumni user" btn_name="remove"><RemoveUserForm /></Dialogbox>

                                    </TableCell>
                                </TableRow> //id,title,description need to change as json file
                            )}

                        </TableBody>
                    </Table>

                </Stack>
            </Tile>
        </>

    )
}