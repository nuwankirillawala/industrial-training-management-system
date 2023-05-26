import { AluminiCreateForm } from "../../../../components/shared/CreateUser/forms/AluminiCreateForm";
import { Typography, Stack } from "@mui/material";

const AddAlumini = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Stack>
        <Typography variant="pageTitle">Alumni Registration</Typography>
      </Stack>
      <Stack>
        <AluminiCreateForm />
      </Stack>
    </Stack>
  );
};
export default AddAlumini;
