import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";

export default function Header() {
  const [elevated, setElevated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:1150px)");

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setElevated(true);
    } else {
      setElevated(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#FBF9F9",
        boxShadow: elevated ? "0px 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        transition: "box-shadow 0.3s",
        height: 72,
      }}
    >
      <Box
        sx={{
          display: "flex",
                  justifyContent: "right",
          m:2,
        }}
      >
        {/* <TextField
          placeholder="Tìm kiếm"
          sx={{
            justifyContent: "center",
              height: "80%",
              width:'90%',
            minWidth:'10%',
          }}
        ></TextField> */}
        <IconButton
          onClick={handleClick}
          sx={{
            display: "flex-end",
            maxHeight: 40,
            maxWidth: 40,
            padding: 0,
            borderRadius: "50%",
          }}
        >
          <Avatar
            alt="User Name"
            src="https://via.placeholder.com/150"
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            fontFamily: "Lexend",
            fontSize: "0.8rem",
            fontStyle: "bold",
            borderRadius: 1,
          }}
        >
          <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
          <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
        </Menu>
      </Box>
    </AppBar>
  );
}
