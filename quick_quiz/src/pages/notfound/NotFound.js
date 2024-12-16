import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import background from "../../assets/images/background.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Blurred Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          zIndex: 0, 
        }}
      />

      {/* Foreground Content */}
      <Typography variant="h4" color="white" sx={{ mb: 2, fontSize: '4rem', zIndex:2, }}>
        Trang không được tìm thấy
      </Typography>
      <Typography variant="body1" color="white" sx={{ mb: 4, fontSize: '1.5rem', zIndex:2, }}>
        Xin lỗi, có vẻ như trang bạn đang tìm kiếm không tồn tại.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/home')}
        sx={{
          px: 4,
          py: 1.5,
            fontSize: '1rem',
            zIndex:2,
        }}
      >
        Trở về trang chủ
      </Button>
    </Box>
  );
};

export default NotFound;
