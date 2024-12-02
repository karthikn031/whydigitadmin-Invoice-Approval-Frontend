import {
  Checkbox,
  FormControlLabel,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

const ResponsibilitiesTab = ({
  responsibilitiesData,
  handleResponsibilitiesChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField
          label="responsibility"
          name="responsibility"
          value={responsibilitiesData.responsibility}
          onChange={handleResponsibilitiesChange}
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          label="Screen"
          name="screenName"
          value={responsibilitiesData.screenName || []} // Ensure this is an array
          onChange={handleResponsibilitiesChange}
          fullWidth
          size="small"
          multiple // Enables multi-select
          renderValue={(selected) => selected.join(", ")} // Displays selected values as a comma-separated string
        >
          {["Screen1", "Screen2", "Screen3"].map((screenName) => (
            <MenuItem key={screenName} value={screenName}>
              <Checkbox
                checked={responsibilitiesData.screenName?.includes(screenName)}
              />
              <ListItemText primary={screenName} />
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={3}>
        <FormControlLabel
          control={
            <Checkbox
              name="active"
              checked={responsibilitiesData.active || false} // Ensure this is a boolean
              onChange={handleResponsibilitiesChange}
              size="small"
            />
          }
          label="Active"
        />
      </Grid>
    </Grid>
  );
};

export default ResponsibilitiesTab;
