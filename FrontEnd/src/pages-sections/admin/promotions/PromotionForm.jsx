import { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Grid,
    Card,
    MenuItem,
    Select,
    Chip,
    OutlinedInput,
    Box,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AsyncSelect from "react-select/async";

const validationSchema = Yup.object().shape({
    productIdList: Yup.array()
        .min(1, "At least one product must be selected")
        .required("Products are required"),
    description: Yup.string().required("Description is required"),
    discount: Yup.number()
        .required("Discount is required")
        .positive("Discount must be positive"),
    endDate: Yup.date()
        .required("End date is required")
        .min(new Date(), "End date must be in the future"),
});

const PromotionForm = () => {
    const router = useRouter();
    const [availableProducts, setAvailableProducts] = useState([]);
    const [storedToken, setStoredToken] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const initialValues = {
        productIdList: [],
        description: "",
        discount: "",
        endDate: null,
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "black", // Chỉnh màu chữ cho option được chọn và không được chọn
            backgroundColor: state.isSelected ? "blue" : "white", // Chỉnh màu nền cho option được chọn và không được chọn
            "&:hover": {
                backgroundColor: "lightgray", // Màu nền khi hover vào option
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "black", // Chỉnh màu chữ cho giá trị đang được chọn
        }),
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setStoredToken(localStorage.getItem("token"));
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchAvailableProducts = async () => {
            if (!storedToken) return;

            let url =
                "https://four-gems-system-790aeec3afd8.herokuapp.com/product/get-product-available-for-add-promotion";

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (isMounted) {
                    setAvailableProducts(
                        response.data.data.map((product) => ({
                            value: product.productId.toString(),
                            label: product.productName,
                        }))
                    );
                }
            } catch (error) {
                console.error("Failed to fetch available products:", error);
            }
        };

        if (storedToken) {
            fetchAvailableProducts();
        }

        return () => {
            isMounted = false;
        };
    }, [storedToken]);

    const loadOptions = (inputValue, callback) => {
        const filteredOptions = availableProducts.filter((product) =>
            product.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        callback(filteredOptions);
    };

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        if (!storedToken) {
            console.log("Token not available");
            setSubmitting(false);
            return;
        }

        const formattedValues = {
            ...values,
            endDate: values.endDate
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            productIdList: values.productIdList.map((id) => parseInt(id)),
        };

        try {
            const response = await axios.post(
                "https://four-gems-system-790aeec3afd8.herokuapp.com/promotions",
                formattedValues,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );

            if (response.status === 200 && response.data.data) {
                await router.push("/admin/promotions");
            } else {
                setFieldError(
                    "submit",
                    "Submission failed. Unexpected response from server."
                );
            }
        } catch (error) {
            console.error("Failed to submit promotion:", error);
            if (error.response) {
                setFieldError(
                    "submit",
                    error.response.data?.message ||
                        `Submission failed.Status : ${error.response.status}`
                );
            } else if (error.request) {
                setFieldError(
                    "submit",
                    "No response received from server. Please try again."
                );
            } else {
                setFieldError(
                    "submit",
                    "Error setting up the request. Please try again."
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card sx={{ p: 6 }}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item sm={12} xs={12}>
                                <AsyncSelect
                                    isMulti
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={loadOptions}
                                    onChange={(selectedOptions) => {
                                        const selectedIds = selectedOptions.map(
                                            (option) => option.value
                                        );
                                        setFieldValue(
                                            "productIdList",
                                            selectedIds
                                        );
                                    }}
                                    styles={customStyles}
                                />

                                {touched.productIdList &&
                                    errors.productIdList && (
                                        <div
                                            style={{
                                                color: "red",
                                                marginTop: "5px",
                                            }}
                                        >
                                            {errors.productIdList}
                                        </div>
                                    )}
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    color="info"
                                    size="medium"
                                    placeholder="Description"
                                    value={values.description}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        !!touched.description &&
                                        !!errors.description
                                    }
                                    helperText={
                                        touched.description &&
                                        errors.description
                                    }
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="discount"
                                    label="Discount"
                                    color="info"
                                    size="medium"
                                    placeholder="Discount"
                                    value={values.discount}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        !!touched.discount && !!errors.discount
                                    }
                                    helperText={
                                        touched.discount && errors.discount
                                    }
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DateTimePicker
                                        label="End Date"
                                        value={values.endDate}
                                        onChange={(date) =>
                                            setFieldValue("endDate", date)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                name="endDate"
                                                error={
                                                    !!touched.endDate &&
                                                    !!errors.endDate
                                                }
                                                helperText={
                                                    touched.endDate &&
                                                    errors.endDate
                                                }
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <p style={{ color: "red" }}>
                                        {errors.submit}
                                    </p>
                                </Grid>
                            )}
                            <Grid item sm={12} xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Add Promotion
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Card>
    );
};

export default PromotionForm;
