import { Stack } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Tile } from "../../../card/Tile";

export const ViewCompanySupervisor = () => {
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
                            <TableRow key={i}>
                                <TableCell >   {r.id}  </TableCell>
                                <TableCell >   {r.title}  </TableCell>
                                <TableCell >   {r.description} </TableCell>
                            </TableRow> //id,title,description need to change as json file
                        )}

                    </TableBody>
                </Table>

            </Stack>
        </Tile>
    )
} 