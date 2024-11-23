import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8091";

export const getListingData = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/InvoiceApproval/getPendingDetails?userType=${localStorage.getItem("userType")}`
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
      `${API_URL}/api/InvoiceApproval/getInvDetailsApprove1?userType=${localStorage.getItem("userType")}`
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
          approved1on : item.approve1on,
          approved2on : item.approve2on
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
