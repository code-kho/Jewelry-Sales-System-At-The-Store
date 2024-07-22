import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

CreateProduct.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function CreateProduct() {
    const router = useRouter();
    const [productPublish, setProductPublish] = useState(1);
    const [files, setFiles] = useState([]);
    const [imgUrl, setImgUrl] = useState("");
    
    const INITIAL_VALUES = {
        productName: "",
        description: "",
        quantityInStock: 0,
        weight: 0,
        laborCost: 0,
        ratioPrice: 0,
        stonePrice: 0,
        goldId: "",
        collectionId: "",
        isJewel: "",
        isGem: "",
        isActive: "",
        typeId: "",
        warrantyYear: 0,
    };

    const validationSchema = yup.object().shape({
        productName: yup
            .string()
            .required("required")
            .test(
                "no-start-space",
                "Cannot start with a space",
                (value) =>
                    value && value.trim().length > 0 && !value.startsWith(" ")
            ),
        description: yup
            .string()
            .required("required")
            .test(
                "no-start-space",
                "Cannot start with a space",
                (value) =>
                    value && value.trim().length > 0 && !value.startsWith(" ")
            ),
        quantityInStock: yup
            .number()
            .required("required")
            .min(0, "Must be a positive number"),
        weight: yup
            .number()
            .required("required")
            .min(0, "Must be a positive number"),
        laborCost: yup
            .number()
            .required("required")
            .min(0, "Must be a positive number"),
        ratioPrice: yup
            .number()
            .required("required")
            .min(0, "Must be a positive number"),
        stonePrice: yup
            .number()
            .required("required")
            .min(0, "Must be a positive number"),
        warrantyYear: yup
            .number()
            .required("required")
            .min(0, "Must be a positive number"),
        goldId: yup.string().required("required"),
        isJewel: yup.number().required("required"),
        isGem: yup.number().required("required"),
        isActive: yup.number().required("required"),
        typeId: yup.number().required("required"),
    });

    const handleFormSubmit = async (values) => {
        const productNew = {
            productName: values.productName,
            weight: values.weight,
            laborCost: values.laborCost,
            ratioPrice: values.ratioPrice,
            stonePrice: values.stonePrice,
            isJewel: values.isJewel,
            isGem: values.isGem,
            isActive: values.isActive,
            image: imgUrl,
            quantityInStock: values.quantityInStock,
            description: values.description,
            goldId: values.goldId,
            typeId: values.typeId,
            collectionId: values.collectionId,
            warrantyYear: values.warrantyYear,
        };

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/product/create-product`,
                productNew,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            router.push("/admin/products");
        } catch (e) {
            console.error("Error creating product:", e);
        }
    };

    return (
        <Box py={4}>
            <H3 mb={2}>Add New Product</H3>

            <ProductForm
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
                files={files}
                setFiles={setFiles}
                setProductPublish={setProductPublish}
                productPublish={productPublish}
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                handleFormSubmit={handleFormSubmit}
            />
        </Box>
    );
}
