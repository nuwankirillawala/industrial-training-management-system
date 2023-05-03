import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Tile } from "../../../components/card/Tile";
import { DataGrid } from "@mui/x-data-grid";

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
  //End of state

  //Fetching data from backend
  const getResults = async () => {
    try {
      const res = await axios.get("");
      if (res.status === 200) {
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  //End of fetching data from backend

  //columns for the data grid
  const studentColumns = [
    {
      field: "name",
      headerName: "Full Name",
      width: 150,
      editable: false,
    },
    {
      field: "id",
      headerName: "Student ID",
      width: 120,
      editable: false,
    },
    {
      field: "CSC1113",
      headerName: "CSC1113 ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC1122",
      headerName: "CSC1122 ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC113a",
      headerName: "CSC113a ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC1153",
      headerName: "CSC1153 ",
      width: 120,
      editable: false,
    },
    {
      field: "MAT112d",
      headerName: "MAT112d ",
      width: 120,
      editable: false,
    },
    {
      field: "MAT113d",
      headerName: "MAT113d ",
      width: 120,
      editable: false,
    },
    {
      field: "AMT112ß",
      headerName: "AMT112ß ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC1213",
      headerName: "CSC1213 ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC1223",
      headerName: "CSC1223 ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC1233",
      headerName: "CSC1233 ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC1242",
      headerName: "CSC1242 ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC1251",
      headerName: "CSC1251 ",
      width: 120,
      editable: false,
    },
    {
      field: "MAT121ß",
      headerName: "MAT121ß ",
      width: 120,
      editable: false,
    },
    {
      field: "MAT122ß",
      headerName: "MAT122ß ",
      width: 120,
      editable: false,
    },
    {
      field: "EN1201",
      headerName: "EN1201 ",
      width: 120,
      editable: false,
    },
    {
      field: "CSC2113",
      headerName: "CSC2113 ",
      width: 120,
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
      width: 120,
      editable: false,
    },
    {
      field: "CSC2143",
      headerName: "CSC2143 ",
      width: 120,
      editable: false,
    },
    {
      field: "MAT211ß",
      headerName: "MAT211ß ",
      width: 120,
      editable: false,
    },
    {
      field: "AMT212ß",
      headerName: "AMT212ß ",
      width: 120,
      editable: false,
    },
    {
      field: "PHY2112",
      headerName: "PHY2112 ",
      width: 120,
      editable: false,
    },
  ];
  //End of columns

  const drawerWidth = 240;

  return (
    <Box sx={{ height: "88vh" }}>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          color="primary"
          marginBottom={"5px"}
          paddingLeft={"15px"}
        >
          View Uploaded Results
        </Typography>
      </Box>
      <Box sx={{ height: "100%" }}>
        <Stack spacing={1} height={"100%"}>
          <Tile sx={{ height: "100%" }}>
            <Box sx={{ height: 400 }}>
              <DataGrid
                rows={jsonData}
                columns={studentColumns}
                disableRowSelectionOnClick
                hideFooter={true}
              />
            </Box>
          </Tile>
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewResultsheet;
