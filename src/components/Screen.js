import { Box, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import ResponsibilitiesTab from "./Roles/ResponsibilitiesTab";
import RolesTab from "./Roles/RolesTab";
import ScreenTab from "./Roles/ScreenTab";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8091";

export const Screen = () => {
  const [tabIndex, setTabIndex] = useState(0);

  // State for tab 1 (Screen)
  const [screenData, setScreenData] = useState({
    screenCode: "",
    screenName: "",
    active: "",
  });

  // State for tab 2 (Responsibilities)
  const [responsibilitiesData, setResponsibilitiesData] = useState({
    responsibility: "",
    screenName: [],
    active: false,
  });

  // State for tab 3 (Roles)
  const [rolesData, setRolesData] = useState({
    role: "",
    responsibility: "",
    active: false,
  });

  // Handle input changes for fields in each tab
  const handleScreenChange = (e) => {
    const { name, value } = e.target;
    setScreenData({ ...screenData, [name]: value });
    console.log("Screen", screenData);
  };

  const handleResponsibilitiesChange = (event) => {
    const { name, value } = event.target;

    if (name === "screenName") {
      // Handle multi-select for screen
      setResponsibilitiesData((prevState) => ({
        ...prevState,
        [name]: typeof value === "string" ? value.split(",") : value,
      }));
    } else {
      setResponsibilitiesData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleRolesChange = (e) => {
    const { name, value } = e.target;
    setRolesData({ ...rolesData, [name]: value });
  };

  const handleClearScreen = () => {
    setScreenData({
      screenCode: "",
      screenName: "",
      active: "",
    });
  };

  const handleScreenSave = async () => {
    // Validate input fields
    if (!screenData.screenCode || screenData.screenCode.trim() === "") {
      alert("Screen Code is required.");
      return;
    }
    if (!screenData.screenName || screenData.screenName.trim() === "") {
      alert("Screen Name is required.");
      return;
    }

    const payload = {
      active: screenData.active,
      createdBy: localStorage.getItem("userName"),
      screenCode: screenData.screenCode,
      screenName: screenData.screenName,
    };

    try {
      const response = await axios.put(
        `${API_URL}/api/auth/createUpdateScreenNames`,
        payload
      );

      if (response.data.status === true) {
        const audio = new Audio("/success.wav"); // Replace with your sound file path
        audio.play();

        // Success logic here
        // notification.success({
        //   message: `Item ${item.id} Rejected`,
        //   description: `You have rejected item ${item.id}.`,
        // });
        // fetchData();
        // setIsModalOpen(false);
      } else {
        // Handle failure response
        // notification.error({
        //   message: `Item ${item.id} failed`,
        // });
      }
    } catch (error) {
      console.log("Error Response:", error.response?.data);
      const errorMessage =
        error.response?.data?.paramObjectsMap?.errorMessage ||
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      alert(errorMessage); // Show error message
    }
  };

  const handleResponsibilitiesSave = async () => {
    // Validate input fields
    if (
      !responsibilitiesData.responsibility ||
      responsibilitiesData.responsibility === ""
    ) {
      alert("Responsibility is required.");
      return;
    }
    if (
      !responsibilitiesData.screenName ||
      responsibilitiesData.screenName === ""
    ) {
      alert("Screen Name is required.");
      return;
    }

    const payload = {
      active: responsibilitiesData.active,
      createdBy: localStorage.getItem("userName"),
      responsibility: responsibilitiesData.responsibility, // Assuming 'responsibility' maps to 'name'
      screensDTO: responsibilitiesData.screenName.map((screenName) => ({
        screenName,
      })),
    };

    try {
      const response = await axios.put(
        `${API_URL}/api/auth/createUpdateResponsibility`,
        payload
      );

      if (response.data.status === true) {
        const audio = new Audio("/success.wav"); // Replace with your sound file path
        audio.play();

        // Success logic here
        // notification.success({
        //   message: `Item ${item.id} Rejected`,
        //   description: `You have rejected item ${item.id}.`,
        // });
        // fetchData();
        // setIsModalOpen(false);
      } else {
        // Handle failure response
        // notification.error({
        //   message: `Item ${item.id} failed`,
        // });
      }
    } catch (error) {
      console.log("Error Response:", error.response?.data);
      const errorMessage =
        error.response?.data?.paramObjectsMap?.errorMessage ||
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      alert(errorMessage); // Show error message
    }
  };

  const handleRolesSave = async () => {
    // Validate input fields
    if (!rolesData.responsibility || rolesData.responsibility === "") {
      alert("Responsibility is required.");
      return;
    }
    if (!rolesData.role || rolesData.role === "") {
      alert("Screen Name is required.");
      return;
    }

    const payload = {
      active: rolesData.active,
      createdBy: localStorage.getItem("userName"),
      responsibilities: rolesData.responsibility,
      role: rolesData.screenName,
    };

    try {
      const response = await axios.put(
        `${API_URL}/api/auth/createUpdateRoles`,
        payload
      );

      if (response.data.status === true) {
        const audio = new Audio("/success.wav"); // Replace with your sound file path
        audio.play();

        // Success logic here
        // notification.success({
        //   message: `Item ${item.id} Rejected`,
        //   description: `You have rejected item ${item.id}.`,
        // });
        // fetchData();
        // setIsModalOpen(false);
      } else {
        // Handle failure response
        // notification.error({
        //   message: `Item ${item.id} failed`,
        // });
      }
    } catch (error) {
      console.log("Error Response:", error.response?.data);
      const errorMessage =
        error.response?.data?.paramObjectsMap?.errorMessage ||
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      alert(errorMessage); // Show error message
    }
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
                      <CloseIcon onClick={handleClearScreen} />
                    </IconButton>
                    <IconButton>
                      <ListAltIcon />
                    </IconButton>
                    <IconButton>
                      <SaveIcon onClick={handleScreenSave} />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <ScreenTab
              screenData={screenData}
              handleScreenChange={handleScreenChange}
            />

            {/* <CommonTable /> */}
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
                      <SaveIcon onClick={handleResponsibilitiesSave} />
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
                      <SaveIcon onClick={handleRolesSave} />
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
