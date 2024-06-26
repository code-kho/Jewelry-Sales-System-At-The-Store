import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useEffect, useState } from "react";
import axios from "axios"; // =============================================================================

CreateProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function CreateProduct() {
  const [productPublish, setProductPublish] = useState(1);
  const [files, setFiles] = useState([]); // HANDLE UPDATE NEW IMAGE VIA DROP ZONE

  const INITIAL_VALUES = {
    name: "",
    barcode: "",
    description: "",
    quantity: "",
    weight: "",
    laborPrice: "",
    ratioPrice: "",
    stonePrice: "",
    costPrice: "",
    goldType: "",
    collection: "",
    isJewel: "",
    isGem: "",
    isActive: "",
    typeId: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    barcode: yup.number().required("required"),
    description: yup.string().required("required"),
    quantity: yup.number().required("required"),
    weight: yup.number().required("required"),
    laborPrice: yup.number().required("required"),
    ratioPrice: yup.number().required("required"),
    stonePrice: yup.number().required("required"),
    costPrice: yup.number().required("required"),
    goldType: yup.string().required("required"),
    collection: yup.number().required("required"),
    isJewel: yup.number().required("required"),
    isGem: yup.number().required("required"),
    isActive: yup.number().required("required"),
    typeId: yup.number().required("required"),
  });

  const handleFormSubmit = async (values) => {
    const inputString = files[0].base64; // Your base64 string

    // Remove the prefix
    const base64Data = inputString.replace("data:image/jpeg;base64,", "");

    // Create a buffer from the base64 data
    const buffer = Buffer.from(base64Data, "base64");

    // Encode the buffer back to base64
    const outputString = buffer.toString("base64");

    // {
    //   "barCode":"123",
    //     "productName":"test product",
    //     "weight":"12.3",
    //     "price":"13.4",
    //     "laborCost":"19.1",
    //     "ratioPrice":"20.1",
    //     "costPrice":"21.3",
    //     "stonePrice":"51.2",
    //     "isGem":true,
    //     "image":"123",
    //     "quantityInStock":"12",
    //     "description":"this is test product",
    //     "goldId":"50",
    //     "typeId":"30",
    //     "collectionId" : "1"
    // }
    const productNew = {
      barCode: values.barcode,
      productName: values.name,
      weight: values.weight,
      price:
        values.laborPrice +
        values.ratioPrice +
        values.stonePrice +
        values.costPrice,
      laborPrice: values.laborPrice,
      ratioPrice: values.ratioPrice,
      stonePrice: values.stonePrice,
      costPrice: values.costPrice,
      isJewel: values.isJewel,
      isGem: values.isGem,
      isActive: values.isActive,
      image: outputString,
      quantityInStock: values.quantity,
      description: values.description,
      goldId: values.goldType,
      typeId: values.typeId,
      collectionId: values.collection,
    };
    // console.log(productNew);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://four-gems-api-c21adc436e90.herokuapp.com/product/create-product",
        productNew,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box py={4}>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm
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
