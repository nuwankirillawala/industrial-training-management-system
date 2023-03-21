import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState } from "react"
import { Tile } from "../../../card/Tile"

const User = [
    { field: 'CompanyName', type: 'text' },
    { field: 'email', type: 'email' },
    { field: 'contactNo', type: 'text' },
    { field: 'address', type: 'text' },
    { field: 'internSeats', type: 'number' },
    { field: 'description', type: 'text' },
    { field: 'rating', type: 'number' },
    { field: 'ContactPersonName', type: 'text' },
    { field: 'contactPersonContactNo', type: 'text' },
    { field: 'contactPersonEmail', type: 'email' },
    { field: 'contactPersonPosition', type: 'text' }
]


export const UpdateCompanyForm = () => {

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

        <Tile width={'550px'} >
            <Typography fontWeight={'bold'} sx={{ padding: '10px', justifyContent: 'center', display: 'flex' }}>Edit Company details here</Typography>
            <form onSubmit={onSubmit}>
                <Stack direction={'column'} spacing={1} justifyContent={'center'}>
                    <Stack direction={'row'} spacing={3} justifyContent={'space-between'} paddingLeft={'15px'}>
                        <Stack direction={'column'} spacing={4}>
                            {['Company Name ', 'Company Email', 'Company Contact Number', 'Address', 'No of Internship Seats', 'Description', ' Rating', 'Contact person name', 'Contact No ', 'E-mail', 'Post'].map((text) => (
                                <Typography key={text}>{text}</Typography>
                            ))}

                        </Stack>
                        <Stack direction={'column'} spacing={2}>
                            {User.map((user, index) => (
                                <TextField
                                    variant="outlined"
                                    label={user.field}
                                    type={user.type}
                                    size='small'
                                    onChange={(e) => setValues({ ...values, [text]: e.target.value })}
                                    key={index}

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