//Dashboard - Orders/Sold Item
import { Card } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import { H1, H2, H3 } from "components/Typography";
import React, { useEffect, useState } from "react"; // ========================================================
import axios from "axios";
import { useGetDate } from "../../hooks/useGetDate";
// ========================================================
const Card1 = (props) => {
  const { status, color, title, amount1, amount2, percentage } = props;
  return (
    <Card
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        pb: 5,
      }}
    >
      <H1 mb={2} color="grey.600">
        {title}
      </H1>
      <H2>Today</H2>
      <H3 mb={0.3}>{amount1}</H3>

      <FlexBetween
        sx={{
          mb: 2,
        }}
      >
      </FlexBetween>

      <H2>Yesterday</H2>
      <FlexBetween>
        <H3>{amount2}</H3>
      </FlexBetween>
    </Card>
  );
}; // set default props for status and color

Card1.defaultProps = {
  status: "up",
  color: "info.main",
};
export default Card1;
