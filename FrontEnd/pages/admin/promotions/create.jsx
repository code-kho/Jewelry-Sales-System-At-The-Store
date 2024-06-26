import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import axios from "axios";
import { useRouter } from "next/router";
import PromotionForm from "../../../src/pages-sections/admin/promotions/PromotionForm";

// =============================================================================
CreatePromotion.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function CreatePromotion() {
    const router = useRouter();
    const INITIAL_VALUES = {
        description: "",
        discount: "",
        endDate: "",
    };

    const validationSchema = yup.object().shape({
        description: yup.string().required("Description is required"),
        discount: yup.number().required("Discount is required").typeError("Discount must be a number"),
        endDate: yup.date().required("End date is required").typeError("End date must be a valid date"),
    });

    const handleFormSubmit = async (values) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "https://four-gems-api-c21adc436e90.herokuapp.com/promotions",
                {
                    description: values.description,
                    discount: values.discount,
                    endDate: values.endDate,
                    productIdList: values.productIdList
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            router.push("/admin/promotions");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box py={4}>
            <H3 mb={2}>Add New Promotion</H3>
            <PromotionForm
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                handleFormSubmit={handleFormSubmit}
            />
        </Box>
    );
}
