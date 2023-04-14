import React from "react"
import { UpdateCompanyForm } from "../../components/user/Admin/Forms/UpdateCompanyForm";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid } from "@mui/material";
import { Tile } from "../../components/card/Tile";
import Dialogbox from "../../components/Dialogbox/Dialogbox";
import { RemoveUserForm } from "../../components/user/Admin/Forms/RemoveUserForm";


export const ManageCompany = () => {

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
        <Grid>
            <Grid item sm={12} md={12}>
                <Typography variant="h6" color="primary" marginBottom={'5px'} paddingLeft={'15px'}>Manage Company</Typography>
            </Grid>
            <Grid item sm={12} md={12}>
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
                                        <TableCell> <Dialogbox title="Update Company" btn_name="update"><UpdateCompanyForm /></Dialogbox></TableCell>
                                        <TableCell> <Dialogbox title="Remove Company" btn_name="remove"><RemoveUserForm /></Dialogbox></TableCell>
                                    </TableRow> //id,title,description need to change as json file
                                )}

                            </TableBody>
                        </Table>

                    </Stack>
                </Tile>
            </Grid>
        </Grid>

    )
}  