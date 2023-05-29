import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tile } from "../../../components/card/Tile";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { CustomBackdrop } from "../../../components/backdrop/CustomBackdrop";

const data = [
  { id: 1, company: "A" },
  { id: 2, company: "B" },
  { id: 3, company: "C" },
];

const SupervisorList = () => {
  //State for selected company
  const [selectedCompany, setSelectedCompany] = useState({
    id: "",
    name: "",
  });

  //state for the company list
  const [companyList, setCompanyList] = useState([]);

  //state for the supervisor list
  const [supervisorList, setSupervisorList] = useState([]);

  //State for Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //state for errors
  const [errorDetails, setErrorDetails] = useState("");
  //End of state

  const NoRowsOverlay = () => {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Typography variant="body2">{errorDetails}</Typography>
      </Stack>
    );
  };
  //end of test

  //Fetch company list
  const getCompanyDetails = async () => {
    setOpenBackdrop(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/company/intern-process/company-list",
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log(res.data.data);
        res.data && setCompanyList(res.data.data);
        setSupervisorList(res.data.data.supervisors);
      } else {
        setErrorDetails(res.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorDetails(error.message);
      console.log(typeof errorDetails);
    }
    setOpenBackdrop(false);
  };

  useEffect(() => {
    getCompanyDetails();
    // console.log(companyList);
  }, []);
  //End of fetch company list

  //Fetch supervisor List
  const getSupervisorDetails = async () => {
    setOpenBackdrop(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/admin/users/supervisor",
        { withCredentials: true }
      );
      if (res.status == 200) {
        console.log(res.data.users);
        let rawSupervisorList = res.data.users;
        setSupervisorList(
          rawSupervisorList.filter(
            (item) => item.company === selectedCompany.id
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };

  useEffect(() => {
    getSupervisorDetails();
  }, [selectedCompany]);
  //End of Fetch supervisor list

  //Handle cellClick function
  const handleCellClick = (company, key) => {
    console.log(`Cell clicked: ${key}`);
    setSelectedCompany({ id: key, name: company });
    // console.log(selectedCompany);
  };
  //End of handle cellClick function

  //column list company
  const companyColumn = [
    {
      field: "name",
      headerName: "Company Name ",
      flex: 1,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="itms"
          size="itms-x-small"
          onClick={() => handleCellClick(params.row.name, params.row._id)}
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
      flex: 1,
      editable: false,
    },
    {
      field: "jobRole",
      headerName: "Position",
      flex: 1,
      editable: false,
    },
    {
      field: "contactNo",
      headerName: "Contact Number",
      flex: 1,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1,
      editable: false,
    },
  ];
  //End of column list supervisors

  return (
    <Box sx={{ height: "88vh" }}>
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
                    rows={companyList}
                    columns={companyColumn}
                    hideFooter={true}
                    disableColumnMenu={true}
                    autoHeight={true}
                    getRowId={(row) => row._id}
                    slots={{
                      noRowsOverlay: NoRowsOverlay,
                    }}
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
                {selectedCompany.name !== "" && (
                  <Stack direction={"column"} spacing={2}>
                    <Box>
                      <Typography>
                        Supervisors assigned to : {selectedCompany.name}
                      </Typography>
                    </Box>
                    <Box>
                      <DataGrid
                        rows={supervisorList}
                        columns={supervisorColumn}
                        hideFooter={true}
                        disableColumnMenu={true}
                        autoHeight={true}
                        getRowId={(row) => row._id}
                      />
                    </Box>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Tile>
        </Stack>
      </Box>
      {openBackdrop && <CustomBackdrop />}
    </Box>
  );
};

export default SupervisorList;
