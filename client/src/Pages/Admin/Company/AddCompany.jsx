import { Typography } from "@mui/material";
import { CompanyCreateForm } from "../../../components/shared/CreateUser/forms/CompanyCreateForm";

const AddCompany = () => {
  return (
    <>
      <Typography variant="h6" color="primary" marginBottom={'5px'} paddingLeft={'15px'}>Add company Details</Typography>
      <CompanyCreateForm />
    </>
  )
}

export default AddCompany