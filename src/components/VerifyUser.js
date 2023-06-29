import React, { useEffect, useState } from "react";
import { Card, Container, Alert, Button, Col } from "react-bootstrap";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";
import "./VerifyUser.css"; // Import the custom CSS file

const VerifyUser = () => {
  const [verificationStatus, setVerificationStatus] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const [response, setResponse] = useState({});
  const location = useLocation();

  useEffect(() => {
    // Extract the token from the URL
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    setToken(token);

    // Verify the token on the backend
    token && verifyToken(token);
  }, []);

  const decodeAccessToken = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      return decodedToken;
    } catch (error) {
      console.log("Failed to decode JWT:", error.message);
    }
    return;
  };

  const verifyToken = async (token) => {
    try {
      // Send the token to the backend for verification
      const response = await axios.post("/user/verify/register/", { token });

      setResponse(response);
      setVerificationStatus("success");
      setMessage(response?.data?.message);
    } catch (err) {
      setVerificationStatus("error");
      if (!err?.response) {
        setMessage("No Server Response");
      } else {
        setResponse(err?.response);
        setMessage(err.response?.data?.message);
      }
    }
  };

  const resendVerification = async () => {
    try {
      // Send the token to the backend for verification
      const decodedToken = decodeAccessToken(token);
      if (decodedToken?.email) {
        const response = await axios.post("/user/resend/register/", {
          email: decodedToken.email,
        });
        setAlertStatus("success");
        setAlertMessage(response?.data?.message);
      }
    } catch (err) {
      setAlertStatus("error");
      if (!err?.response) {
        setAlertMessage("No Server Response");
      } else {
        setAlertMessage(err.response?.data?.message);
      }
    }
  };

  return (
    <Container className="verify-user-container" fluid>
      <Col sm={12} md={8} lg={6} xl={4}>
        <span className="logo form-header mb-2">
          <RiShoppingCartLine size={48} /> ShopSurfer
        </span>
        <Card className="verify-card">
          <Card.Body>
            <div className="icon-container">
              {verificationStatus === "success" ? (
                <FaCheckCircle size={64} className="success-icon" />
              ) : (
                <BsExclamationCircleFill size={64} className="danger-icon" />
              )}
            </div>
            <div className="message-container">
              {verificationStatus === "success" ? (
                <span className="success">{message}</span>
              ) : (
                <span className="error">{message}</span>
              )}
            </div>
            <div className="button-container mb-0">
              {[200, 409].includes(response?.status) ? (
                <Button
                  variant="primary"
                  className="w-100"
                  as={Link}
                  to="/login"
                >
                  Sign In
                </Button>
              ) : response?.status === 401 ? (
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={resendVerification}
                >
                  Resend Verification Link
                </Button>
              ) : (
                [400, 404].includes(response?.status) && (
                  <Button
                    variant="primary"
                    className="w-100"
                    as={Link}
                    to="/register"
                  >
                    Sign Up
                  </Button>
                )
              )}
            </div>
          </Card.Body>
        </Card>
        <Alert
          variant={alertStatus === "error" ? "danger" : "success"}
          className={alertMessage ? "alert-message mt-4" : "offscreen"}
          role="alert"
        >
          {alertMessage}
        </Alert>
      </Col>
    </Container>
  );
};

export default VerifyUser;