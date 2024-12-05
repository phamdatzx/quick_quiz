import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

const SidebarItem = ({
  type,
  icon,
  title,
  selectedMenu,
  openSideBar,
  onClick,
  textColor = "#000",
}) => {
  const itemStyles = {
    mb: 1,
    justifyContent: openSideBar ? "flex-start" : "center",
    borderRadius: "8px",
    padding: openSideBar ? "0.5rem 1rem" : "0.5rem",
    "&:hover": {
      backgroundColor: "#1935CA20",
    },
  };

  return (
    <ListItem disablePadding onClick={onClick} sx={itemStyles}>
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: openSideBar ? 2 : 0,
          justifyContent: "center",
          fontSize: 24,
          color: selectedMenu === type ? "#1935CA" : textColor,
        }}
      >
        {icon}
      </ListItemIcon>
      {openSideBar && (
        <ListItemText
          primary={title}
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "1rem",
              whiteSpace: "nowrap",
              color: selectedMenu === type ? "#1935CA" : textColor,
              fontWeight: 600,
            },
          }}
        />
      )}
    </ListItem>
  );
};

export default SidebarItem;
