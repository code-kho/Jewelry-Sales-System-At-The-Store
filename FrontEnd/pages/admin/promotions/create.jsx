import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import axios from "axios";
import { useRouter } from "next/router";
import PromotionForm from "../../../src/pages-sections/admin/promotion/PromotionForm";
import {parseSelector} from "bootstrap/js/src/util";

// =============================================================================
CreatePromotion.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function CreatePromotion() {
    const router = useRouter();
    const INITIAL_VALUES = {
        productIdList: [],
        description: "",
        discount: "",
        endDate: "",
    };
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const HH = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
    };
    const validationSchema = yup.object().shape({
        description: yup.string().required("Description is required"),
        discount: yup.number().required("Discount is required").typeError("Discount must be a number"),
        endDate: yup.date().required("End date is required").typeError("End date must be a valid date"),
    });

    const handleFormSubmit = async (values) => {
        const createPromotion = {
            description: values.description,
            discount: values.discount.toString(),
            endDate: formatDateTime(values.endDate),
            productIdList: values.promotionProduct
        }
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "https://four-gems-system-790aeec3afd8.herokuapp.com/promotions",
                createPromotion
                ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // router.push("/admin/promotions");
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
