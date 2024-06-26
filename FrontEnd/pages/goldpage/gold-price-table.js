import React, { useState, useEffect } from "react";
import axios from "axios";

const GoldPriceTable = (props) => {
  const { setGoldType, goldType } = props;
  const [goldPrice, setGoldPrice] = useState(null);
  const [error, setError] = useState(null);
  const [goldApiToken, setGoldApiToken] = useState("");
  const [newToken, setNewToken] = useState("");
  useEffect(() => {
    const getNewToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const newToken = await axios.post(
            "https://four-gems-api-c21adc436e90.herokuapp.com/token/refresh-token",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          // console.log(accessToken);
          setNewToken(newToken.data);
        } else {
          setError("No token found. Please log in.");
        }
      } catch (e) {
        console.error("Error fetching access token:", e);
        setError("Error fetching access token.");
      }
    };
    getNewToken();
  }, []);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const accessToken = await axios.get(
              "https://four-gems-api-c21adc436e90.herokuapp.com/token/get-token",
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
            console.log(accessToken.error);
            // console.log(accessToken);
            setGoldApiToken(accessToken.data);
          } catch (goldApiToken) {}
        } else {
          setError("No token found. Please log in.");
        }
      } catch (e) {
        console.error("Error fetching access token:", e);
        setError("Error fetching access token.");
      }
    };
    getAccessToken();
  }, []);
  console.log(goldApiToken);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
          headers: {
            "x-access-token": "goldapi-1gnd90slx7lb2u5-io",
            // 'x-access-token': goldApiToken // Thay thế bằng API key thực tế của bạn
          },
        });
        // console.log(response.data); // Ghi log dữ liệu phản hồi vào console
        if (response.data && response.data.price) {
          // Kiểm tra nếu có thuộc tính 'price'
          setGoldType(response.data);
          setGoldPrice(response.data.currency);
        } else {
          setError("Không thể lấy giá vàng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy giá vàng:", error);
        setError("Lỗi khi lấy giá vàng.");
      }
    };
    fetchGoldPrice();
  }, [goldApiToken]);

  return (
    <div>
      {/*<h2>Giá vàng theo thời gian thực</h2>*/}
      {/*/!*conditional rendering*!/*/}
      {/*{goldType ? ( // Hiển thị giá nếu có*/}
      {/*    <p>Giá: ${goldType.price}</p>*/}
      {/*) : (*/}
      {/*    <p>{error || 'Đang tải...'}</p> // Hiển thị lỗi hoặc thông báo đang tải*/}
      {/*)}*/}
    </div>
  );
};

export default GoldPriceTable;
