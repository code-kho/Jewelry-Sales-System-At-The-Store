import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
// In create.jsx
import { CreateForm } from "../../../src/pages-sections/admin/CreateForm";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

CreateCategory.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function CreateCategory() {
    const router = useRouter();
    const [productPublish, setProductPublish] = useState(1);
    const INITIAL_VALUES = {
        categoryName: "",
    };

    const validationSchema = yup.object().shape({
        categoryName: yup.string().required("required"),
    });

    const handleFormSubmit = async (values) => {
        console.log(values.categoryName);
        const categorytNew = {
            productTypeName: values.categoryName,
        };

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/product-type?productTypeName=${values.categoryName}`,
                categorytNew,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
        } catch (e) {
            console.log(e);
        }
        router.push("/admin/categories");
    };

    return (
        <Box py={4}>
            <H3 mb={2}>Add New Category</H3>

            <CreateForm
                setProductPublish={setProductPublish}
                productPublish={productPublish}
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                handleFormSubmit={handleFormSubmit}
            />
        </Box>
    );
}
