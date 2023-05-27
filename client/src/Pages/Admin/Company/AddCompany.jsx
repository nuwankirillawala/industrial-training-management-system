import { Typography, Stack } from "@mui/material";
import { CompanyCreateForm } from "../../../components/shared/CreateUser/forms/CompanyCreateForm";

const AddCompany = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Stack>
        <Typography variant="pageTitle">Company registration</Typography>
      </Stack>
      <Stack>
        <CompanyCreateForm />
      </Stack>
    </Stack>
  );
};

export default AddCompany;
