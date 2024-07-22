import {
    Button,
    Card,
    Grid,
    MenuItem,
    Select,
    Chip,
    TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";

const PromotionForm = (props) => {
    const { initialValues, validationSchema, handleFormSubmit } = props;
    const [productPromotion, setProductPromotion] = useState([]);
    const findProductName = (productPromotion, productId) => {
        if (productPromotion) {
            const name = productPromotion.filter(
                (item) => item.productId === productId
            );
            return name[0]?.productName;
        }
    };
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else {
    }

    useEffect(() => {
        const fetchProductPromotion = async () => {
            try {
                const response = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/get-product-available-for-add-promotion`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setProductPromotion(response.data.data);
            } catch (error) {
                console.error("Failed to fetch promotion info:", error);
            }
        };
        fetchProductPromotion();
    }, [token]);
    return (
        <Card
            sx={{
                p: 6,
            }}
        >
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={{ ...initialValues, promotionProduct: [] }}
                validationSchema={validationSchema}
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
                        <Grid container spacing={3}>
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
                                    type="number"
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
                                <TextField
                                    fullWidth
                                    type="datetime-local"
                                    name="endDate"
                                    color="info"
                                    size="medium"
                                    placeholder="End Date"
                                    value={values.endDate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        !!touched.endDate && !!errors.endDate
                                    }
                                    helperText={
                                        touched.endDate && errors.endDate
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <Select
                                    sx={{
                                        height: "auto",
                                        minHeight: 100,
                                        display: "flex",
                                        alignItems: "flex-start",
                                    }}
                                    multiple
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="promotionProduct"
                                    onBlur={handleBlur}
                                    onChange={(event) =>
                                        setFieldValue(
                                            "promotionProduct",
                                            event.target.value
                                        )
                                    }
                                    value={values.promotionProduct || []}
                                    label="Select Product"
                                    error={
                                        !!touched.promotionProduct &&
                                        !!errors.promotionProduct
                                    }
                                    renderValue={(selected) => (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "4px",
                                                maxWidth: "100%",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {selected.length === 0 ? (
                                                <span>
                                                    No products selected
                                                </span>
                                            ) : (
                                                selected.map((value) => (
                                                    <Chip
                                                        key={value}
                                                        label={findProductName(
                                                            productPromotion,
                                                            value
                                                        )}
                                                        style={{
                                                            margin: "2px",
                                                            maxWidth:
                                                                "calc(100% - 4px)",
                                                        }}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    )}
                                >
                                    {productPromotion.map((product) => (
                                        <MenuItem
                                            key={product.productId}
                                            value={product.productId}
                                        >
                                            {product.productName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item sm={12} xs={12}>
                                <Button
                                    variant="contained"
                                    color="info"
                                    type="submit"
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
