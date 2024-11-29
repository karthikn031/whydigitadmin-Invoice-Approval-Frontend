import { Grid, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const ResponsibilitiesTab = ({
  responsibilitiesData,
  handleResponsibilitiesChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField
          label="Name"
          name="name"
          value={responsibilitiesData.name}
          onChange={handleResponsibilitiesChange}
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          label="Screen"
          name="screen"
          value={responsibilitiesData.screen}
          onChange={handleResponsibilitiesChange}
          fullWidth
          size="small"
        >
          <MenuItem value="Screen1">Screen 1</MenuItem>
          <MenuItem value="Screen2">Screen 2</MenuItem>
          <MenuItem value="Screen3">Screen 3</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default ResponsibilitiesTab;
