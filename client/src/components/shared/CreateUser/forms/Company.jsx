import { TextField,Stack,Button,Typography} from "@mui/material"
import React from "react"
import { useState} from "react"
import { Tile } from '../../../card/Tile'

const User = {
    name : '',
    email : '',
    contactNo : '',
    address : '',
    internSeats : '',
    description : '',
    rating : '',
    conPersonName : '',
    conPersonContactNo : '',
    conPersonEmail : '',
    conPersonPosition : ''
}

export const Company = () => {
   
    const [values,setValues]  = useState(User);
    const [error, setError] = useState();

// update validation

    // const validateData = () => {
    //     let error = {}
    //     if(!name){error.name="Name is required"}
    // }

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
    

    return(
    <Tile>
       <form onSubmit={onSubmit}>
       <Stack direction={'row'} spacing={10} justifyContent={'center'}>
       <Stack direction={'row'} spacing={3} justifyContent={'space-between'}>
            <Stack direction={'column'} spacing={4}>
                {['Name','Email','Contact Number','Address','Intern Seats','Rating','Description'].map((text) => (
                    <Typography key={text}>{text}</Typography>
                ))}

            </Stack>
            <Stack direction={'column'} spacing={2}>
                {['name','email','contactNo','address','internSeats','rating'].map((text) => (
                    <TextField
                        variant="outlined"
                        label={text}
                        size='small'
                        onChange={(e)=>setValues({...values,[text]:e.target.value})}
                        key={text}

                    />
                ))}

                    <TextField
                        variant="outlined"
                        label='Discription'
                        size='small'
                        onChange={(e)=>setValues({...values,description:e.target.value})}
                        multiline
                        maxRows={2}

                    />


            </Stack>
       </Stack>
       <Stack direction={'column'} spacing={3}>
            <Typography fontWeight={'bold'}>Contact Person Details</Typography>        
       <Stack direction={'row'} spacing={3} justifyContent={'space-between'}>

            <Stack direction={'column'} spacing={4}>
                {['Name','Contact Number','Email','Position'].map((text) => (
                        <Typography key={text}>{text}</Typography>
                ))}
            </Stack>
            <Stack direction={'column'} spacing={2}>
                {['conPersonName','conPersonContactNo','conPersonEmail','conPersonPosition'].map((text) => (
                            <TextField
                                variant="outlined"
                                label={text}
                                size='small'
                                onChange={(e)=>setValues({...values,[text]:e.target.value})}
                                key={text}

                            />
                ))}
            </Stack>
       </Stack>
       
       <Stack>
       <Button variant="contained" type="submit"> Add Company</Button>
       </Stack>
       </Stack>
       </Stack>
       </form>
    </Tile>    
    
    )
} 