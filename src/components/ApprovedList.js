import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Input, notification, Row, Space, Spin, Typography, ConfigProvider, DatePicker } from "antd";
import { LogoutOutlined, RightCircleOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import { getInvDetailsApprove1 } from "../services/api"; // mock API call
import NoDataFallback from "../utils/fallBack";
import approve from '../approve.png';
import approvedblack from '../approvedblack.jpg';
import './style.css';
import checkcircle from '../checkcircle.png';

const { Text } = Typography;

const ApprovedList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    name: "",
    amount: null,
    currency: "",
  });
  const [selectedItem, setSelectedItem] = useState(null); // Modal data
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
  const navigate = useNavigate();
  const { RangePicker } = DatePicker; // Destructure RangePicker

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getInvDetailsApprove1()
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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      startDate: dates ? dates[0] : null,
      endDate: dates ? dates[1] : null,
    }));
  };

  useEffect(() => {
    if (theme === "dark") {
      // document.body.style.backgroundColor = "#1c1c1c"; // Dark background for the entire page
      document.body.style.backgroundColor = "#5D576B"; // Dark background for the entire page
      
      document.body.style.color = "#fff"; // White text for dark mode
    } else {
      document.body.style.backgroundColor = "#fff"; // Light background for the body
      document.body.style.color = "#000"; // Black text for light mode
    }
  }, [theme]);

  const filteredData = data.filter(
    (item) =>
      (filter.name === "" || item.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.amount === null || item.amount.includes(filter.amount)) &&
      (filter.currency === "" || item.currency.toLowerCase().includes(filter.currency.toLowerCase())) &&
      (!filter.startDate || new Date(item.docDate) >= new Date(filter.startDate)) &&
      (!filter.endDate || new Date(item.docDate) <= new Date(filter.endDate))
  );

  const themeConfig = theme === "dark" ? {
    token: {
      // colorPrimary: '#1890ff',
      colorPrimary: '#5D576B',
      // colorBgBase: '#1c1c1c', 
      colorBgBase: '#5D576B',
      colorTextBase: '#fff',
      // colorTextBase: 'black',
      colorLink: '#40a9ff',
      

    }
  } : { };

  

  const boxShadowStyle = theme === "dark" ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.1)";
  // const cardBorderColor = theme === "dark" ? "white" : "#d9d9d9";
  const cardBorderColor = theme === "dark" ? "#444" : "#d9d9d9";

  return (

    <ConfigProvider theme={themeConfig}>
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
              boxShadow: boxShadowStyle,
              border: `1px solid ${cardBorderColor}`
              
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
                onClick={() => navigate("/listingTest")}
                size="small"
              >
                Listing Page
              </Button>
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
                  padding: "15px"
                }}
              >


                {/* <Text strong style={{ fontSize: '20px' }}>Approved Lists</Text> */}

                <p>Approved Lists</p>
                
                <div>
                  
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
              boxShadow: boxShadowStyle,
              border: `1px solid ${cardBorderColor}`,
               
              

              
            }}
          >
            {loading ? (
              <Spin tip="Loading..." />
            ) : (
              <Row gutter={[12, 12]}>
                {filteredData.map((item) => (
                  <Col xs={24} sm={12} md={8} key={item.expenceId}>
                     <div class="note-container" style={{backgroundColor: '#5D576B' }}>
                  <div class="sticky-note sticky-note-two" contenteditable="false" style={{ color: 'black'  }} >
                      {/* Improved alignment */}



                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' , color : 'black'
                        }}>
                          {/* <Text strong style={{ flex: 1 }}>Name:</Text> */}
                          <Text strong style={{ color : 'black'}}>{item.name}</Text>
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong style={{ flex: 1 , color : 'black'}}>Doc ID:</Text>
                          <Text  strong style={{ color : 'black'}}>{item.expenceId}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong style={{ flex: 1 , color : 'black'}}>Doc Date:</Text>
                          <Text strong style={{ color : 'black'}}>  {new Date(item.docDate).toLocaleDateString('en-GB')} </Text>
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
                          <Text strong style={{ flex: 1 , color : 'black'}}>Currency:</Text>
                          <Text strong style={{ color : 'black'}}>{item.currency}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong style={{ flex: 1 , color : 'black'}}>1st Approved On:</Text>
                          <Text strong style={{ color : 'black'}}>{new Date(item.approved1on).toLocaleDateString('en-GB')} </Text>
                        </div>
                        
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong style={{ flex: 1 , color : 'black'}}>2nd Approved On:</Text>
                            {item.approved2on && (
                            <Text strong style={{ color : 'black'}}>{new Date(item.approved2on).toLocaleDateString('en-GB')}  </Text>
                          )}
                          </div>

                        
                        <Space style={{ float: "right", marginTop: "10px" }}>
                          {theme === "light" ? (
                          <img src={checkcircle} style={{ width: "70px" }} alt="approved" />
                          ) : (
                            <img src={checkcircle} style={{ width: "70px" }} alt="approved" />
                          )}
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

      
    </div>

    
  </ConfigProvider>
               
              
        


      

    
  );
};

export default ApprovedList;
