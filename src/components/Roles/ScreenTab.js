import { Grid, TextField } from "@mui/material";
import React from "react";

const ScreenTab = ({ screenData, handleScreenChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField
          label="Screen Code"
          name="screenCode"
          value={screenData.screenCode}
          onChange={handleScreenChange}
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Screen Name"
          name="screenName"
          value={screenData.screenName}
          onChange={handleScreenChange}
          fullWidth
          size="small"
        />
      </Grid>
    </Grid>
  );
};

export default ScreenTab;
