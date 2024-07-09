import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Divider, Grid, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "components/Card1";
import axios from "axios";
import { H4, H5, Paragraph } from "components/Typography";
import { useAppContext } from "../../contexts/AppContext";
import { jwtDecode } from "jwt-decode";
import { currency } from "../../lib";
import { FlexBetween } from "../../components/flex-box";
const CheckoutForm = () => {
    const router = useRouter();
    const { state } = useAppContext();
    const cartList = state.cart;
    const [customerId, setCustomerId] = useState(0);
    const [customerShowInfo, setCustomerShowInfo] = useState("");

    let token = "";
    const handleWaiting = () => {
        router.push("/waiting");
    };
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem("token");
    } else {
        // If neither localStorage nor sessionStorage is supported
        console.log("Web Storage is not supported in this environment.");
    }
    const decoded = jwtDecode(token);
    const productName = cartList?.map((item) => ({
        productId: item?.id,
        quantity: item?.qty,
        price: item?.price,
    }));
    const getTotalPrice = () =>
        cartList.reduce((accum, item) => accum + item?.price * item?.qty, 0);
    const tax = getTotalPrice() * 0.08;
    const totalBill = tax + getTotalPrice();
    const productIds = cartList?.map((item) => ({
        id: item?.id,
        qty: item?.qty,
        price: item?.price,
        name: item?.name,
    }));

    useEffect(() => {
        if (router?.query?.customerId) {
            const customerIdNum = parseInt(router.query?.customerId, 10);
            setCustomerId(customerIdNum);
        }
    }, [router?.query?.customerId]);
    useEffect(() => {
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
    }, [customerId, token]);
    const handleFormSubmit = async () => {
        const orderNew = {
            customerId: customerId,
            userId: decoded?.id,
            amount: totalBill,
            productItemRequestList: productName,
        };
        console.log(orderNew);
        try {
            const createOrder = await axios.post(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/order`,
                orderNew,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(createOrder?.data?.data?.orderId);
            localStorage.setItem("orderId", createOrder?.data?.data?.orderId);
        } catch (error) {
            console.error("Failed to create order:", error);
        }
    };
    const SEARCH_BUTTON = (
        <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={() => handleBtnSearch()}
            sx={{
                px: "2rem",
                height: "100%",
                borderRadius: "0 20px 20px 0",
            }}
        >
            Search
        </Button>
    );
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            onSubmit={handleFormSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Card1
                        sx={{
                            mb: 4,
                        }}
                    >
                        <Typography fontWeight="600" mb={2}>
                            Customer Information
                        </Typography>

                        <Grid container spacing={12}>
                            <Grid item sm={6} xs={12}>
                                <Grid
                                    sx={{
                                        display: "flex",
                                        marginBottom: "7px",
                                    }}
                                >
                                    <H5
                                        sx={{
                                            marginRight: "10px",
                                            marginTop: "1px",
                                        }}
                                    >
                                        Full Name:
                                    </H5>
                                    {customerShowInfo?.name}
                                </Grid>
                                <Grid
                                    sx={{
                                        display: "flex",
                                        marginBottom: "7px",
                                    }}
                                >
                                    <H5
                                        sx={{
                                            marginRight: "10px",
                                            marginTop: "1px",
                                        }}
                                    >
                                        Phone Number:
                                    </H5>
                                    {customerShowInfo?.phoneNumber}
                                </Grid>
                                <Grid
                                    sx={{
                                        display: "flex",
                                        marginBottom: "7px",
                                    }}
                                >
                                    <H5
                                        sx={{
                                            marginRight: "10px",
                                            marginTop: "1px",
                                        }}
                                    >
                                        Address:
                                    </H5>
                                    {customerShowInfo?.address}
                                </Grid>
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <Grid
                                    sx={{
                                        display: "flex",
                                        marginBottom: "7px",
                                    }}
                                >
                                    <H5
                                        sx={{
                                            marginRight: "10px",
                                            marginTop: "1px",
                                        }}
                                    >
                                        Email:
                                    </H5>
                                    {customerShowInfo?.email}
                                </Grid>
                                <Grid
                                    sx={{
                                        display: "flex",
                                        marginBottom: "7px",
                                    }}
                                >
                                    <H5
                                        sx={{
                                            marginRight: "10px",
                                            marginTop: "1px",
                                        }}
                                    >
                                        Gender:
                                    </H5>
                                    {customerShowInfo?.gender}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider
                            sx={{
                                mt: "1.5rem",
                                mb: "1rem",
                                borderColor: "black",
                            }}
                        />
                        <Grid item sm={12} xs={12}>
                            {productIds?.map((product) => (
                                <Grid
                                    container
                                    sx={{
                                        display: "flex",
                                        marginBottom: "15px",
                                        alignItems: "center",
                                    }}
                                    key={product?.id}
                                >
                                    <Grid item sm={9} xs={12}>
                                        <H4
                                            sx={{
                                                marginRight: "10px",
                                                marginTop: "1px",
                                            }}
                                        >
                                            {product?.name}
                                        </H4>
                                    </Grid>
                                    <Grid item sm={3} xs={12}>
                                        <Grid
                                            container
                                            direction="column"
                                            sx={{
                                                mt: 1,
                                                marginLeft: "36px",
                                            }}
                                        >
                                            <H5
                                                sx={{
                                                    marginRight: "10px",
                                                    marginTop: "10px",
                                                    ml: 15,
                                                }}
                                            >
                                                Quantity: {product?.qty}
                                            </H5>
                                            <H5
                                                sx={{
                                                    marginRight: "10px",
                                                    marginTop: "10px",
                                                    ml: 15,
                                                }}
                                            >
                                                Price:{" "}
                                                {currency(product?.price)}
                                            </H5>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Divider
                            sx={{
                                mb: "1rem",
                                borderColor: "black",
                            }}
                        />
                        <FlexBetween mb={1}>
                            <Typography color="grey.600">Subtotal:</Typography>
                            <Typography
                                fontSize="18px"
                                fontWeight="600"
                                lineHeight="1"
                            >
                                {currency(getTotalPrice())}
                            </Typography>
                        </FlexBetween>

                        <FlexBetween mb={1}>
                            <Typography color="grey.600">Tax:</Typography>
                            <Typography
                                fontSize="18px"
                                fontWeight="600"
                                lineHeight="1"
                            >
                                {currency(tax)}
                            </Typography>
                        </FlexBetween>

                        <FlexBetween mb={2}>
                            <Typography color="grey.600">Discount:</Typography>
                            <Typography
                                fontSize="18px"
                                fontWeight="600"
                                lineHeight="1"
                            >
                                {currency(0)}
                            </Typography>
                        </FlexBetween>

                        <Divider
                            sx={{
                                mb: "1rem",
                                borderColor: "black",
                            }}
                        />
                        <FlexBetween mb={2}>
                            <Typography color="grey.600">Total:</Typography>
                            <Typography
                                fontSize="25px"
                                fontWeight="600"
                                lineHeight="1"
                                textAlign="right"
                            >
                                {currency(getTotalPrice() + tax)}
                            </Typography>
                        </FlexBetween>
                    </Card1>

                    <Grid container spacing={12}>
                        <Grid item sm={6} xs={12}>
                            <Link href="/cart" passHref>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="button"
                                    fullWidth
                                >
                                    Back to Cart
                                </Button>
                            </Link>
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleWaiting}
                                type="submit"
                            >
                                Proceed to Payment
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

const initialValues = {
    custom_fullname: "",
    custom_phoneNum: "",
    custom_email: "",
    custom_gender: "",
    shipping_address2: "",
};

const checkoutSchema = yup.object().shape({});
export default CheckoutForm;
