import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8091";

export const getListingData = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/InvoiceApproval/getPendingDetails?userType=${localStorage.getItem(
        "userType"
      )}&userName=${localStorage.getItem("userName")}`
    ); // Replace `/your-api-endpoint` with the actual endpoint path
    if (
      response.data.status &&
      response.data.paramObjectsMap?.pendingApprovalDetails
    ) {
      return response.data.paramObjectsMap.pendingApprovalDetails.map(
        (item) => ({
          expenceId: item.docId,
          name: item.partyName,
          amount: item.totalInvAmtLc,
          currency: "INR", // Assuming it's always INR; adjust if needed.
          docId: item.docId,
          docDate: item.docDate,
          creditDays: item.creditDays,
          creditLimit: item.creditLimit,
          outStanding: item.outStanding,
          id: item.gstInvoiceHdrId,
        })
      );
    } else {
      throw new Error("Data not found or API error");
    }
  } catch (error) {
    console.error("Error fetching listing data:", error);
    throw error;
  }
};

export const getInvDetailsApprove1 = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/InvoiceApproval/getInvDetailsApprove1?userType=${localStorage.getItem(
        "userType"
      )}&userName=${localStorage.getItem("userName")}`
    ); // Replace `/your-api-endpoint` with the actual endpoint path
    if (
      response.data.status &&
      response.data.paramObjectsMap?.approvedApprovalDetails1
    ) {
      return response.data.paramObjectsMap.approvedApprovalDetails1.map(
        (item) => ({
          expenceId: item.docId,
          name: item.partyName,
          amount: item.totalInvAmtLc,
          currency: "INR", // Assuming it's always INR; adjust if needed.
          docId: item.docId,
          docDate: item.docDate,
          creditDays: item.creditDays,
          creditLimit: item.creditLimit,
          outStanding: item.outStanding,
          id: item.gstInvoiceHdrId,
          approved1on: item.approve1on,
          approved2on: item.approve2on,
        })
      );
    } else {
      throw new Error("Data not found or API error");
    }
  } catch (error) {
    console.error("Error fetching listing data:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    // Corrected the endpoint URL and closing braces issue
    const response = await axios.get(`${API_URL}/api/auth/allUsers`);

    // Ensure that the response contains the expected structure
    if (response.data && response.data.paramObjectsMap?.userVO) {
      return response.data.paramObjectsMap.userVO.map((item) => ({
        id: item.id,
        userName: item.userName,
        nickName: item.nickName,
        email: item.email,
      }));
    } else {
      throw new Error("Data not found or API error");
    }
  } catch (error) {
    console.error("Error fetching listing data:", error);
    throw error; // Re-throw error to propagate it to the caller
  }
};

export const getAllActiveUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/allUsers`);

    // Ensure that the response contains the expected structure
    if (response.data && response.data.paramObjectsMap?.userVO) {
      // Filter the users by active status
      const activeUsers = response.data.paramObjectsMap.userVO.filter(
        (item) => item.active === "Active"
      );

      // Map the filtered users to the required format
      return activeUsers.map((item) => ({
        id: item.id,
        userName: item.userName,
        nickName: item.nickName,
        email: item.email,
      }));
    } else {
      throw new Error("Data not found or API error");
    }
  } catch (error) {
    console.error("Error fetching listing data:", error);
    throw error; // Re-throw error to propagate it to the caller
  }
};

export const getAllScreens = async () => {
  try {
    // Corrected the endpoint URL and closing braces issue
    const response = await axios.get(`${API_URL}/api/auth/getAllScreenNames`);

    // Ensure that the response contains the expected structure
    if (response.data && response.data.paramObjectsMap?.screenNamesVO) {
      return response.data.paramObjectsMap.screenNamesVO.map((item) => ({
        id: item.id,
        screenName: item.screenName,
        screenCode: item.screenCode,
        active: item.active,
      }));
    } else {
      throw new Error("Data not found or API error");
    }
  } catch (error) {
    console.error("Error fetching Screen List:", error);
    throw error; // Re-throw error to propagate it to the caller
  }
};

export const getAllRoles = async () => {
  try {
    // Corrected the endpoint URL and closing braces issue
    const response = await axios.get(`${API_URL}/api/auth/allActiveRoles`);

    // Ensure that the response contains the expected structure
    if (response.data && response.data.paramObjectsMap?.rolesVO) {
      return response.data.paramObjectsMap.rolesVO.map((item) => ({
        id: item.id,
        role: item.role,
      }));
    } else {
      throw new Error("Data not found or API error");
    }
  } catch (error) {
    console.error("Error fetching Roles List:", error);
    throw error; // Re-throw error to propagate it to the caller
  }
};

export const getAllResponsiblities = async () => {
  try {
    // Corrected the endpoint URL and closing braces issue
    const response = await axios.get(`${API_URL}/api/auth/allResponsibility`);

    // Ensure that the response contains the expected structure
    if (response.data && response.data.paramObjectsMap?.responsibilityVO) {
      return response.data.paramObjectsMap.responsibilityVO.map((item) => ({
        id: item.id,
        responsibility: item.responsibility,
      }));
    } else {
      throw new Error("Data not found or API error");
    }
  } catch (error) {
    console.error("Error fetching Responsibilities List:", error);
    throw error; // Re-throw error to propagate it to the caller
  }
};
