import { UndergraduateCreateForm } from "../../../../components/shared/CreateUser/forms/UndergraduateCreateForm";
import { Typography, Stack } from "@mui/material";

export const AddStudent = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Stack>
        <Typography variant="pageTitle">Undergraduate Registration</Typography>
      </Stack>
      <Stack>
        <UndergraduateCreateForm />
      </Stack>
    </Stack>
  );
};

export default AddStudent;
