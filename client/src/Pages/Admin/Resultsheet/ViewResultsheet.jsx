import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tile } from "../../../components/card/Tile";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const jsonData = [
  {
    id: "SC/2019/11120",
    name: "gavesh madushan",
    CSC1113: "A",
    CSC1122: "a",
    CSC113a: "a",
    CSC1142: "s",
    CSC1153: "a",
    MAT112d: "a",
    MAT113d: "b",
    AMT112ß: "s",
    CSC1213: "s",
    CSC1223: "s",
    CSC1233: "d",
    CSC1242: "d",
    CSC1251: "d",
    MAT121ß: "f",
    MAT122ß: "f",
    EN1201: "f",
    CSC2113: "f",
    CSC2123: "r",
    CSC2133: "g",
    CSC2143: "f",
    MAT211ß: "g",
    AMT212ß: "r",
    PHY2112: "t",
  },

  {
    id: "SC/2019/11121",
    name: "madushan gavesh",
    CSC1113: "A",
    CSC1122: "a",
    CSC113a: "a",
    CSC1142: "s",
    CSC1153: "a",
    MAT112d: "a",
    MAT113d: "b",
    AMT112ß: "s",
    CSC1213: "s",
    CSC1223: "s",
    CSC1233: "d",
    CSC1242: "d",
    CSC1251: "d",
    MAT121ß: "f",
    MAT122ß: "f",
    EN1201: "f",
    CSC2113: "f",
    CSC2123: "r",
    CSC2133: "g",
    CSC2143: "f",
    MAT211ß: "g",
    AMT212ß: "r",
    PHY2112: "t",
  },

  {
    id: "SC/2019/11122",
    name: "G.M.Sooriyaarachchi",
    CSC1113: "A",
    CSC1122: "a",
    CSC113a: "a",
    CSC1142: "s",
    CSC1153: "a",
    MAT112d: "a",
    MAT113d: "b",
    AMT112ß: "s",
    CSC1213: "s",
    CSC1223: "s",
    CSC1233: "d",
    CSC1242: "d",
    CSC1251: "d",
    MAT121ß: "f",
    MAT122ß: "f",
    EN1201: "f",
    CSC2113: "f",
    CSC2123: "r",
    CSC2133: "g",
    CSC2143: "f",
    MAT211ß: "g",
    AMT212ß: "r",
    PHY2112: "t",
  },
];

const ViewResultsheet = () => {
  //State for the results
  const [results, setResults] = useState([]);
  //End of states
  const navigate = useNavigate();

  //Fetching data from backend
  const getResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/result/all", {
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log(res.data);
        setResults(res.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);
  //End of fetching data from backend

  //columns for the data grid
  const studentColumns = [
    {
      field: "name",
      headerName: "Full Name",
      editable: false,
    },
    {
      field: "regNo",
      headerName: "Student ID",
      editable: false,
    },
    {
      field: "CSC1113",
      headerName: "CSC1113 ",
      editable: false,
    },
    {
      field: "CSC1122",
      headerName: "CSC1122 ",
      editable: false,
    },
    {
      field: "CSC113a",
      headerName: "CSC113a ",
      editable: false,
    },
    {
      field: "CSC1153",
      headerName: "CSC1153 ",
      editable: false,
    },
    {
      field: "MAT112d",
      headerName: "MAT112d ",
      editable: false,
    },
    {
      field: "MAT113d",
      headerName: "MAT113d ",
      editable: false,
    },
    {
      field: "AMT112ß",
      headerName: "AMT112ß ",
      editable: false,
    },
    {
      field: "CSC1213",
      headerName: "CSC1213 ",
      editable: false,
    },
    {
      field: "CSC1223",
      headerName: "CSC1223 ",
      editable: false,
    },
    {
      field: "CSC1233",
      headerName: "CSC1233 ",
      editable: false,
    },
    {
      field: "CSC1242",
      headerName: "CSC1242 ",
      editable: false,
    },
    {
      field: "CSC1251",
      headerName: "CSC1251 ",
      editable: false,
    },
    {
      field: "MAT121ß",
      headerName: "MAT121ß ",
      editable: false,
    },
    {
      field: "MAT122ß",
      headerName: "MAT122ß ",
      editable: false,
    },
    {
      field: "EN1201",
      headerName: "EN1201 ",
      editable: false,
    },
    {
      field: "CSC2113",
      headerName: "CSC2113 ",
      editable: false,
    },
    {
      field: "CSC2123",
      headerName: "CSC2123 ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC2133",
      headerName: "CSC2133 ",
      editable: false,
    },
    {
      field: "CSC2143",
      headerName: "CSC2143 ",
      editable: false,
    },
    {
      field: "MAT211ß",
      headerName: "MAT211ß ",
      editable: false,
    },
    {
      field: "AMT212ß",
      headerName: "AMT212ß ",
      editable: false,
    },
    {
      field: "PHY2112",
      headerName: "PHY2112 ",
      editable: false,
    },
  ];
  //End of columns

  const drawerWidth = 240;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography
          variant="pageTitle"
        >
          Student Results
        </Typography>
      </Grid>

      <Grid item sm={12} md={12}>
        <Grid container spacing={2}>
          <Grid item sm={5} md={5}>
            <Tile>
              <Typography variant="head6">Upload Result Sheet</Typography>
              <Divider sx={{ m: 1 }} />
              <Typography margin={2}> Click here to upload the new result sheet.</Typography>
              <Button
                variant="itms-add"
                fontWeight="bold"
                onClick={() => navigate('/result-sheet/upload')}
              >
                Upload
              </Button >
            </Tile>
          </Grid>
        </Grid>
      </Grid>



      <Grid item xs={12} style={{ height: "100%" }}>
        <Tile>
          <Typography variant="head6">View Student Results</Typography>          
          <Grid container spacing={1} style={{ height: "100%" }}>
            <Grid item xs={12}>
              <Box style={{ height: 400 }}>
                <DataGrid
                  rows={results}
                  columns={studentColumns}
                  disableRowSelectionOnClick
                  hideFooter={true}
                  getRowId={(row) => row._id}
                />
              </Box>
            </Grid>
          </Grid>
        </Tile>
      </Grid>
    </Grid>
  );
};

export default ViewResultsheet;
