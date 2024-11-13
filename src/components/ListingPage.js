import { LogoutOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListingData } from "../services/api"; // mock API call
import EmailConfig from "../utils/emailConfig";
import NoDataFallback from "../utils/fallBack";

const { Option } = Select;
const { Text } = Typography;
const API_URL = process.env.REACT_APP_API_URL || "http://192.168.68.101:8091";

const ListingPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailFlag, setEmailFlag] = useState(false);
  const [emailData, setEmailData] = useState([]);
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  const [filter, setFilter] = useState({
    name: "",
    amount: null,
    currency: "",
  });
  const [selectedItem, setSelectedItem] = useState(null); // Modal data
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getListingData()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        notification.error({
          message: "Data Fetch Error",
          description: "Failed to fetch data for the listing.",
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getListingData()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch(() => {
        notification.error({
          message: "Data Fetch Error",
          description: "Failed to fetch updated data for the listing.",
        });
        setLoading(false);
      });
  };

  // const handleApprove = (expenceId) => {
  //   // Play success sound
  //   const audio = new Audio("/success.wav"); // Replace with your sound file path
  //   audio.play();

  //   // Display success notification
  //   notification.success({
  //     message: `Item ${expenceId} Approved`,
  //     description: `You have successfully approved item ${expenceId}.`,
  //   });

  //   setIsModalOpen(false);
  // };

  const handleApprove = async (item) => {
    setEmailFlag(false);
    try {
      const response = await axios.put(
        `${API_URL}/api/InvoiceApproval/approval1?approval=${"1"}&createdby=${localStorage.getItem(
          "userName"
        )}&id=${parseInt(item.id)}&userType=${localStorage.getItem("userType")}`
      );

      if (response.data.status === true) {
        const audio = new Audio("/success.wav"); // Replace with your sound file path
        audio.play();

        // Display success notification
        notification.success({
          message: `Item ${item.id} Approved`,
          description: `You have successfully approved item ${item.id}.`,
        });
        setEmailData([item]);
        {
          response.data.paramObjectsMap.gstInvoiceHdrVO.approveEmail === "T"
            ? setEmailFlag(true)
            : setEmailFlag(false);
        }
        fetchData();

        setIsModalOpen(false);
        // Navigate to listing after success
      } else {
        notification.error({
          message: `Item ${item.id} failed`,
          // description: `You have successfully approved item ${expenceId}.`,
        });
      }
    } catch (error) {
      console.log("Error Response:", error.response?.data);

      // Check multiple paths for error message
      const errorMessage =
        error.response?.data?.paramObjectsMap?.errorMessage ||
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
    }
  };

  const handleReject = async (item) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/InvoiceApproval/approval1?approval=${"0"}&createdby=${localStorage.getItem(
          "userName"
        )}&id=${parseInt(item.id)}&userType=${localStorage.getItem("userType")}`
      );

      if (response.data.status === true) {
        const audio = new Audio("/success.wav"); // Replace with your sound file path
        audio.play();

        // Display success notification
        notification.error({
          message: `Item ${item.id} Rejected`,
          description: `You have rejected item ${item.id}.`,
        });
        fetchData();
        setIsModalOpen(false);
        // Navigate to listing after success
      } else {
        notification.error({
          message: `Item ${item.id} failed`,
          // description: `You have successfully approved item ${expenceId}.`,
        });
      }
    } catch (error) {
      console.log("Error Response:", error.response?.data);

      // Check multiple paths for error message
      const errorMessage =
        error.response?.data?.paramObjectsMap?.errorMessage ||
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
    }
  };

  // const handleReject = (expenceId) => {
  //   const audio = new Audio("/success.wav"); // Replace with your sound file path
  //   audio.play();

  //   notification.error({
  //     message: `Item ${expenceId} Rejected`,
  //     description: `You have rejected item ${expenceId}.`,
  //   });
  //   setIsModalOpen(false);
  // };

  const handleLogout = () => {
    navigate("/");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const filteredData = data.filter(
    (item) =>
      (filter.name === "" ||
        item.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.amount === null || item.amount === filter.amount) &&
      (filter.currency === "" ||
        item.currency.toLowerCase().includes(filter.currency.toLowerCase()))
  );

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Filter Section */}
        <Col xs={24} sm={8} md={6} lg={5}>
          <Card
            title="Filters"
            bordered={false}
            size="small"
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Input
                name="name"
                value={filter.name}
                onChange={handleFilterChange}
                placeholder="Filter by Name"
                // size="small"
              />
              <Input
                name="amount"
                value={filter.amount}
                onChange={handleFilterChange}
                placeholder="Filter by Amount"
                type="number"
                // size="small"
              />
              <Select
                name="currency"
                value={filter.currency}
                onChange={(value) =>
                  setFilter((prev) => ({ ...prev, currency: value }))
                }
                placeholder="Filter by Currency"
                // size="small"
                style={{ width: "100%" }}
              >
                <Option value="">Select Currency</Option>
                <Option value="INR">INR</Option>
                <Option value="USD">USD</Option>
                <Option value="EURO">EURO</Option>
              </Select>

              {/* Added Checkboxes */}
              <Space direction="vertical" style={{ marginTop: "10px" }}>
                <Checkbox
                  checked={filter.approved}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      approved: e.target.checked,
                    }))
                  }
                >
                  Approved
                </Checkbox>
                <Checkbox
                  checked={filter.pending}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      pending: e.target.checked,
                    }))
                  }
                >
                  Pending
                </Checkbox>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* Listing Section */}
        <Col xs={24} sm={16} md={18} lg={19}>
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <Text strong>Invoice Requests</Text>
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  size="small"
                >
                  Logout
                </Button>
              </div>
            }
            bordered={false}
            size="small"
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {loading ? (
              <Spin tip="Loading..." />
            ) : (
              <Row gutter={[12, 12]}>
                {filteredData.map((item) => (
                  <Col xs={24} sm={12} md={8} key={item.expenceId}>
                    <Card
                      hoverable
                      size="small"
                      style={{
                        borderRadius: "8px",
                        padding: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                      bodyStyle={{ padding: "10px" }}
                      onClick={() => handleCardClick(item)}
                    >
                      <Text strong>{item.name}</Text>
                      <br />
                      <Text type="secondary">Doc ID: {item.expenceId}</Text>
                      <br />
                      <Text type="secondary">Doc Date: {item.docDate}</Text>
                      <br />
                      <Text type="secondary">
                        Amount:{" "}
                        {new Intl.NumberFormat("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(item.amount)}
                      </Text>

                      <br />
                      <Text type="secondary">Currency: {item.currency}</Text>
                      <br />
                      {/* Approve/Reject Buttons on Card */}
                      <Space style={{ marginTop: "10px" }}>
                        <Button
                          type="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(item);
                          }}
                          size="small"
                          style={{
                            borderColor: "green",
                            color: "green",
                          }}
                        >
                          Approve
                        </Button>

                        <Button
                          type="default"
                          danger
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(item);
                          }}
                          size="small"
                        >
                          Reject
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {filteredData.length === 0 && (
              <NoDataFallback onRetry={fetchData} />
            )}
          </Card>
        </Col>
      </Row>

      {/* Modal for Item Details */}
      <Modal
        title="Item Details"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedItem && (
          <div>
            <Descriptions
              bordered
              column={1}
              size="small" // Reduce overall size
              layout="horizontal"
              labelStyle={{ fontWeight: "bold", padding: "4px 8px" }} // Reduced padding for labels
              contentStyle={{ padding: "4px 8px" }} // Reduced padding for content
            >
              <Descriptions.Item label="Name">
                {selectedItem.name}
              </Descriptions.Item>
              <Descriptions.Item label="Doc ID">
                {selectedItem.expenceId}
              </Descriptions.Item>
              <Descriptions.Item label="Doc Date">
                {selectedItem.docDate}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(selectedItem.amount)}
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                {selectedItem.currency}
              </Descriptions.Item>
              <Descriptions.Item label="Credit Days">
                {selectedItem.creditDays}
              </Descriptions.Item>
              <Descriptions.Item label="Credit Limit">
                {selectedItem.creditLimit}
              </Descriptions.Item>
              <Descriptions.Item label="Outstanding">
                {selectedItem.outStanding}
              </Descriptions.Item>
            </Descriptions>

            {/* Approve/Reject Buttons */}
            <Space
              style={{
                marginTop: "10px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                type="default"
                style={{
                  borderColor: "green",
                  color: "green",
                }}
                size="small"
                onClick={() => handleApprove(selectedItem)}
              >
                Approve
              </Button>
              <Button
                type="default"
                danger
                size="small"
                onClick={() => handleReject(selectedItem)}
              >
                Reject
              </Button>
            </Space>
          </div>
        )}
      </Modal>
      {emailFlag && (
        <EmailConfig
          updatedEmployee={"Admin"}
          toEmail={"karthikeyan@whydigit.in"}
          data={emailData}
          // message={message}
          // title={ticketResponse.title}
          // description={ticketResponse.description}
          // priority={ticketResponse.priority}
        />
      )}
    </div>
  );
};

export default ListingPage;
