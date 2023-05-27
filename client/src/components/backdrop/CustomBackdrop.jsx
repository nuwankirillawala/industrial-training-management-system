import { Backdrop, Box, Button, CircularProgress } from "@mui/material";

export const CustomBackdrop = () => {
  //DOCUMENTATION
  // construct this state->   const [openBackdrop, setOpenBackdrop] = useState(false);
  // set true when endPoint calls->   setOpenBackdrop(true);
  // define this inside the main container->   {openBackdrop && <CustomBackdrop />}
  //END

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
