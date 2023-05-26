import axios from "axios";
import {
  Box,
  Typography,
  Stack,
  Grid,
  TextField,
  Paper,
  LinearProgress,
  Divider,
  Avatar,
} from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from "react-router-dom";
import { Tile } from "../../../components/card/Tile";
import FeaturedCard from "../../../components/Dashboard/FeaturedCard";
import ProfileFormLine from "../../../components/Dashboard/ProfileFormLine";
import useFetch from "../../../Hooks/useFetch";
import { NoticeBoard } from "../../../components/Notice/NoticeBoard";
import SimplePieChart from "../../../components/user/Admin/PieChart.jsx/SimplePieChart";
import ImageDisplay from "../../../components/ImageDisplay/ImageDisplay";

const cvSubmitChartData = [
  ["Status", "No of Student"],
  ["Submitted", 11],
  ["Not-Submitted", 2],
];

const cvSubmitChartOptions = {
  title: "CV Submission",
};

const cvSentChartData = [
  ["Status", "No of Student"],
  ["CV Sent", 11],
  ["CV Not Sent", 2],
  ["Selected", 2],
];

const cvSentChartOptions = {
  title: "Intern Status",
};

export const AdminDashboard = () => {
  const { data } = useFetch(
    "GET",
    "http://localhost:5000/api/v1/admin/profile",
    null
  );
  console.log(data);

  const basicInfo = data && {
    name: data.user.name,
    staffID: data.user.staffId,
    email: data.user.email,
    contactNo: data.user.contactNo,
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{ display: "flex" }}
      padding={"0px 10px 0px 0px"}
      margin={"0px 10px"}
    >
      <Grid container spacing={1}>
        <Grid item md={12}>
          <Typography variant="pageTitle">Dashboard</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2}>
            <FeaturedCard
              title="Intern Status"
              color="primary"
              icon={LeaderboardIcon}
              link="/student-company"
            />
            <FeaturedCard
              title="Manage Users"
              color="red"
              icon={DescriptionIcon}
              link="/manage-user"
            />
            <FeaturedCard
              title="Manage Company"
              color="blue"
              icon={BusinessIcon}
              link="/manage-company"
            />
            <FeaturedCard
              title="Intern Reports"
              color="green"
              icon={UploadFileIcon}
              link="/report-portal"
            />
            <FeaturedCard
              title="Company Ratings"
              color="yellow"
              icon={ContactPageIcon}
              link="/portfolio"
            />
          </Stack>
        </Grid>
        <Grid item md={9} sm={3}>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Tile flex={7}>
                    <Typography variant="head6">Profile</Typography>
                    <Divider sx={{ m: 1 }} />
                    <Stack direction={"row"} spacing={4}>
                      <Stack
                        justifyItems={"center"}
                        alignItems={"center"}
                        flex={3}
                      >
                        {!data.user ? (
                          <Avatar width={"140px"} height={"140px"} />
                        ) : (
                          <ImageDisplay
                            imagePath={`http://localhost:5000/${data.user.profileImage}`}
                            width={140}
                            height={140}
                          />
                        )}
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          textAlign={"center"}
                        >
                          {(() => {
                            if (
                              data.user &&
                              data.user.role === "system-admin"
                            ) {
                              return "System Administrator";
                            } else if (
                              data.user &&
                              data.user.role === "department-coordinator"
                            ) {
                              return "Department Coordinator";
                            } else {
                              return "Admin";
                            }
                          })()}
                        </Typography>
                      </Stack>

                      <Stack spacing={0.8} flex={12} direction={"column"}>
                        <ProfileFormLine
                          title="Name"
                          content={basicInfo.name}
                        />
                        <ProfileFormLine
                          title="Staff ID"
                          content={basicInfo.staffID}
                        />
                        <ProfileFormLine
                          title="Email"
                          content={basicInfo.email}
                        />
                        <ProfileFormLine
                          title="Mobile"
                          content={basicInfo.contactNo}
                        />
                      </Stack>
                    </Stack>
                  </Tile>
                </Grid>
                <Grid item xs={12}>
                  <Tile height={"100%"}>
                    <Stack spacing={0.8} flex={12} direction={"column"}>
                      <Typography variant="head6">Status</Typography>
                      <Divider sx={{ m: 1 }} />
                      <Stack direction={"row"}>
                        <SimplePieChart
                          data={cvSubmitChartData}
                          options={cvSubmitChartOptions}
                        />
                        <SimplePieChart
                          data={cvSentChartData}
                          options={cvSentChartOptions}
                        />
                      </Stack>
                    </Stack>
                  </Tile>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* right half of the grid and it shows notice,note and the calender*/}
        <Grid item md={3}>
          <Stack spacing={1}>
            <Stack>
              <Tile>
                {/* <Typography fontWeight={"bold"}>Notice</Typography> */}
                <NoticeBoard />
              </Tile>
            </Stack>
            <Stack>
              {/* note  */}
              {/* <PrivateNotePanel /> */}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
