import { Person } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import {useEffect, useState} from "react";
import axios from "axios";
import QCDashboardLayout from "../../src/components/layouts/customer-dashboard/QCPage";

// ============================================================
const Profile = ({ user }) => {
    const downMd = useMediaQuery((theme) => theme.breakpoints.down("md")); // SECTION TITLE HEADER LINK
    const [customerShowInfo, setCustomerShowInfo] = useState("");
    const [product, setProduct] = useState({});
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
        const customerId = localStorage.getItem("customerId");
        const fetchGetCusById = async () => {
            if (!customerId) return;
            console.log("Fetching customer info for ID:", customerId);
            try {
                const responeGetCus = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/customers/${customerId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setCustomerShowInfo(responeGetCus.data.data);
                console.log(responeGetCus.data.data);
            } catch (error) {
                console.error("Failed to search customers:", error);
            }
        };
        fetchGetCusById();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const productId = localStorage.getItem("productId");
            const counterId = localStorage.getItem("counterId");
            try {
                if (token) {
                    const response = await axios.get(
                        `https://four-gems-system-790aeec3afd8.herokuapp.com/product/get-product-by-id?productId=${productId}&countId=${counterId}`,
                        {
                            headers: {
                                Authorization: `Bearer ` + token,
                            },
                        }
                    );
                    // Làm tròn lên giá product.price
                    const roundedPrice = Math.ceil(response.data.data.price);
                    setProduct({ ...response.data.data, price: roundedPrice });
                    console.log(response.data.data);
                } else {
                    console.warn(
                        "Token is missing. Please ensure it's properly set."
                    );
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchData();
    }, []);

    const getBuyBackPrice = product.price * 0.7;
    const handleSubmitBuyBack = async () => {
        const productId = localStorage.getItem("productId");
        const orderId = localStorage.getItem("orderId");
        const userId = localStorage.getItem("userId");
        console.log(productId, orderId, userId)
        try {
            if (token) {
                const responeFormBuyBack = await axios.post(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/buyback?orderId=${orderId}&userId=${userId}&productId=${productId}`,
                    {},  // Add any data payload if required
                    {
                        headers: {
                            Authorization: `Bearer ` + token,
                        },
                    }
                );
                console.log(responeFormBuyBack.data.data);
            } else {
                console.warn(
                    "Token is missing. Please ensure it's properly set."
                );
            }
        } catch (error) {
            console.error("Failed to create form buy back:", error);
        }
    };
  return (
    <QCDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={Person}
        title="Buy Back Confirm"
        navigation={<CustomerDashboardNavigation />}
      />

      {/* USER PROFILE INFO */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Card
              sx={{
                display: "flex",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >

              <Box ml={1.5} flex="1 1 0">
                  <FlexBetween flexWrap="wrap">
                      <div>
                          <Grid container alignItems="center">
                              <Grid item xs>
                                  <H5 my="0px">{customerShowInfo.name}</H5>
                              </Grid>
                              <Grid item sx={{ml: 27}}>
                                  <Typography color="grey.600">Loyalty Point:</Typography>
                              </Grid>
                              <Grid item>
                                  <Typography ml={0.5} color="primary.main">
                                      {customerShowInfo.loyaltyPoints}
                                  </Typography>
                              </Grid>
                          </Grid>
                          <Grid container alignItems="center" color="grey.600">
                              <Grid item>
                                  <Typography>{customerShowInfo.phoneNumber}</Typography>
                              </Grid>
                              <Grid item sx={{ml: 25}}>
                                  <Typography>{customerShowInfo.email}</Typography>
                              </Grid>
                          </Grid>
                      </div>
                      <Typography color="grey.600" letterSpacing="0.2em">
                          {customerShowInfo.memberShipTier?.toUpperCase()} USER
                      </Typography>
                  </FlexBetween>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

        <TableRow
            sx={{
                cursor: "auto",
                p: "0.75rem 1.5rem",
                ...(downMd && {
                    alignItems: "start",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }),
            }}
        >
            <TableRowItem title="Product Id" value={product.productId}/>
            <TableRowItem title="Last Name" value={product.productName}/>
            <TableRowItem title="Product Price" value={product.price}/>
            <TableRowItem title="Buy Back Price" value={getBuyBackPrice}/>
        </TableRow>
        <Button
            color="primary"
            variant="contained"
            sx={{
                mt: 3,
                mb: 4.5,
                px: "1.75rem",
                height: 40,
                padding: 2,
            }}
            onClick={() => handleSubmitBuyBack()}
        >
            Submit
        </Button>
    </QCDashboardLayout>
  );
};

const TableRowItem = ({ title, value }) => {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5} textAlign="left">
        {title}
      </Small>
      <span>{value}</span>
    </FlexBox>
  );
};

export default Profile;
