import React, { useState, useEffect } from "react";
import { Tile } from "../../components/card/Tile";
import { Grid, Box, Typography, Stack, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { StudentAddCompany } from "../../components/user/Undergraduate/StudentAddCompany";
import { StudentCompanyChoice } from "../../components/user/Undergraduate/StudentCompanyChoice";
import { StudentCompanyStatus } from "../../components/user/Undergraduate/StudentCompanyStatus";
import { StudentInternPeriod } from "../../components/user/Undergraduate/StudentInternPeriod";
import { StudentPrivateCompanyStatus } from "../../components/user/Undergraduate/StudentPrivateCompanyStatus";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const StudentcompanyState = {
  companyName: "",
  status: "",
};

const companyDataColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 100,
    editable: false,
  },
  {
    field: "internSeats",
    headerName: "InternSeats",
    width: 120,
    editable: false,
  },
];

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Box>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

export const StudentCompany = () => {
  const [companyState, setCompanyState] = useState(StudentcompanyState);
  const [page, setPage] = useState({ no: 1 });
  const [companyList, setCompanyList] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //fetch data
  const getCompanyList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/company/intern-process/company-list",
        { withCredentials: true }
      );
      if (res.data.status === "success") {
        // console.log(res.data.data);
        setCompanyList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyList();
  }, []);
  //End of fetch data

  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Typography variant="pageTitle">Company Choice</Typography>
      </Grid>

      <Grid item md={12}>
        <Box maxHeight="81vh">
          <Grid container spacing={1}>
            <Grid item md={7}>
              <Tile>
                <Box sx={{ width: "100%", height: "74vh" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange}>
                      <Tab label="Company Choice" />
                      <Tab label="Intern Status" />
                      <Tab label="Intern Period" />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <StudentCompanyChoice />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <StudentCompanyStatus
                      companyState={companyState}
                      setCompanyState={setCompanyState}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {page.no === 2 && (
                      <StudentAddCompany pageNo={page} setPage={setPage} />
                    )}
                    {page.no === 1 && (
                      <StudentInternPeriod pageNo={page} setPage={setPage} />
                    )}
                  </TabPanel>
                </Box>
              </Tile>
            </Grid>

            <Grid item md={5}>
              <Tile height={"79vh"}>
                <Stack maxHeight={"78vh"} padding={2} spacing={1}>
                  <Typography variant="h6" fontWeight={"bold"}>
                    Company Ranking List
                  </Typography>
                  <Divider />
                  <DataGrid
                    rows={companyList.map((company, index) => {
                      return {
                        name: company.name,
                        rating: company.rating,
                        internSeats: company.internSeats,
                        email: company.email,
                      };
                    })}
                    columns={companyDataColumns}
                    autoHeight={true}
                    getRowId={(rows) => rows.email}
                  />
                </Stack>
              </Tile>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
