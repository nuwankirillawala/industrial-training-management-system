import { DepartmentCoordinatorCreateForm } from "../../../../components/shared/CreateUser/forms/DepartmentCoordinatorCreateForm";
import { Typography, Stack } from "@mui/material";

const AddDepartmentCoordinator = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Stack>
        <Typography variant="pageTitle">
          Department Coordinator Registration
        </Typography>
      </Stack>
      <Stack>
        <DepartmentCoordinatorCreateForm />
      </Stack>
    </Stack>
  );
};

export default AddDepartmentCoordinator;
