import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { ProductCardImportGoodsList } from "../../../src/components/products/ProductCardImportGoodList";
import SEO from "components/SEO";
import { useAppContext } from "contexts/AppContext";
import Card1 from "../../../src/components/Card1";
import { H5 } from "../../../src/components/Typography";

const ImportGoods = () => {
    const { state } = useAppContext();
    const cartList = state.cart;
    const [rotateId, setRotateId] = useState({ counterId: "" });
    const [counterInfo, setCounterInfo] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [rotateGoods, setRotateGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rotateRequestPopup, setRotateRequestPopup] = useState(false);
    const [counters, setCounters] = useState([]);
    let token = "";

    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = sessionStorage.getItem("token");
    } else {
        console.log("Web Storage is not supported in this environment.");
    }

    useEffect(() => {
        const fetchCounters = async () => {
            try {
                const response = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/counter`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setCounters(response.data.data);
            } catch (error) {
                console.error("Failed to fetch counters:", error);
            }
        };

        fetchCounters();
    }, [token]);

    const handleFormSubmit = async (values) => {
        setRotateId(values);
        const counterId = localStorage.getItem("counterId");
        if (counterId === values.counterId) {
            setPopupOpen(true);
        } else {
            setConfirmPopup(true);
        }
    };

    const validationSchema = yup.object().shape({
        counterId: yup.string().required("Counter ID is required"),
    });

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleConfirmRotate = async (values) => {
        setRotateRequestPopup(false);
        const counterId = localStorage.getItem("counterId");
        const RotateRequest = {
            fromCounterId: parseInt(values.counterId),
            toCounterId: parseInt(counterId),
            productTransferRequestList: cartList.map((item) => ({
                productId: item.id,
                quantity: item.qty,
            })),
        };

        try {
            const createRotateRequest = await axios.post(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/transfer-request`,
                RotateRequest,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(
                "Rotate request created:",
                createRotateRequest.data.data
            );
        } catch (error) {
            console.error("Failed to create import request:", error);
        }
    };

    const handleConfirmTransfer = async (values) => {
        setConfirmPopup(false);
        const counterId = values.counterId; // Use the selected counterId from values

        const fetchCounterInfo = async () => {
            try {
                const resCounterInfo = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/counter/${counterId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setCounterInfo(resCounterInfo.data.data);
            } catch (error) {
                console.error("Failed to fetch counter info:", error);
            }
        };

        const fetchProductRotate = async () => {
            try {
                const response = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/show-all-product-not-in-counter?counterId=${counterId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setRotateGoods(response.data.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        await fetchCounterInfo();
        await fetchProductRotate();
    };

    const handleOpenRotateRequestPopup = () => {
        setRotateRequestPopup(true);
    };

    const handleCloseRotateRequestPopup = () => {
        setRotateRequestPopup(false);
    };

    return (
        <VendorDashboardLayout>
            <SEO title="Rotate Goods" />
            <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={8}>
                    <Box>
                        <div style={styles.gridContainer}>
                            {loading ? (
                                <h1>Loading...</h1>
                            ) : (
                                rotateGoods.map((product, index) => (
                                    <div key={index}>
                                        <ProductCardImportGoodsList
                                            products={[product]}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Formik 
                        initialValues={rotateId}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
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
                                <Card1 sx={{ mb: 4 }}>
                                    <Grid item sm={12} xs={12} mb={3}>
                                        <TextField
                                            select
                                            fullWidth
                                            color="info"
                                            size="medium"
                                            name="counterId"
                                            onBlur={handleBlur}
                                            placeholder="Counter"
                                            onChange={handleChange}
                                            value={values.counterId}
                                            label="Counter"
                                            error={
                                                !!touched.counterId &&
                                                !!errors.counterId
                                            }
                                            helperText={
                                                touched.counterId &&
                                                errors.counterId
                                            }
                                        >
                                            {counters.map((counter) => (
                                                <MenuItem
                                                    key={counter.counterId}
                                                    value={counter.counterId}
                                                >
                                                    Counter {counter.counterId}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Typography fontWeight="600" mb={2}>
                                        Counter Information
                                    </Typography>
                                    <Grid container spacing={6}>
                                        <Grid item sm={2} xs={12}>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginBottom: "7px",
                                                }}
                                            >
                                                <H5
                                                    sx={{
                                                        marginRight: "10px",
                                                        marginTop: "1px",
                                                    }}
                                                >
                                                    Id
                                                </H5>
                                                <Typography>
                                                    {counterInfo?.counterId}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm={10} xs={12}>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginBottom: "7px",
                                                }}
                                            >
                                                <H5
                                                    sx={{
                                                        marginRight: "10px",
                                                        marginTop: "1px",
                                                    }}
                                                >
                                                    Manager Name
                                                </H5>
                                                <Typography>
                                                    {counterInfo?.managerName}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 5 }}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 1 }}
                                        onClick={handleOpenRotateRequestPopup}
                                    >
                                        Confirm Import
                                    </Button>
                                </Card1>
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
            <Dialog
                open={popupOpen}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"This is your counter"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The counter ID you have entered matches your counter ID.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClosePopup}
                        color="primary"
                        autoFocus
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={confirmPopup}
                onClose={() => setConfirmPopup(false)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">
                    Confirm Import Goods To Counter
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Are you sure to import goods to this counter?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setConfirmPopup(false)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleConfirmTransfer(rotateId)}
                        color="primary"
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={rotateRequestPopup}
                onClose={handleCloseRotateRequestPopup}
                aria-labelledby="rotate-request-dialog-title"
                aria-describedby="rotate-request-dialog-description"
            >
                <DialogTitle id="rotate-request-dialog-title">
                    Send Import Request
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="rotate-request-dialog-description">
                        Do you want to send the import request?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseRotateRequestPopup}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleConfirmRotate(rotateId);
                        }}
                        color="primary"
                        autoFocus
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </VendorDashboardLayout>
    );
};

const styles = {
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
    },
};

export default ImportGoods;
