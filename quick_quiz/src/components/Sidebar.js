import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

import SidebarItem from "./SideBarItem";
export default function Sidebar() {
  const [openSideBar, setOpenSideBar] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu.type);
    navigate(menu.href);
  };

  const renderSidebarItems = useCallback(() => {
    const items = [];

    // if (role === 'user')
    // This function is for rendering sidebar corresponding to user role
    // Yet we currently have 1 role
    items.push(
      {
        type: "home",
        icon: <HomeRoundedIcon />,
        title: "Trang chủ",
        href: "/home",
      },
      {
        type: "topic",
        icon: <AutoStoriesRoundedIcon />,
        title: "Chủ đề",
        href: "/topic",
      },
      {
        type: "quizsetlibrary",
        icon: <FolderRoundedIcon />,
        title: "Các bộ câu hỏi",
        href: "/quizsetlibrary",
      },
      {
        type: "history",
        icon: <HistoryRoundedIcon />,
        title: "Lịch sử làm bài",
        href: "/history",
      },
      
    );

    return items;
  }, []);

  useEffect(() => {
    const currentMenu = renderSidebarItems().find(
      (item) => item.href === location.pathname
    );
    if (currentMenu) {
      setSelectedMenu(currentMenu.type);
    }
  }, [location, renderSidebarItems]);

  const drawerWidth = openSideBar ? "18rem" : "5rem";
  const drawerTransition = "0.2s ease";
  return (
    <Drawer
      variant="permanent"
      open={openSideBar}
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: drawerTransition,
          overflow: "hidden",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          p: 2,
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            justifyContent: openSideBar ? "flex-start" : "center",
          }}
        >
          {openSideBar && (
            <Typography variant="h6" sx={{ flexGrow: 1, ml: 2, color: "#000" }}>
              Quiz
            </Typography>
          )}
          <IconButton
            onClick={() => setOpenSideBar(!openSideBar)}
            sx={{
              color: "#1935CA",
              fontSize: 24,
              "&:hover": { backgroundColor: "#1935CA", color: "#fff" },
            }}
          >
            {openSideBar ? (
              <KeyboardDoubleArrowLeftRoundedIcon fontSize="inherit" />
            ) : (
              <KeyboardDoubleArrowRightRoundedIcon fontSize="inherit" />
            )}
          </IconButton>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box flex={1}>
          <List>
            {renderSidebarItems().map((item) => (
              <SidebarItem
                key={item.type}
                type={item.type}
                icon={item.icon}
                title={item.title}
                selectedMenu={selectedMenu}
                openSideBar={openSideBar}
                onClick={() => handleSelectMenu(item)}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
