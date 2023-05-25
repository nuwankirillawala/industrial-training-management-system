import { Typography } from "@mui/material";
import { AdminCreateForm } from "../../../../components/shared/CreateUser/forms/AdminCreateForm";

const AddAdmin = () => {
  return (
    <>
        <Typography variant='pageTitle'> Add Administrator Details</Typography>
        <AdminCreateForm />
    </>
  )
}

export default AddAdmin