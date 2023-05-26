import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { Tile } from "../../components/card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import axios from "axios"
import { StatusSnackBar } from "../../components/StatusSnackBar/StatusSnackBar"


export const AddNewNote = ({ userId }) => {
    const [note, setNote] = useState({
        userId: '',
        title: '',
        contenet: ''
    });
    //statusSnackBar state
    const [trigger, setTrigger] = useState({
        success: false,
        error: false,
    });





    //End of statusSnackBar state
    const handleSnackBar = (key) => {
        setTrigger((prevState) => {
            let newState = { ...prevState };
            newState[key] = !newState[key];
            return newState;
        });
    };

    const NoteNew = {
        userId: '',
        title: '',
        content: ''
    }

    // const validation = yup.object().shape({
    //     alumniName: yup.string(),
    //     alumniEmail: yup.string().email("Invalid Email"),
    //     alumniContactNo: yup.string().length(10, "must contain 10 digits"),
    //     alumniGraduatedYear: yup.string()
    // })


    const handleFormSubmit = async (values) => {
        console.log(values)
        try {
            const res = await axios.post(`http://localhost:5000/api/v1/undergraduate/note`,
                {
                    userId: userId,
                    title: note.title,
                    content: note.contenet
                },
                { withCredentials: true }

            );
            window.location.reload(false);
            console.log(res.status);

            if (res.status === 201) {
                handleSnackBar("success");
            } else {
                handleSnackBar("error");
            }
        }
        catch (error) {
            console.log(error);
            handleSnackBar("error");
        }
    }


    return (
        <Tile>
            <Formik

                initialValues={NoteNew}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    handleReset  //this gives initialvalues not clear fields
                }) => (
                    <form onReset={handleReset}
                        onSubmit={(e) => { e.preventDefault(); handleSubmit; handleFormSubmit(values); }} >
                        <>
                            <Stack direction="column" spacing={2}>

                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={'Title'}
                                        value={values.title} //if u use User here it will not let change text
                                        name="title"
                                    />
                                </Stack>

                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={'Content'}
                                        value={values.content} //if u use User here it will not let change text
                                        name="content"
                                    />
                                </Stack>
                            </Stack>




                            <Stack direction="row" display={'flex'} justifyContent="flex-end" paddingRight={'0px'}>
                                <Button variant="itms" type="submit"  >Submit</Button>
                                <Button variant="itms" type="reset"  >Reset</Button>
                            </Stack>
                        </>
                    </form>
                )}
            </Formik>
            <StatusSnackBar
                severity="success"
                trigger={trigger.success}
                setTrigger={() => {
                    handleSnackBar(" Update success");
                }}
                alertMessage={"Update Succefully"}
            />
            <StatusSnackBar
                severity="error"
                trigger={trigger.error}
                setTrigger={() => {
                    handleSnackBar("error");
                }}
                alertMessage={"Update Fail"}
            />
        </Tile>

    )
}  