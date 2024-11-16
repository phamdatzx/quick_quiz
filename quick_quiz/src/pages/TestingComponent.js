
import React from 'react';
import { Box, Button, Typography, Card, Avatar, TextField, IconButton, Chip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';


export default function Testing() {
  return (
    
      <Box sx={{ padding: 4 }}>
        {/* Button Variants */}
        <Button variant="contained">Contained Button</Button>
        <Button variant="outlined" sx={{ marginLeft: 2 }}>Outlined Button</Button>
        

        {/* Typography Variants */}
        <Typography variant="h4" sx={{ marginTop: 4 }}>Typography - H4</Typography>
        <Typography variant="body1">Typography - Body1</Typography>
        <Typography variant="subtitle1">Typography - Subtitle1</Typography>

        {/* Card Component */}
        <Card sx={{ padding: 2, marginTop: 4 }}>
          <Typography variant="h6">Card Component</Typography>
          <Typography variant="body2">This is a sample card with some content.</Typography>
        </Card>

        {/* Avatar Component */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
          <Avatar alt="User" src="https://via.placeholder.com/40" />
          <Typography variant="body1" sx={{ marginLeft: 2 }}>Avatar Component</Typography>
        </Box>

        {/* TextField Component */}
        <TextField
          variant="outlined"
          label="TextField"
          sx={{ marginTop: 4 }}
        />

        {/* IconButton Component */}
        <IconButton sx={{ marginTop: 4 }} color="primary">
          {/* Replace with an icon component of your choice, e.g., <SearchIcon /> */}
          <span>🔍</span>
        </IconButton>

        {/* Chip Component */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 4 }}>
          <Chip label="Chip Default" />
          <Chip label="Chip with Icon" icon={<span>🔥</span>} />
        </Box>
      </Box>
    
  );
}
