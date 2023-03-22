import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState } from "react"
import { Tile } from "../../../card/Tile"


const User = {
    adminName: '',
    email: '',
    contactNo: '',
    staffId: '',
    password: '',
    adminRole: ''
}

export const UpdateAdminForm = () => {

    const [values, setValues] = useState(User);
    const [error, setError] = useState();


    // const handleSave = () => {
    //     const error = validateData();
    //     if(Object.keys(error).length){
    //         setError(error);
    //         return;
    //     }
    //     setError({});
    //     // console.log(values)
    //     onSave(values)

    // }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(values)
    }


    return (

        <Tile width={'400px'} height={'80vh'}>
            <Typography>Edit user details here</Typography>
            <form onSubmit={onSubmit}>
                <Stack direction={'column'} spacing={1} justifyContent={'center'}>
                    <Stack direction={'row'} spacing={3} justifyContent={'space-between'}>
                        <Stack direction={'column'} spacing={4}>
                            {['Admin Role', 'Name', 'Email', 'Contact Number', 'Staff ID', 'Password'].map((text) => (
                                <Typography key={text}>{text}</Typography>
                            ))}

                        </Stack>
                        <Stack direction={'column'} spacing={2}>
                            {['adminRole', 'adminName', 'email', 'contactNo', 'staffId', 'password'].map((text) => (
                                <TextField
                                    variant="outlined"
                                    label={text}
                                    size='small'
                                    onChange={(e) => setValues({ ...values, [text]: e.target.value })}
                                    key={text}

                                />
                            ))}

                        </Stack>
                    </Stack>
                    <Stack>
                        <Button variant="contained" type="submit"> Update User</Button>
                    </Stack>
                </Stack>
            </form>
        </Tile>

    )
}  