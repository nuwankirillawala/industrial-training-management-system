import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tile } from "../../../components/card/Tile";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const data = [
  { id: 1, company: "A" },
  { id: 2, company: "B" },
  { id: 3, company: "C" },
];

const SupervisorList = () => {
  //state for the company list
  const [companyList, setCompanyList] = useState([]);
  //end of state for the company list

  //Fetch company list
  useEffect(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/admin/view-all-users/supervisor"
      );
      if (res.status === 404) console.log(res.message);
      if (res.status === 200) setCompanyList(JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);
  //End of fetch company list

  //Handle cellClick function
  const handleCellClick = (key) => {
    console.log(`Cell clicked: ${key}`);
    setSelectedCompany(data.find((element) => element.id === key)?.company);
    console.log(selectedCompany);
  };
  //End of handle cellClick function

  //column list company
  const companyColumn = [
    {
      field: "name",
      headerName: "Company Name ",
      width: 120,
      // width: "auto",
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      // width: "auto",
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
  //End of column list company

  //column list supervisors
  const supervisorColumn = [
    {
      field: "name",
      headerName: "Name",
      width: "120",
      editable: false,
    },
    {
      field: "jobRole",
      headerName: "Position",
      width: "120",
      editable: false,
    },
    {
      field: "contactNo",
      headerName: "Contact Number",
      width: "120",
      editable: false,
    },
    {
      field: "Email",
      headerName: "Email Address",
      width: "120",
      editable: false,
    },
  ];
  //End of column list supervisors

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
          View Supervisors
        </Typography>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Stack direction={"row"} spacing={1} height={"100%"} width={"100%"}>
          <Tile sx={{ height: "100%", width: "50%" }}>
            <Box height={"100%"}>
              <Stack direction={"column"} height={"100%"} spacing={1}>
                <Box>
                  <Typography align="center" fontWeight={"bold"}>
                    Company Selection
                  </Typography>
                </Box>
                <Box width={"auto"}>
                  <DataGrid
                    rows={data}
                    columns={companyColumn}
                    hideFooter={true}
                    disableColumnMenu={true}
                    autoHeight={true}
                  />
                </Box>
              </Stack>
            </Box>
          </Tile>
          <Tile sx={{ height: "100%", width: "50%" }}>
            <Box>
              <Stack direction={"column"} spacing={1}>
                <Box>
                  <Typography align="center" fontWeight={"bold"}>
                    Supervisor List
                  </Typography>
                </Box>
                {selectedCompany !== "" && (
                  <Stack direction={"column"} spacing={2}>
                    <Box>
                      <Typography>
                        Supervisors assigned to : {selectedCompany}
                      </Typography>
                    </Box>
                    <Box>
                      <DataGrid
                        rows={data}
                        columns={supervisorColumn}
                        hideFooter={true}
                        disableColumnMenu={true}
                        autoHeight={true}
                        wi
                      />
                    </Box>
                  </Stack>
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
