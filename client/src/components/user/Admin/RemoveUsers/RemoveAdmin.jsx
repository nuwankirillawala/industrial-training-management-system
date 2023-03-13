import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tile } from "../../../card/Tile";
import { DataGrid } from "@mui/x-data-grid";
import { Layout } from "../../../Layout/Layout";
import { Button } from "@mui/material";

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
        <Layout>
            <Tile height="83vh" width="77vw" >

                <DataGrid
                    columns={columns}
                    rows={products}
                    checkboxSelection
                />
                <Button variant="itms" display="flex-end">Remove</Button>
                {/* onClick =remove users function */}

            </Tile >
        </Layout>
    );
}

