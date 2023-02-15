import React from "react";
import { Box } from "@mui/system";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar"

export default function Layout({ children }) {
    return (
        <Box>
            {/* Navbar*/}
            <Navbar />
            {/* Slidebar */}
            <Sidebar />
        </Box>
    )
}