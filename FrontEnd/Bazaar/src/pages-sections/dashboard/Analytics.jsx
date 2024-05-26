import { useState } from "react";
import dynamic from "next/dynamic";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Card, MenuItem, Select, styled, useTheme } from "@mui/material";
import { H5 } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import { analyticsChartOptions } from "./chartsOptions"; // apext chart instance

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
  const series = [
    {
      name: "Income",
      data: [
        15000, 45000, 12000, 50000, 75000, 0, 0, 0, 0, 0,
        0, 0,
      ],
    },
    {
      name: "Profit",
      data: [
        1500, 48000, 19000, 59000, 25000, 0, 0, 0, 0, 0,
        0, 0,
      ],
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
