import React, { useState, useEffect } from "react";
import { Tile } from "../../components/card/Tile";
import { Grid, Box, Typography, Stack, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { StudentCompanyChoice } from "../../components/user/Undergraduate/StudentCompanyChoice";
import axios from "axios";

const StudentcompanyState = {
  companyName: "",
  status: "",
};

const companyDataColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 2,
    editable: false,
  },
  {
    field: "rating",
    headerName: "Rating",
    flex: 1,
    editable: false,
  },
  {
    field: "internSeats",
    headerName: "InternSeats",
    flex: 2,
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
        "http://localhost:5000/api/v1/company/intern-process/company-list"
      );
      // console.log(res.status);
      if (res.status === 200) {
        // console.log(res.data.data);
        setCompanyList(res.data);
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
        <Typography variant="pageTitle">Company Selection</Typography>
      </Grid>

      <Grid item md={12}>
        <Box maxHeight="81vh">
          <Grid container spacing={1}>
            <Grid item md={7}>
              <Tile>
                <Box sx={{ width: "100%", height: "79vh" }}>
                  <StudentCompanyChoice />
                </Box>
              </Tile>
            </Grid>

            <Grid item md={5}>
              <Tile>
                <Stack height={"78vh"} padding={2} spacing={2}>
                  <Stack>
                    <Typography variant="head3">
                      Company Ranking List
                    </Typography>
                  </Stack>
                  <Divider />

                  <Stack>
                    <Box
                      sx={{
                        height: "61vh",
                        width: "100%",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <DataGrid
                        rows={companyList.map((company, index) => {
                          return {
                            name: company.name,
                            rating: company.rating,
                            internSeats: company.internSeats,
                            email: company.email,
                          };
                        })}
                        // rows
                        columns={companyDataColumns}
                        getRowId={(rows) => rows.email}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        hideFooter={true}
                        style={{ cursor: "pointer" }}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </Tile>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
