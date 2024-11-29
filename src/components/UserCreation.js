import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Select,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  IconButton,
  TableContainer,
  Paper,
  Tooltip,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios"; // Import axios
import React, { useState } from "react";

export const UserCreation = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeCode: "",
    nickName: "",
    userType: "",
    email: "",
    active: true,
  });
  const [roles, setRoles] = useState([
    { role: "", startDate: "", endDate: "" },
  ]);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle role changes
  const handleRoleChange = (index, field, value) => {
    const updatedRoles = roles.map((role, i) =>
      i === index ? { ...role, [field]: value } : role
    );
    setRoles(updatedRoles);
  };

  // Add a new role row
  const handleAddRole = () => {
    setRoles([...roles, { role: "", startDate: "", endDate: "" }]);
  };

  // Remove a role row
  const handleDeleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  // Save user data
  const handleSave = async () => {
    // Basic validation
    if (!formData.employeeName || !formData.userType || !formData.mobile) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare payload
    const payload = {
      ...formData,
      roles,
    };

    try {
      // Example API call using axios
      const response = await axios.post("/api/users", payload);

      if (response.status === 200) {
        alert("User saved successfully!");
      } else {
        alert("Failed to save user.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error occurred while saving.");
    }
  };

  return (
    <Box
      sx={{ padding: 2, backgroundColor: "#F3F4F6", borderRadius: 2, mt: 8 }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h5">User Creation</Typography>
        <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 1,
        padding: 1,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Tooltip title="Search">
        <IconButton
          sx={{
            color: "#007bff",
            "&:hover": { backgroundColor: "#e3f2fd" },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Close">
        <IconButton
          sx={{
            color: "#dc3545",
            "&:hover": { backgroundColor: "#fdecea" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="View List">
        <IconButton
          sx={{
            color: "#28a745",
            "&:hover": { backgroundColor: "#e9f7ef" },
          }}
        >
          <ListAltIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Save">
        <IconButton
          onClick={handleSave}
          sx={{
            color: "#ffc107",
            "&:hover": { backgroundColor: "#fff8e1" },
          }}
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </Box>
      </Box>

      {/* Form */}
      <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, mb: 3 }}>
        <Grid container spacing={2}>
          {[
            { label: "Employee Name", name: "employeeName" },
            { label: "Employee Code", name: "employeeCode" },
            { label: "Nick Name", name: "nickName" },
            { label: "Email", name: "email" },
          ].map((field) => (
            <Grid item xs={3} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                size="small"
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={3}>
            <Select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              size="small"
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select User Type
              </MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={formData.active}
                onChange={(e) =>
                  setFormData({ ...formData, active: e.target.checked })
                }
              />
              <Typography>Active</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Tabs */}
      <Box sx={{ backgroundColor: "#fff", p: 2, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Tabs value={tabIndex} onChange={(_, index) => setTabIndex(index)}>
            <Tab label="Roles" />
            {/* <Tab label="Branch Accessible" /> */}
          </Tabs>
          {tabIndex === 0 && (
            <Button
              variant="outlined"
              onClick={handleAddRole}
              startIcon={<AddCircleOutlineIcon />}
            >
              Add Role
            </Button>
          )}
        </Box>

        {/* Roles */}
        {tabIndex === 0 && (
         <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
         <Table>
           {/* Table Header */}
           <TableHead>
             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
               <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Action</TableCell>
               <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Role</TableCell>
               <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Start Date</TableCell>
               <TableCell sx={{ fontWeight: "bold", color: "#333" }}>End Date</TableCell>
             </TableRow>
           </TableHead>
   
           {/* Table Body */}
           <TableBody>
             {roles.map((role, index) => (
               <TableRow
                 key={index}
                 sx={{
                   "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                   "&:hover": { backgroundColor: "#f0f8ff" },
                 }}
               >
                 {/* Action Cell */}
                 <TableCell>
                   <Tooltip title="Delete Role">
                     <IconButton
                       onClick={() => handleDeleteRole(index)}
                       sx={{ color: "#ff4d4d" }}
                     >
                       <DeleteIcon />
                     </IconButton>
                   </Tooltip>
                 </TableCell>
   
                 {/* Role Cell */}
                 <TableCell>
                   <Select
                     value={role.role}
                     onChange={(e) => handleRoleChange(index, "role", e.target.value)}
                     size="small"
                     fullWidth
                     displayEmpty
                     sx={{
                       backgroundColor: "#fff",
                       borderRadius: 1,
                       "& .MuiOutlinedInput-notchedOutline": {
                         borderColor: "#ddd",
                       },
                       "&:hover .MuiOutlinedInput-notchedOutline": {
                         borderColor: "#999",
                       },
                     }}
                   >
                     <MenuItem value="" disabled>
                       Select Role
                     </MenuItem>
                     <MenuItem value="Manager">Manager</MenuItem>
                     <MenuItem value="Developer">Developer</MenuItem>
                   </Select>
                 </TableCell>
   
                 {/* Start Date Cell */}
                 <TableCell>
                   <TextField
                     type="date"
                     size="small"
                     fullWidth
                     value={role.startDate}
                     onChange={(e) => handleRoleChange(index, "startDate", e.target.value)}
                     sx={{
                       backgroundColor: "#fff",
                       borderRadius: 1,
                       "& .MuiOutlinedInput-notchedOutline": {
                         borderColor: "#ddd",
                       },
                       "&:hover .MuiOutlinedInput-notchedOutline": {
                         borderColor: "#999",
                       },
                     }}
                   />
                 </TableCell>
   
                 {/* End Date Cell */}
                 <TableCell>
                   <TextField
                     type="date"
                     size="small"
                     fullWidth
                     value={role.endDate}
                     onChange={(e) => handleRoleChange(index, "endDate", e.target.value)}
                     sx={{
                       backgroundColor: "#fff",
                       borderRadius: 1,
                       "& .MuiOutlinedInput-notchedOutline": {
                         borderColor: "#ddd",
                       },
                       "&:hover .MuiOutlinedInput-notchedOutline": {
                         borderColor: "#999",
                       },
                     }}
                   />
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
        )}
      </Box>
    </Box>
  );
};
