import { Box, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import ResponsibilitiesTab from "./Roles/ResponsibilitiesTab";
import RolesTab from "./Roles/RolesTab";
import ScreenTab from "./Roles/ScreenTab";

export const Screen = () => {
  const [tabIndex, setTabIndex] = useState(0);

  // State for tab 1 (Screen)
  const [screenData, setScreenData] = useState({
    screenCode: "",
    screenName: "",
  });

  // State for tab 2 (Responsibilities)
  const [responsibilitiesData, setResponsibilitiesData] = useState({
    name: "",
    screen: "",
  });

  // State for tab 3 (Roles)
  const [rolesData, setRolesData] = useState({
    role: "",
    responsibilities: "",
  });

  // Handle input changes for fields in each tab
  const handleScreenChange = (e) => {
    const { name, value } = e.target;
    setScreenData({ ...screenData, [name]: value });
  };

  const handleResponsibilitiesChange = (e) => {
    const { name, value } = e.target;
    setResponsibilitiesData({ ...responsibilitiesData, [name]: value });
  };

  const handleRolesChange = (e) => {
    const { name, value } = e.target;
    setRolesData({ ...rolesData, [name]: value });
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#F3F4F6", borderRadius: 2 }}>
      {/* Header with Icons */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 1, mt: 4 }}
      >
        <Typography variant="h5">Roles And Responsibilities</Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ backgroundColor: "#fff", p: 2, borderRadius: 2 }}>
        <Tabs value={tabIndex} onChange={(_, index) => setTabIndex(index)}>
          <Tab label="Screen" />
          <Tab label="Responsibilities" />
          <Tab label="Roles" />
        </Tabs>

        {/* Tab 1: Screen */}
        {tabIndex === 0 && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  {/* <Typography variant="h6">Screen</Typography> */}
                  <Box>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                    <IconButton>
                      <ListAltIcon />
                    </IconButton>
                    <IconButton>
                      <SaveIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <ScreenTab
              screenData={screenData}
              handleScreenChange={handleScreenChange}
            />
          </Box>
        )}

        {/* Tab 2: Responsibilities */}
        {tabIndex === 1 && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                    <IconButton>
                      <ListAltIcon />
                    </IconButton>
                    <IconButton>
                      <SaveIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <ResponsibilitiesTab
              responsibilitiesData={responsibilitiesData}
              handleResponsibilitiesChange={handleResponsibilitiesChange}
            />
          </Box>
        )}

        {/* Tab 3: Roles */}
        {tabIndex === 2 && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                    <IconButton>
                      <ListAltIcon />
                    </IconButton>
                    <IconButton>
                      <SaveIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <RolesTab
              rolesData={rolesData}
              handleRolesChange={handleRolesChange}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
