import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Card, MenuItem, Select, styled, useTheme } from "@mui/material";
import { H5 } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import { analyticsChartOptions } from "./chartsOptions";
import axios from "axios"; // apext chart instance

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const categories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]; // styled component

const StyledSelect = styled(Select)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.grey[600],
  "& fieldset": {
    border: "0 !important",
  },
  "& .MuiSelect-select": {
    padding: 0,
    paddingRight: "8px !important",
  },
}));

const Analytics = () => {
  const theme = useTheme();
  const [selectType, setSelectType] = useState("yearly");
  let token = "";
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("token");
  } else if (typeof sessionStorage !== "undefined") {
    // Fallback to sessionStorage if localStorage is not supported
    token = localStorage.getItem("token");
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log("Web Storage is not supported in this environment.");
  }
  const [profit12Month, setProfit12Month] = useState();
  useEffect(() => {
    const fetchProfit12Mounth = async () => {
      try {
        const resProfit12Mounth = await axios.get(
          `https://four-gems-api-c21adc436e90.herokuapp.com/order/total-profit-each-month?countId=1&year=2024`,
          {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          }
        );
        const apiData = resProfit12Mounth.data.data;
        const dataArray = Object.values(apiData);
        //console.log(dataArray); // Kiểm tra xem dữ liệu
        setProfit12Month(dataArray); // Cập nhật state với dataArray
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfit12Mounth();
  }, []);
  const [income12Month, setIncome12Month] = useState();
  useEffect(() => {
    const fetchIncome12Mounth = async () => {
      try {
        const resIncome12Mounth = await axios.get(
          `https://four-gems-api-c21adc436e90.herokuapp.com/order/total-money-each-month?countId=1&year=2024`,
          {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          }
        );
        const apiData = resIncome12Mounth.data.data;
        const dataArray = Object.values(apiData);
        console.log(dataArray); // Kiểm tra xem dữ liệu
        setIncome12Month(dataArray); // Cập nhật state với dataArray
      } catch (e) {
        console.log(e);
      }
    };
    fetchIncome12Mounth();
  }, []);
  const series = [
    {
      name: "Income",
      data: income12Month,
    },
    {
      name: "Profit",
      data: profit12Month,
    },
  ];
  return (
    <Card
      sx={{
        p: 3,
      }}
    >
      <FlexBetween>
        <H5>Analytics</H5>
        <H5>Yearly</H5>
      </FlexBetween>

      <ReactApexChart
        type="bar"
        height={300}
        series={series}
        options={analyticsChartOptions(theme, categories)}
      />
    </Card>
  );
};

export default Analytics;
