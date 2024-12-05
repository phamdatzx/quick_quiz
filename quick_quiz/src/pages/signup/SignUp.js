import * as React from "react";
import theme from "../../config/customizations/uicustomization";
import { Box, Stack, TextField, Typography, Button, ThemeProvider } from "@mui/material";
import background from '../../assets/images/background.png';
import SignUpCard from "./SignUpCard";

function SignUp() {
  return (
    <>
  <Box
    sx={{
      display: "flex",
      height: "100vh",
      position: "relative", 
    }}
  >
    {/* Left side: Quote Section */}
    <Box sx={{ flex: 1, position: "relative", overflow: "hidden",}}>
      {/* Background image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
              backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
              filter: "blur(8px)", 
              
          zIndex: -1,
        }}
          />
          
          {/* Lớp phủ màu xanh */}
      <div
        style={{
          backgroundColor: "#1935CA70",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></div>

      {/* Typography */}
      <Box
        sx={{
          position: "flex",
          zIndex: 1,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
              padding: 3,
          height:"100%",
        }}
      >
        <Typography
          sx={{
            px: 24,
            mb: 4,
            fontStyle: "normal",
            fontSize:'1.2rem',
            opacity: 0.9,
            color: "#fff",
            textAlign:'justify',
          }}
        >
          “Those people who develop the ability to continuously acquire new and
          better forms of knowledge that they can apply to their work and to
          their lives will be the movers and shakers in our society for the
          indefinite future.”
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            alignSelf: "flex-start",
            pl:24,
          }}
        >
          Brian Tracy
        </Typography>
      </Box>
    </Box>

    {/* Right side: Reset Password Form */}
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
            p: 4,
      }}
    >
      <SignUpCard />
    </Box>
  </Box>
</>
  );
}

export default SignUp;