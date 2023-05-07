import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
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

  return (
    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 50 }} onSubmit={handleSubmit}>
        <TextField name='title' label='Title' value={formData.title} onChange={handleChange} style={{ width:800, marginBottom: '1rem' }}/>
        <TextField name='subject' label='Subject' value={formData.subject} onChange={handleChange} style={{ width: 800, marginBottom: '1rem' }}/>
        <TextField name='description' label='Description' value={formData.description} onChange={handleChange} multiline rows={5} style={{ width: 800, marginBottom: '1rem' }} />
        <Button type='submit' variant='contained'>Add Notice</Button>
        <Button type='' variant='contained'>Clear</Button>
    </form>
  );
}
