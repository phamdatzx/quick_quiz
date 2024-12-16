import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import topicService from './../../services/topicService';

const TopicCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage('');

    try {
      const result = await topicService.createTopic({ name, description });
      setSuccessMessage(`Topic created successfully! ID: ${result.id}`);
      setName('');
      setDescription('');
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 4, p: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Tạo Chủ Đề Mới
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          label="Tên chủ đề"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Mô tả"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Đã tạo chủ đề thành công!
          </Alert>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Tạo chủ đề
        </Button>
      </form>
    </Box>
  );
};

export default TopicCreate;
