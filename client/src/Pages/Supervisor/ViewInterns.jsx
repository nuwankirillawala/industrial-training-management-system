import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Tile } from "../../components/card/Tile";
import { Student } from "../../assets";

//dummy data
const studentList = [
  { name: "Sanjana Dasanayaka", regNo: "SC/2019/11139" },
  { name: "Saman kumara", regNo: "SC/2019/11102" },
  { name: "Udani Kaluwala", regNo: "SC/2019/11100" },
];
//End of Dummy data

export const ViewInterns = () => {
  //State for Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //State for fetched student list
  //   const [studentList, setStudentList] = useState([]);

  //getsupervisorId
  const getId = async () => {
    setOpenBackdrop(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/supervisor/profile",
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log(res.data.user.interns);
      }
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };
  //End of supervisorId

  useEffect(() => {
    getId();
  }, []);
  //Ent of get InternList

  //Column for student list
  const studentColumn = [
    {
      field: "regNo",
      headerName: "Student Number",
      flex: 1,
      editable: false,
    },
    {
      field: "name",
      headerName: "Student Name",
      flex: 1,
      editable: false,
    },
  ];
  //End of column
  return (
    <Box width={"100%"}>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="pageTitle"
          color="primary"
          marginBottom={"5px"}
          paddingLeft={"15px"}
        >
          Assigned Interns
        </Typography>
      </Box>
      <Box>
        <Stack spacing={3} direction={"row"}>
          <Box width={"50%"}>
            <Tile>
              <Stack>
                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="head6"
                    align="center"
                    fontWeight={"bold"}
                  >
                    Interns
                  </Typography>
                </Box>
                <Box height={500}>
                  <DataGrid
                    rows={studentList}
                    columns={studentColumn}
                    hideFooter={true}
                    disableColumnMenu={true}
                    getRowId={(row) => row.regNo}
                  />
                </Box>
              </Stack>
            </Tile>
          </Box>
          <Box width={"50%"}>
            <img src={Student} alt="Resume" width={500} />
          </Box>
        </Stack>
      </Box>
      {openBackdrop && <CustomBackdrop />}
    </Box>
  );
};
