import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 260;

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const hiddenPaths = ["/login", "/register"];
  if (hiddenPaths.includes(location.pathname)) return null;

  const menuItems = [
    { text: "Overview", icon: <DashboardIcon />, path: "/overview" },
    { text: "Reports", icon: <BarChartIcon />, path: "/reports" },
    { text: "User Creation", icon: <PersonAddIcon />, path: "/userCreation" },
    { text: "Screen", icon: <ScreenShareIcon />, path: "/screen" },
    { text: "Listing", icon: <ListAltIcon />, path: "/listing" },
    {
      text: "Approved List",
      icon: <VerifiedIcon />,
      path: "/ApprovedList",
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#FCE212" }}>
      {/* Toggle Button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 13,
          left: open ? 10 : 10,
          zIndex: 1201,
          backgroundColor: "#FCE212",
          color: "#ffffff",
          borderRadius: "50%",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {open ? <MenuIcon /> : <MenuIcon />}
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 80,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 80,
            boxSizing: "border-box",
            background: "#212F3C",
            color: "#FFFFFF",
            transition: "width 0.3s ease-in-out",
            borderRight: "none",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: open ? "center" : "flex-start",
            paddingLeft: open ? 0 : 2,
          }}
        >
          {open && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              Dashboard
            </Typography>
          )}
        </Toolbar>
        <Box sx={{ padding: "20px 10px" }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                component={Link}
                to={item.path}
                key={index}
                sx={{
                  marginBottom: 1,
                  borderRadius: "12px",
                  color:
                    location.pathname === item.path ? "#000000" : "#FFFFFF",
                  backgroundColor:
                    location.pathname === item.path ? "#FCE212" : "transparent",
                  boxShadow:
                    location.pathname === item.path
                      ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                      : "none",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#FCE212",
                    transform: "scale(1.05)",
                    color: "#000000", // Ensures text turns black on hover
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: open ? 40 : "auto",
                    color:
                      location.pathname === item.path ? "#000000" : "#FFFFFF",
                    "&:hover": {
                      color: "#000000", // Turns icon black on hover
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "1rem",
                        fontWeight: "500",
                        color:
                          location.pathname === item.path
                            ? "#000000"
                            : "#FFFFFF", // Text color
                        "&:hover": {
                          color: "#000000", // Turns text black on hover
                        },
                      },
                    }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
