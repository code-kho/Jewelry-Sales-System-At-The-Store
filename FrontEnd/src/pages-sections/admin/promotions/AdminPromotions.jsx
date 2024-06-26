import { useState } from "react";
import * as yup from "yup";
import PromotionForm from "./PromotionForm";
import PromotionsTable from "./PromotionsTable";
import axios from "axios";

const initialValues = {
    productId: "",
    description: "",
    discount: "",
    endDate: "",
};

const validationSchema = yup.object().shape({
    productId: yup.string().required("Product ID is required"),
    description: yup.string().required("Description is required"),
    discount: yup.number().required("Discount is required"),
    endDate: yup.date().required("End Date is required"),
});

const AdminPromotions = () => {
    const handleFormSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
        try {
            await axios.post(
                "https://four-gems-api-c21adc436e90.herokuapp.com/promotions",
                values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            resetForm();
            window.location.reload();
        } catch (error) {
            console.error("Failed to create promotion:", error);
            setErrors({ submit: "Failed to create promotion" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <PromotionForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleFormSubmit={handleFormSubmit}
            />
            <PromotionsTable />
        </div>
    );
};

export default AdminPromotions;
