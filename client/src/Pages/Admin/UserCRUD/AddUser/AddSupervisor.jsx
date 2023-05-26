import { SupervisorCreateForm } from "../../../../components/shared/CreateUser/forms/SupervisorCreateForm";
import { Typography, Stack } from "@mui/material";

const AddSupervisor = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Stack>
        <Typography variant="pageTitle">
          Company Supervisor Registration
        </Typography>
      </Stack>
      <Stack>
        <SupervisorCreateForm />
      </Stack>
    </Stack>
  );
};
export default AddSupervisor;
