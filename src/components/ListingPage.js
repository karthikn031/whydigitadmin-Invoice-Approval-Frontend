import { LogoutOutlined, RightCircleOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
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
  ConfigProvider,
  Switch,DatePicker
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListingData } from "../services/api"; // mock API call
import EmailConfig from "../utils/emailConfig";
import NoDataFallback from "../utils/fallBack";
import './style.css';
import './date.css';

import confetti from 'canvas-confetti';


const { Option } = Select;
const { Text } = Typography;
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8091";

const ListingPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailFlag, setEmailFlag] = useState(false);
  const [emailData, setEmailData] = useState([]);
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [filter, setFilter] = useState({
    name: "",
    amount: null,
    currency: "",
  });
  const [selectedItem, setSelectedItem] = useState(null); // Modal data
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const { RangePicker } = DatePicker; // Destructure RangePicker

  
  const loginemail = localStorage.getItem("email");


  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  // Determine the greeting based on the time of day


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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      // document.body.style.backgroundColor = "#1c1c1c"; // Dark background for the entire page
      document.body.style.backgroundColor = "#5D576B";
      document.body.style.color = "#fff"; // White text for dark mode
    } else {
      document.body.style.backgroundColor = "#fff"; // Light background for the body
      document.body.style.color = "#000"; // Black text for light mode
    }
  }, [theme]);

  // const themeConfig = theme === "dark" ? {
  //   token: {
  //     colorPrimary: '#1890ff', // Adjust as needed for dark mode
  //     colorBgBase: '#1c1c1c', // Dark background
  //     colorTextBase: '#fff', // White text for dark mode
  //     colorLink: '#40a9ff', // Link color for dark mode
  //   }
  // } : {};

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

        notification.success({
          message: `Invoice ${item.id} Approved`,
          description: `You have successfully approved the Invoice ${item.id}.`,
        });
        setEmailData([item]);
        {
          response.data.paramObjectsMap.gstInvoiceHdrVO.approveEmail === "T" &&
          response.data.paramObjectsMap.gstInvoiceHdrVO.approve2 === "T"
            ? setEmailFlag(true)
            : setEmailFlag(false);
        }
        fetchData();
        setIsModalOpen(false);
        
      } else {
        notification.error({
          message: `Item ${item.id} failed`,
        });
      }
    } catch (error) {
      console.log("Error Response:", error.response?.data);
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

        notification.error({
          message: `Item ${item.id} Rejected`,
          description: `You have rejected item ${item.id}.`,
        });
        fetchData();
        setIsModalOpen(false);
      } else {
        notification.error({
          message: `Item ${item.id} failed`,
        });
      }
    } catch (error) {
      console.log("Error Response:", error.response?.data);
      const errorMessage =
        error.response?.data?.paramObjectsMap?.errorMessage ||
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
    }
  };

  const handleLogout = () => {
    navigate("/"); // Navigate to login or home page
  };

  const approvedList = () => {
    navigate("/ApprovedTest"); // Navigate to the approved list page
  };

  const colortheme=() =>
    {
      navigate("/Listing");
    }

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

  const handleDateRangeChange = (dates, dateStrings) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      startDate: dates ? dates[0] : null,
      endDate: dates ? dates[1] : null,
    }));

    
  };

 // Filter the data by date range, name, amount, and currency
 const filteredData = data.filter(
  (item) =>
    (filter.name === "" || item.name.toLowerCase().includes(filter.name.toLowerCase())) &&
    (filter.amount === null || item.amount.includes(filter.amount)) &&
    (filter.currency === "" || item.currency.toLowerCase().includes(filter.currency.toLowerCase())) &&
    // Date filter logic
    (!filter.startDate || new Date(item.docDate) >= new Date(filter.startDate)) &&
    (!filter.endDate || new Date(item.docDate) <= new Date(filter.endDate))
);

  const themeConfig = theme === "dark" ? {
    token: {
      // colorPrimary: '#1890ff', // Adjust as needed for dark mode
      colorPrimary: '#5D576B',
      // colorBgBase: '#1c1c1c', // Dark background
      colorBgBase: '#5D576B',
      colorTextBase: '#fff', // White text for dark mode
      // colorTextBase: 'black',
      colorLink: '#40a9ff', // Link color for dark mode
    }
  } : {};
  // Define styles based on dark mode
  const boxShadowStyle = theme === "dark" ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.1)";
  // const cardBorderColor = theme === "dark" ? "white" : "#d9d9d9"; // White border in dark mode


