import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tile } from "../../../card/Tile";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";


export const RemoveAdmin = () => {
    const [products, setProducts] = useState([]);
    //const [columns, setColumns] = useState([]);

    useEffect(() => {
        axios.get("https://dummyjson.com/products")
            .then((response) => {
                setProducts(response.data.products);
                // setColumns(data.products[0]);

            });
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "price", headerName: "Price", width: 150 },
        { field: "description", headerName: "Description", width: 400 },
    ];

    return (
        <>
            <Tile height="88vh" width="86vw" sx={{ overflow: 'hidden' }}>
                <DataGrid
                    columns={columns}
                    rows={products}
                    checkboxSelection
                    sx={{ height: "80vh" }}
                /> <Button variant="itms" display="flex-end" >Remove</Button>
                {/* onClick =remove users function */}
            </Tile >
        </>
    );
}

