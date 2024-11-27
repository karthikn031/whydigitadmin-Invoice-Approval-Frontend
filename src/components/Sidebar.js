import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
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
    { text: "Listing", icon: <AccountCircleIcon />, path: "/listing" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#1976d2" }}>
      {/* Toggle Button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 13,
          left: open ? drawerWidth - 50 : 10,
          zIndex: 1201,
          backgroundColor: "#FFFFFF",
          color: "#6c63ff",
          //   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          //   "&:hover": { backgroundColor: "#6c63ff", color: "#fff" },
          borderRadius: "50%",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
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
            background: "linear-gradient(45deg, #6c63ff, #3a47d5)",
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
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(255, 255, 255, 0.3)"
                      : "transparent",
                  boxShadow:
                    location.pathname === item.path
                      ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                      : "none",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: open ? 40 : "auto",
                    color: "#FFFFFF",
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
                        color: "#FFFFFF",
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
