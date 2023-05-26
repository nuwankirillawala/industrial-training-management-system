import React from 'react'
import { useState, useEffect } from 'react'
import { Tile } from '../../components/card/Tile'
import Typography from '@mui/material/Typography'
import { Button, Divider, Stack } from '@mui/material'
import axios from 'axios'
import useAuth from '../../Hooks/useAuth'
import Dialogbox from '../../components/Dialogbox/Dialogbox'
import { AddNewNote } from './AddNewNote'

const PrivateNotePanel = () => {
  const { user } = useAuth();
  console.log(" hi Auth", user); //_id, title, title came from back
  const [allNote, setAllNote] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleTitleClick = (note) => {
    setSelectedNote(note);
  }

  useEffect(() => {
    if (user.notes) {
      setAllNote(user.notes);
    }
  }, []);

  // const getNotices = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/v1/undergraduate/note/all");
  //     if (res.data.status === "success") {
  //       console.log("hi", res.data.notes);
  //       setAllNote(res.data.notes);  
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getNotices();
  // }, []);


  return (
    <Tile height={'39vh'} >


      <Stack direction="row" justifyContent={'space-between'} >
        <Typography variant="head4" >Private Notes</Typography>
        {user && (
          <Dialogbox title="Add New Note" btn_name="+" fontSize={20} fontWeight={'bold'}>
            <AddNewNote userId={user._id} />
          </Dialogbox>
        )}
      </Stack>
      <Divider />
      <Stack spacing={2} >
        {allNote.map((note, index) => (
          <Stack>
            <Typography variant='body4' fontWeight={'bold'} onClick={() => handleTitleClick(note)}
              style={{ cursor: 'pointer' }}> {index + 1} :  {note.title}</Typography>
            {selectedNote === note && (
              <Typography variant='body5'>{note.content}</Typography>
            )}
          </Stack>
        ))
        }
      </Stack>


    </Tile >
  )
}

export default PrivateNotePanel