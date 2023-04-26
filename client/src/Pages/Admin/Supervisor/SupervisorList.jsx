import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Tile } from "../../../components/card/Tile";
import { DataGrid } from "@mui/x-data-grid";

const data = [
  { id: 1, company: "A" },
  { id: 2, company: "B" },
  { id: 3, company: "C" },
];

const SupervisorList = () => {
  //Handle cellClick function
  const handleCellClick = (key) => {
    console.log(`Cell clicked: ${key}`);
    setSelectedCompany(data.find((element) => element.id === key)?.company);
    console.log(selectedCompany);
  };
  //End of handle cellClick function

  //column list
  const column = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      editable: false,
    },
    {
      field: "company",
      headerName: "Company Name ",
      width: 120,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="itms"
          size="itms-small"
          onClick={() => handleCellClick(params.row.id)}
        >
          select
        </Button>
      ),
    },
  ];
  //End of column list

  //State for selected company
  const [selectedCompany, setSelectedCompany] = useState("");
  //End of state for selected company

  return (
    <Box sx={{ height: "88vh", width: "83vw" }}>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          color="primary"
          marginBottom={"5px"}
          paddingLeft={"15px"}
        >
          Add Supervisors
        </Typography>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Stack direction={"row"} spacing={1} height={"100%"} width={"100%"}>
          <Tile sx={{ height: "100%", width: "30%" }}>
            <Box height={"100%"}>
              <Stack direction={"column"} height={"100%"} spacing={1}>
                <Box>
                  <Typography align="center" fontWeight={"bold"}>
                    Company Selection
                  </Typography>
                </Box>
                <Box width={340}>
                  <DataGrid
                    rows={data}
                    columns={column}
                    hideFooter={true}
                    disableColumnMenu={true}
                    autoHeight={true}
                  />
                </Box>
              </Stack>
            </Box>
          </Tile>
          <Tile sx={{ height: "100%", width: "70%" }}>
            <Box>
              <Stack direction={"column"} spacing={1}>
                <Box>
                  <Typography align="center" fontWeight={"bold"}>
                    Add Supervisors
                  </Typography>
                </Box>
                {selectedCompany !== "" && (
                  <Box>
                    <Typography>
                      Add Supervisors to the company : {selectedCompany}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
          </Tile>
        </Stack>
      </Box>
    </Box>
  );
};

export default SupervisorList;
