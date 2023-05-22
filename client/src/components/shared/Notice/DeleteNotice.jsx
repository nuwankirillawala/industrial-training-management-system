import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react'

export default function DeleteNotice() {
    const [notices, setNotices] = useState([]);

    const handleDeleteNotices = async () => {
        const selectedNotices = notices.filter((notice) => notice.selected);
        const noticeIds = selectedNotices.map((notice) => notice.id);
        try {
            const response = await fetch('/api/notices', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ noticeIds }),
            });
            if (response.ok) {
                setNotices((prevNotices) => prevNotices.filter((notice) => !notice.selected));
            } else {
                console.error('Failed to delete notices:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to delete notices:', error);
        }
    };

    const handleNoticeSelect = (noticeId) => {
        setNotices((prevNotices) =>
            prevNotices.map((notice) => {
                if (notice.id === noticeId) {
                    return { ...notice, selected: !notice.selected };
                } else {
                    return notice;
                }
            })
        );
    };

  return (
    <Stack spacing={2} marginRight={1.2}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {notices.map((notice) => (
                    <TableRow key={notice.id}>
                        <TableCell>
                            <input type='checkbox' checked={notice.selected} onChange={() => handleNoticeSelect(notice.id)} />
                        </TableCell>
                        <TableCell>{notice.id}</TableCell>
                        <TableCell>{notice.title}</TableCell>
                        <TableCell>{notice.subject}</TableCell>
                        <TableCell>{notice.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Button variant='contained' color='primary' onClick={handleDeleteNotices}>
            Delete Selected Notices
        </Button>
    </Stack>
  );
};
