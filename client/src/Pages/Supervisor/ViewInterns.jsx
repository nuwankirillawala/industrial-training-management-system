import { Box } from "@mui/material";
import { useState } from "react";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";

export const ViewInterns = () => {
  //State for Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //State for fetched student list
  const [studentList, setStudentList] = useState([]);

  //Get InternList
  const getStudentList = async () => {
    setOpenBackdrop(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/intern/list",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        // console.log(res.data.users);
        let rawStudentList = res.data.users;
        // setStudentList(res.data.users);
        setStudentList(
          rawStudentList.filter(
            (item) => typeof item["supervisor"] === "undefined"
          )
        );
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };
  //Ent of get InternList
  return (
    <Box>
      hello
      {openBackdrop && <CustomBackdrop />}
    </Box>
  );
};
