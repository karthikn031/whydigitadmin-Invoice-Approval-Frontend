import { Grid, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8091";

const RolesTab = ({ rolesData, handleRolesChange }) => {
  const [resData, setResData] = useState([]);

  useEffect(() => {
    getResponsibility();
  }, []);

  const getResponsibility = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/auth/allActiveResponsibility`
      );

      if (response.status === 200) {
        // Extract only the responsibility values and set them in resData
        const responsibilities =
          response.data.paramObjectsMap.resposResponsibilityVO.map(
            (screen) => screen.responsibility
          );
        setResData(responsibilities); // Setting responsibility values in the state
      } else {
        console.error("Failed to fetch responsibilities");
      }
    } catch (error) {
      console.error("Error fetching responsibilities:", error);
      alert("Error occurred while fetching responsibilities.");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField
          label="Role"
          name="role"
          value={rolesData.role}
          onChange={handleRolesChange}
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          label="Responsibilities"
          name="responsibilities"
          value={rolesData.responsibilities || ""}
          onChange={handleRolesChange}
          fullWidth
          size="small"
        >
          {/* Dynamically map responsibilities */}
          {resData.map((responsibility, index) => (
            <MenuItem key={index} value={responsibility}>
              {responsibility}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default RolesTab;
