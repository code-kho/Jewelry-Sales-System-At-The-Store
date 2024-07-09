import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Box, Button, Divider, Grid, Radio, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import axios from "axios";

const PaymentForm = () => {
    const [paymentMethod, setPaymentMethod] = useState("vn-pay");
    const width = useWindowSize();
    const router = useRouter();
    const isMobile = width < 769;
    const orderId = parseInt(localStorage.getItem("orderId"));
    const totalPrice = parseInt(localStorage.getItem("totalPrice"), 10);
    const VNDPrice = totalPrice * 25000;
    const [VNPayUrl, setVNPayUrl] = useState();
    const [PaypalUrl, setPaypalUrl] = useState();
    const [codData, setCodData] = useState();
    const handleFormSubmit = async (values) => router.push("/payment");
    const handlePaymentMethodChange = ({ target: { name } }) => {
        setPaymentMethod(name);
    };
    // Ensure token is retrieved from localStorage or sessionStorage
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = sessionStorage.getItem("token");
    } else {
        console.log("Web Storage is not supported in this environment.");
    }
    console.log(VNDPrice);
    const VNPay = {
        amount: VNDPrice,
        bankCode: "NCB",
        orderId: orderId,
    };
    const Paypal = {
        amount: totalPrice,
        orderId: orderId,
    };
    console.log(VNPay);
    const handleVNPay = async () => {
        try {
            const createVNPay = await axios.post(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/payment/vn-pay?amount=${VNDPrice}&bankCode=NCB&orderId=${orderId}`,
                VNPay,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setVNPayUrl(createVNPay.data.data);
            console.log(createVNPay.data.data.paymentUrl);
            router.push(createVNPay.data.data.paymentUrl);
        } catch (error) {
            console.error("Failed to fetch VNPay:", error);
        }
    };
    const handlePaypal = async () => {
        try {
            const createOrder = await axios.post(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/payment/paypal?orderId=${orderId}&total=${totalPrice}`,
                Paypal,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setPaypalUrl(createOrder.data.data);
            console.log(createOrder.data.data);
            router.push(createOrder.data.data);
        } catch (error) {
            console.error("Failed to fetch VNPay:", error);
        }
    };
    const handleCashod = async () => {
        try {
            const createCod = await axios.post(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/payment/cash?orderId=${orderId}`,
                orderId,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setCodData(createCod.data.data);
            console.log(createCod.data.data);
            router.push("/order-success");
        } catch (error) {
            console.error("Failed to fetch VNPay:", error);
        }
    };
    // Add this function to handle the Review button click
    const handleReviewClick = () => {
        if (paymentMethod === "vn-pay") {
            handleVNPay();
        } else if (paymentMethod === "paypal") {
            handlePaypal();
        } else if (paymentMethod === "cod") {
            handleCashod();
        } else {
            router.push("/orders");
        }
    };

    return (
        <Fragment>
            <Card1
                sx={{
                    mb: 4,
                }}
            >
                <FormControlLabel
                    name="vn-pay"
                    sx={{
                        mb: 3,
                    }}
                    onChange={handlePaymentMethodChange}
                    label={
                        <Paragraph fontWeight={600}>Pay with VN Pay</Paragraph>
                    }
                    control={
                        <Radio
                            checked={paymentMethod === "vn-pay"}
                            color="primary"
                            size="small"
                        />
                    }
                />

                <Divider
                    sx={{
                        mb: 3,
                        mx: -4,
                    }}
                />

                <FormControlLabel
                    name="paypal"
                    sx={{
                        mb: 3,
                    }}
                    onChange={handlePaymentMethodChange}
                    label={
                        <Paragraph fontWeight={600}>Pay with Paypal</Paragraph>
                    }
                    control={
                        <Radio
                            checked={paymentMethod === "paypal"}
                            color="primary"
                            size="small"
                        />
                    }
                />

                <Divider
                    sx={{
                        mb: 3,
                        mx: -4,
                    }}
                />

                <FormControlLabel
                    name="cod"
                    onChange={handlePaymentMethodChange}
                    label={
                        <Paragraph fontWeight={600}>Cash On Delivery</Paragraph>
                    }
                    control={
                        <Radio
                            checked={paymentMethod === "cod"}
                            color="primary"
                            size="small"
                        />
                    }
                />

                <Divider
                    sx={{
                        mb: 3,
                        mx: -4,
                    }}
                />

                <FormControlLabel
                    sx={{
                        mb: 3,
                    }}
                    name="credit-card"
                    onChange={handlePaymentMethodChange}
                    label={
                        <Paragraph fontWeight={600}>
                            Pay with credit card
                        </Paragraph>
                    }
                    control={
                        <Radio
                            checked={paymentMethod === "credit-card"}
                            color="primary"
                            size="small"
                        />
                    }
                />

                <Divider
                    sx={{
                        mb: 3,
                        mx: -4,
                    }}
                />

                {paymentMethod === "credit-card" && (
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box mb={3}>
                                    <Grid container spacing={3}>
                                        <Grid item sm={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                name="card_no"
                                                label="Card Number"
                                                onBlur={handleBlur}
                                                value={values.card_no}
                                                onChange={handleChange}
                                                helperText={
                                                    touched.card_no &&
                                                    errors.card_no
                                                }
                                            />
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                name="exp_date"
                                                label="Exp Date"
                                                placeholder="MM/YY"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.exp_date}
                                                helperText={
                                                    touched.exp_date &&
                                                    errors.exp_date
                                                }
                                            />
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                name="name"
                                                onBlur={handleBlur}
                                                value={values.name}
                                                label="Name on Card"
                                                onChange={handleChange}
                                                helperText={
                                                    touched.name && errors.name
                                                }
                                            />
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                name="name"
                                                onBlur={handleBlur}
                                                value={values.name}
                                                label="Name on Card"
                                                onChange={handleChange}
                                                helperText={
                                                    touched.name && errors.name
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        mb: 4,
                                    }}
                                >
                                    Submit
                                </Button>

                                <Divider
                                    sx={{
                                        mb: 3,
                                        mx: -4,
                                    }}
                                />
                            </form>
                        )}
                    </Formik>
                )}
            </Card1>

            <Grid container spacing={7}>
                <Grid item sm={6} xs={12}>
                    <Link href="/checkout" passHref>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="button"
                            fullWidth
                        >
                            Back to checkout details
                        </Button>
                    </Link>
                </Grid>

                <Grid item sm={6} xs={12}>
                    {/* Updated the onClick handler for the Review button */}
                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        fullWidth
                        onClick={handleReviewClick}
                    >
                        Review
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    );
};

const initialValues = {
    card_no: "",
    name: "",
    exp_date: "",
    cvc: "",
    shipping_zip: "",
    shipping_country: "",
    shipping_address1: "",
    shipping_address2: "",
    billing_name: "",
    billing_email: "",
    billing_contact: "",
    billing_company: "",
    billing_zip: "",
    billing_country: "",
    billing_address1: "",
    billing_address2: "",
};
const checkoutSchema = yup.object().shape({
    card_no: yup.string().required("required"),
    name: yup.string().required("required"),
    exp_date: yup.string().required("required"),
    cvc: yup.string().required("required"),
});
export default PaymentForm;
