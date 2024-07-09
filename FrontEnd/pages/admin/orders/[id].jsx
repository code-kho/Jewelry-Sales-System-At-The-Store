import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { H3 } from "components/Typography";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { OrderDetails } from "pages-sections/admin";
import axios from "axios"; // =============================================================================

OrderEdit.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function OrderEdit() {
  const { query } = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const orderId = localStorage.getItem("orderId");
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
  useEffect(() => {
    console.log(orderId);
    const fetchOrderDetail = async () => {
      try {
        const resOrderDetail = await axios.get(`https://four-gems-system-790aeec3afd8.herokuapp.com/order/${orderId}`, {
          headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
        });
        setOrderDetails(resOrderDetail.data.data);
      } catch (e) {
        console.log(e)
      }
    }
    fetchOrderDetail();
  }, []);
  console.log(orderDetails)
  if (!orderDetails) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box py={4}>
      <H3 mb={2}>Order Details</H3>
      <OrderDetails order={orderDetails} />
    </Box>
  );
}