// Dynamic border color based on theme
const cardBorderColor = theme === "dark" ? "#444" : "#d9d9d9";
const inputBorderColor = theme === "dark" ? "#666" : "#d9d9d9";

const toInitCap = (str) => {
  return str
    .split('.')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('.');
};



  const handleCelebrate = () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Button animation
    const button = document.getElementById('celebrateBtn');
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 100);
    }
  }

  const [time, setTime] = useState('');
  const [date, setDate] = useState({
    day: '',
    dayNum: '',
    month: '',
    year: ''
  });

  // Function to show time
  const showTime = () => {
    let time = new Date();
    setTime(time.toLocaleTimeString("en-US", { hour12: false }));
  };

  const updateDate = () => {
    let today = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const dayWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
      "Friday", "Saturday"
    ];

    setDate({
      day: dayWeek[today.getDay()],
      dayNum: today.getDate(),
      month: months[today.getMonth()],
      year: today.getFullYear()
    });
  };

  // Use useEffect to update time and date on mount and every second
  useEffect(() => {
    showTime(); // Set initial time
    updateDate(); // Set initial date

    // Set interval to update time every second
    const timeInterval = setInterval(showTime, 1000);

    // Clean up interval when the component unmounts
    return () => clearInterval(timeInterval);
  }, []);

  

  return (
    <ConfigProvider theme={themeConfig}> {/* Wrap entire component with ConfigProvider */}
      <div style={{ padding: "20px" }}>
        {/* Toggle Dark/Light Mode */}
        <Row gutter={[16, 16]}>
          {/* Filter Section */}
          <Col xs={24} sm={8} md={6} lg={5}>
            <Card
              title="Filters"
              bordered={false}
              size="small"
              style={{
                borderRadius: "8px",
                boxShadow: boxShadowStyle, // Apply custom box shadow
                border: `1px solid ${cardBorderColor}`, // Apply the border color here
                color: "white",
                

                
                // textalign: "center",
                // padding: "40px",
                // // background: "skyblue",
                // color: "#fff",
                // borderradius: "8px",
                // boxshadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                // color: "#000", 
                // fontWeight: "bold"
              }}
              
            >
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <Input
                  name="name"
                  value={filter.name}
                  onChange={handleFilterChange}
                  placeholder="Filter by Name"
                 
                />
                <Input
                  name="amount"
                  value={filter.amount}
                  onChange={handleFilterChange}
                  placeholder="Filter by Amount"
                  type="number"
                />
               <RangePicker
                  value={[filter.startDate, filter.endDate]} 
                  onChange={handleDateRangeChange} 
                  format="YYYY-MM-DD"
                  placeholder={['Start Date', 'End Date']}
                />
                <Button
                  type="text"
                  icon={<RightCircleOutlined />}
                  onClick={approvedList}
                  size="small"
                >
                  Approved List
                </Button>

                
                <Button
                  type="text"
                  icon={<RightCircleOutlined />}
                  onClick={colortheme}
                  size="small"
                >
                  ThemeExit
                </Button>
              </Space>
            </Card>

<br/>
            <Card
              // title="Filters"
              bordered={false}
              size="small"
              style={{
                borderRadius: "8px",
                boxShadow: boxShadowStyle, // Apply custom box shadow
                border: `1px solid ${cardBorderColor}`, // Apply the border color here
                  //  textalign: "center",
                   padding: "40px",
                   // background: "skyblue",
                   color: "#fff",
                   boxshadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                   color: "#000", 
                   fontWeight: "bold",
                   background: "white",
                  //  fontSize:"10px"
                // color: "white",
                // background: "skyblue"
              }}
              
            >
                {/* <div>{getGreeting()}!!!  Mr. {toInitCap(loginemail.split('@')[0])} </div> <br/> */}
                <br/>
      <div className="cont">
        <div id="clockface" className="shadow">{date.day},</div>
        <div id="clockface">{date.dayNum}  {date.month} {date.year} </div>
      <div id="clockface" >{time}</div>
      </div> 

      
      
    
    

          
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

                    // textalign: "center",
                    //       padding: "40px",
                    //       // background: "linear-gradient(135deg, rgba(255, 0, 255, 1), rgba(0, 255, 255, 1))",
                    //       // background: "skyblue",
                    //       color: "#fff",
                    //       borderradius: "8px",
                    //       boxshadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
                 
                  }}
                >
                  
                  {/* <Text strong style={{ fontSize: '20px' }}>
                    Invoice Requests
                  </Text> */}

<p>Invoice Requests</p>



