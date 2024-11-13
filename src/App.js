import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ConfirmationPage from "./components/ConfirmationPage";
import ListingPage from "./components/ListingPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/authenticate" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
