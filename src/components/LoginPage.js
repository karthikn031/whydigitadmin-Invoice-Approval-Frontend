import { Alert, Button, Card, Input, Space, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptPassword } from "../utils/passEnc";

const { Text } = Typography;
const API_URL = process.env.REACT_APP_API_URL || "http://192.168.68.101:8091";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle passcode visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleChange = (value, index) => {
    const newPasscode = [...passcode];
    if (/^\d*$/.test(value)) {
      newPasscode[index] = value;
      setPasscode(newPasscode);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newPasscode = [...passcode];
      if (passcode[index]) {
        newPasscode[index] = "";
        setPasscode(newPasscode);
      } else if (index > 0) {
        newPasscode[index - 1] = "";
        setPasscode(newPasscode);
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    if (!username) {
      setError("Username is required");
      return;
    }

    if (passcode.join("").length !== 6) {
      setError("Passcode must be exactly 6 digits");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        userName: username,
        password: encryptPassword(passcode.join("")),
      });

      if (response.data.status === true) {
        setSuccess(
          response.data.paramObjectsMap?.message || "Successfully logged in"
        );

        const token = response.data.paramObjectsMap?.userVO?.token;
        localStorage.setItem("authToken", token);

        const userName = response.data.paramObjectsMap?.userVO?.userName;
        localStorage.setItem("userName", userName);

        const userType = response.data.paramObjectsMap?.userVO?.userType;
        localStorage.setItem("userType", userType);

        navigate("/listing");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.paramObjectsMap?.errorMessage ||
        error.response?.data?.message ||
        "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
        // background:
        //   "linear-gradient(90deg, rgba(18, 94, 227, 1) 0%, rgba(50, 154, 255, 1) 100%)",
        fontFamily: "Arial, sans-serif",
        background: "#f1f1f1",
      }}
    >
      {(error || success) && (
        <div
          style={{
            position: "absolute",
            top: 30,
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {error && <Alert message={error} type="error" showIcon />}
          {success && <Alert message={success} type="success" showIcon />}
        </div>
      )}

      <Card
        title={
          <Text
            strong
            style={{ fontSize: 28, textAlign: "center", color: "#000000" }}
          >
            Welcome Back!
          </Text>
        }
        style={{
          borderRadius: 12,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          padding: "25px",
          width: "100%",
          maxWidth: 400,
          background: "#fff",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Text
            style={{ fontSize: 16, textAlign: "center", marginBottom: "15px" }}
          >
            Enter Username
          </Text>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={{
              padding: "10px",
              fontSize: 16,
              borderRadius: 8,
              border: "1px solid #d9d9d9",
              marginBottom: "15px",
            }}
          />

          <Text
            style={{ fontSize: 16, textAlign: "center", marginBottom: "15px" }}
          >
            Enter 6-Digit Passcode
          </Text>
          <Space size="middle" style={{ justifyContent: "center" }}>
            {passcode.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid #d9d9d9",
                }}
              />
            ))}
          </Space>

          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            onClick={handleSubmit}
            style={{
              backgroundColor: "#4c6ef5",
              borderColor: "#4c6ef5",
              marginTop: "20px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
