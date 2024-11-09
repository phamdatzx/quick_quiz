import * as React from "react";
import SignInCard from "./SignInCard";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import background from '../../assets/images/background.png';

function SignIn() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      {/* Left side: Quote Section */}
      <Box
        sx={{
          flex: 1,
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
        }}
      >
        <Typography
          variant="h4"
          component="p"
          sx={{ mb: 2, fontStyle: "italic", opacity: 0.9 }}
        >
          “Those people who develop the ability to continuously acquire new and
          better forms of knowledge that they can apply to their work and to
          their lives will be the movers and shakers in our society for the
          indefinite future.”
        </Typography>
        <Typography variant="h6" component="p">
          - Brian Tracy
        </Typography>
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
        <SignInCard/>
      </Box>
    </Box>
  );
}

export default SignIn;