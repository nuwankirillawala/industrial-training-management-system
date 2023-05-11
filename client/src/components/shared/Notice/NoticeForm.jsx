import { Upload } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import  { v4 as uuidv4 } from 'uuid';

export default function NoticeForm({ onAddNotice }) {
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newNotice = {
            id: uuidv4(),
            title: formData.title,
            subject: formData.subject,
            description: formData.description,
        };
        onAddNotice(newNotice);
        setFormData({ title: '', subject: '', description: ''});
    };

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');

    const handleAttachButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        setFileName(selectedFile.name);
    };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 50, marginRight: 10 }} onSubmit={handleSubmit}>
        <Typography fontSize={50}> Notice Form </Typography>
        <TextField name='title' label='Title' value={formData.title} onChange={handleChange} style={{ width:800, marginBottom: '1rem' }}/>
        <TextField name='subject' label='Subject' value={formData.subject} onChange={handleChange} style={{ width: 800, marginBottom: '1rem' }}/>
        <TextField name='description' label='Description' value={formData.description} onChange={handleChange} multiline rows={5} style={{ width: 800, marginBottom: '1rem' }} />

        <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
            <Button variant='contained' endIcon={<Upload />} onClick={handleAttachButtonClick}>Attach</Button>
            {fileName && (
                <Typography variant='body2' sx={{ m: 1 }}>
                    {fileName}
                </Typography>
            )}
            <input type='file' accept='*' ref={fileInputRef} onChange={handleFileInputChange} style={{ display: 'none' }} />

            <Button type='submit' variant='contained' sx={{ mr: 1 }}>Add Notice</Button>
            <Button type='' variant='contained'>Clear</Button>
        </Box>
    </form>
  );
}
