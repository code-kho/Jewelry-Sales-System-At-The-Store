import Link from "next/link";
import {
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import SEO from "components/SEO";
import { FlexBetween } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import Card1 from "../src/components/Card1";
import { SearchOutlinedIcon } from "../src/components/search-box/styled";
import { H5, Span } from "../src/components/Typography";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

const Cart = () => {
    const { state } = useAppContext();
    const cartList = state.cart;
    const router = useRouter();
    const getTotalPrice = () =>
        cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
    const [customerInfo, setCustomerInfo] = useState("");
    const [voucher, setVoucher] = useState("");
    const [discountPrice, setDiscountPrice] = useState(0);
    const [discountMemberPrice, setDiscountMemberPrice] = useState(0);

    const handleFormSubmit = async (values) => {
        router.push("/payment");
    };
    const [dataNumSearch, setDataNumSearch] = useState("");
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem("token");
    } else {
        
    }
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

    const handleBtnSearch = async () => {
        const fetchSearchCustomInfo = async () => {
            try {
                const resCusInfo = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/customers?phoneNumber=${dataNumSearch}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                if (resCusInfo.data.data.length === 0) {
                    await router.push("/admin/customerInfo/create");
                } else {
                    setCustomerInfo(resCusInfo.data.data[0]);
                    setDiscountMemberPrice(
                        resCusInfo.data.data[0].precent_discount
                    );
                }
            } catch (error) {
                console.error("Failed to fetch customer:", error);
            }
        };
        fetchSearchCustomInfo();
    };
    const handleApplyVoucher = async () => {
        const fetchPriceApplyVoucher = async () => {
            try {
                const resPriceByVoucher = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/voucher/${voucher}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                localStorage.setItem(
                    "percentDiscount",
                    resPriceByVoucher.data.data.discountPercent
                );
                setDiscountPrice(resPriceByVoucher.data.data.discountPercent);
            } catch (error) {
                console.error("Failed to fetch discount price:", error);
            }
        };
        fetchPriceApplyVoucher();
    };
    const handleCheckout = async () => {
        localStorage.setItem("code", voucher);
        localStorage.setItem("percentDiscount", discountPrice);
        localStorage.setItem("percentMemberDiscount", discountMemberPrice);
    };

    return (
        <CheckoutNavLayout>
            <SEO title="Cart" />

            <Grid container spacing={3}>
                {/* CART PRODUCT LIST */}
                <Grid item md={5} xs={12}>
                    {cartList.map((item) => (
                        <ProductCard7 key={item.id} {...item} />
                    ))}
                    <Grid container spacing={6}>
                        <Grid item sm={6} xs={12}>
                            <Link href="/" passHref>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="button"
                                    fullWidth
                                >
                                    Back to Menu
                                </Button>
                            </Link>
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <Link
                                href={`/checkout?customerId=${customerInfo.id}`}
                                passHref
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="button"
                                    onClick={handleCheckout()}
                                    fullWidth
                                >
                                    Checkout Now
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={7} xs={12}>
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
                                <Box className="searchBox">
                                    <TextField
                                        placeholder="Searching customer by phone number"
                                        fullWidth
                                        InputProps={{
                                            sx: {
                                                height: 50,
                                                paddingRight: 0,
                                                color: "grey.700",
                                                background: "#fff",
                                                borderRadius: "20px",
                                                mb: 2,
                                                "& fieldset": {
                                                    border: "none",
                                                },
                                            },
                                            endAdornment: SEARCH_BUTTON,
                                            startAdornment: (
                                                <SearchOutlinedIcon fontSize="small" />
                                            ),
                                        }}
                                        onChange={(e) =>
                                            setDataNumSearch(e.target.value)
                                        }
                                    />
                                </Box>
                                <Card1
                                    sx={{
                                        mb: 4,
                                    }}
                                >
                                    <Typography fontWeight="600" mb={2}>
                                        Customer Infomation
                                    </Typography>

                                    <Grid container spacing={6}>
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
                                                {customerInfo.name}
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
                                                {customerInfo.phoneNumber}
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
                                                {customerInfo.address}
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
                                                {customerInfo.email}
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
                                                    Point:
                                                </H5>
                                                {customerInfo.loyaltyPoints}
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
                                                    MemberShip:
                                                </H5>
                                                {customerInfo.memberShipTier}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card1>
                                <Grid item md={12} xs={12}>
                                    <Card1>
                                        <FlexBetween mb={1}>
                                            <Typography color="grey.600">
                                                Subtotal:
                                            </Typography>
                                            <Typography
                                                fontSize="18px"
                                                fontWeight="600"
                                                lineHeight="1"
                                            >
                                                {currency(getTotalPrice())}
                                            </Typography>
                                        </FlexBetween>

                                        <FlexBetween mb={1}>
                                            <Typography color="grey.600">
                                                Discount{" "}
                                                <Span sx={{ color: "green" }}>
                                                    (-{discountPrice}%)
                                                </Span>
                                                :
                                            </Typography>
                                            <Typography
                                                fontSize="18px"
                                                fontWeight="600"
                                                lineHeight="1"
                                            >
                                                {currency(
                                                    (discountPrice / 100) *
                                                        getTotalPrice()
                                                )}
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween mb={1}>
                                            <Typography color="grey.600">
                                                Discount of MemberShip{" "}
                                                <Span sx={{ color: "green" }}>
                                                    (-{discountMemberPrice}%)
                                                </Span>
                                                :
                                            </Typography>
                                            <Typography
                                                fontSize="18px"
                                                fontWeight="600"
                                                lineHeight="1"
                                            >
                                                {currency(
                                                    (discountMemberPrice /
                                                        100) *
                                                        getTotalPrice()
                                                )}
                                            </Typography>
                                        </FlexBetween>

                                        <FlexBetween mb={2}>
                                            <Typography color="grey.600">
                                                Tax{" "}
                                                <Span sx={{ color: "red" }}>
                                                    (+8%)
                                                </Span>
                                                :
                                            </Typography>
                                            <Typography
                                                fontSize="18px"
                                                fontWeight="600"
                                                lineHeight="1"
                                            >
                                                {currency(
                                                    (getTotalPrice() -
                                                        (discountPrice / 100) *
                                                            getTotalPrice()) *
                                                        0.08
                                                )}
                                            </Typography>
                                        </FlexBetween>

                                        <Divider
                                            sx={{
                                                mb: "1rem",
                                            }}
                                        />
                                        <FlexBetween mb={2}>
                                            <Typography color="grey.600">
                                                Total:
                                            </Typography>
                                            <Typography
                                                fontSize="25px"
                                                fontWeight="600"
                                                lineHeight="1"
                                                textAlign="right"
                                            >
                                                {currency(
                                                    getTotalPrice() -
                                                        (discountPrice / 100) *
                                                            getTotalPrice() -
                                                        (discountMemberPrice /
                                                            100) *
                                                            getTotalPrice() +
                                                        (getTotalPrice() -
                                                            (discountPrice /
                                                                100) *
                                                                getTotalPrice() -
                                                            (discountMemberPrice /
                                                                100) *
                                                                getTotalPrice()) *
                                                            0.08
                                                )}
                                            </Typography>
                                        </FlexBetween>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Grid item sm={8} xs={12}>
                                                <TextField
                                                    placeholder="Voucher"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e) =>
                                                        setVoucher(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Grid>
                                            <Grid item sm={4} xs={12}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth
                                                    sx={{
                                                        mt: {
                                                            xs: "1rem",
                                                            sm: 0,
                                                        },
                                                    }}
                                                    onClick={(e) =>
                                                        handleApplyVoucher()
                                                    }
                                                >
                                                    Apply Voucher
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Card1>
                                </Grid>
                                <Divider
                                    sx={{
                                        mb: "1rem",
                                    }}
                                />
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </CheckoutNavLayout>
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
export default Cart;
