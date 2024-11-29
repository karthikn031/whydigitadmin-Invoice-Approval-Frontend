import { Grid, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const RolesTab = ({ rolesData, handleRolesChange }) => {
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
          value={rolesData.responsibilities}
          onChange={handleRolesChange}
          fullWidth
          size="small"
        >
          <MenuItem value="Responsibility1">Responsibility 1</MenuItem>
          <MenuItem value="Responsibility2">Responsibility 2</MenuItem>
          <MenuItem value="Responsibility3">Responsibility 3</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default RolesTab;
