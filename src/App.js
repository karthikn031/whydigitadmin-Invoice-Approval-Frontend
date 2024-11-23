import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ConfirmationPage from "./components/ConfirmationPage";
import ListingPage from "./components/ListingPage";
import LoginPage from "./components/LoginPage";
import ApprovedList from "./components/ApprovedList";
import ListingTest from "./components/ListingTest";
import ApprovedTest from "./components/ApprovedTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/approvedlist" element={<ApprovedList />} />
        <Route path="/authenticate" element={<ConfirmationPage />} />
        <Route path="/ListingTest" element={<ListingTest />} />
        <Route path="/ApprovedTest" element={<ApprovedTest />} />
      </Routes>
    </Router>
  );
}

export default App;