{/* <p class="line anim-typewriter" contenteditable="false" style={{
        fontFamily: "'Arial', sans-serif", // Change font here
        // color: "#4A90E2", // Change font color here
        fontSize: "24px", // You can adjust font size as well
         
  /* Prevent selection (simulating read-only behavior) */
  

  /* Optional: Make it look more 'read-only' by changing cursor 
  cursor: "not-allowed",
      }} >{getGreeting()}!!!  Mr. {toInitCap(loginemail.split('@')[0])}</p>  */}




<div>




                  {/* <h3 style={{ display: 'inline'  , color: '#ff5733'}}>Hi  {getGreeting()}!!!  </h3>
                  <h2 style={{ display: 'inline' , color: '#4CAF50'}}>Mr. {toInitCap(loginemail.split('@')[0])}</h2> */}

                    <Button
                      type="text"
                      icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
                      onClick={toggleTheme}
                      size="small"
                      style={{ marginLeft: "10px" }}
                    >
                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </Button>

                       <Button
                      type="text"
                      icon={<LogoutOutlined />}
                      onClick={handleLogout}
                      size="small"
                      
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              }
              bordered={false}
              size="small"
              style={{
                borderRadius: "8px",
                boxShadow: boxShadowStyle, // Apply custom box shadow
                border: `1px solid ${cardBorderColor}`, // Apply conditional border color
                
              
              }}

              
            >
      
              {loading ? (
                <Spin tip="Loading..." />
              ) : (
                <Row gutter={[12, 12]}>
                  {filteredData.map((item) => (
                    <Col xs={24} sm={12} md={8} key={item.expenceId}>
                      
                        
                        <div class="note-container">
                        <div class="sticky-note sticky-note-one" contenteditable="false" style={{ color: 'black',colorTextBase : 'black' }}
                        onClick={() => handleCardClick(item)} >

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text strong  style={{ color : 'black'}}>{item.name}</Text>
                        </div>
                        <br />
                        
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Text strong style={{ flex: 1 , color : 'black' }}>Doc ID:</Text>
                            <Text strong style={{ color : 'black'}}>{item.expenceId}</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong style={{ flex: 1 , color : 'black' }}>Doc Date:</Text>
                            <Text strong style={{ color : 'black'}}>{new Date(item.docDate).toLocaleDateString('en-GB')} </Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong style={{ flex: 1 , color : 'black'}}>Amount:</Text>
                            <Text strong style={{ color : 'black'}}>
                              {new Intl.NumberFormat("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(item.amount)}
                            </Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong style={{ flex: 1, color : 'black' }}>Currency:</Text>
                            <Text strong style={{ color : 'black'}}>{item.currency}</Text>
                          </div>

                        <br />
                        {/* Approve/Reject Buttons on Card */}
                        <Space style={{ marginTop: "10px" }}>
                          <Button id="celebrateBtn"
                            type="default"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(item);
                              handleCelebrate();
                            }}
                            size="small"
                            style={{
                              borderColor: "green",
                              color: "green",
                              backgroundColor: "transparent",

                              cursor: "pointer",
                              transition: "transform 0.1s ease",
                              
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
                            style={{
                              
                              backgroundColor: "transparent",
                            }}
                          >
                            Reject
                          </Button>
                          
                        </Space>
                        </div>
                      </div>
                      </div>
                    </Col>
                  ))}
                </Row>
                
              )}

              {filteredData.length === 0 && <NoDataFallback onRetry={fetchData} />}
            </Card>
          </Col>
        </Row>

        {/* Modal for Item Details */}
        <Modal
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          {selectedItem && (
            <div>
              <Descriptions
                bordered
                column={1}
                size="small"
                layout="horizontal"
                labelStyle={{ fontWeight: "bold", padding: "4px 8px" }}
                contentStyle={{ padding: "4px 8px" }}
              >
                <Descriptions.Item label="Name">{selectedItem.name}</Descriptions.Item>
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

              <Space
                style={{
                  marginTop: "10px",
                  justifyContent: "center",
                  width: "100%",
                  
                }}
              >
                <Button
                  type="default"
                  size="small"
                  style={{
                    borderColor: "green",
                    color: "green",
                    backgroundColor: "white",
                    
                  }}
                  onClick={() => handleApprove(selectedItem) }
                >
                  Approve
                </Button>
                <Button
                  type="default"
                  danger
                  size="small"
                  style={{
                    
                    backgroundColor: "white",
                    
                  }}
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
            toEmail={"Jayabalan.guru@uniworld-logistics.com"}
            data={emailData}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default ListingPage;
