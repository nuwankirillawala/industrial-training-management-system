import { Typography, Stack } from "@mui/material";
import { AdminCreateForm } from "../../../../components/shared/CreateUser/forms/AdminCreateForm";

const AddAdmin = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Stack>
        <Typography variant="pageTitle">Admin Registration</Typography>
      </Stack>
      <Stack>
        <AdminCreateForm />
      </Stack>
    </Stack>
  );
};

export default AddAdmin;
