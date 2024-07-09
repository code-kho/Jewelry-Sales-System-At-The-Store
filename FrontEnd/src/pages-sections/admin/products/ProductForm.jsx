import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Grid,
    MenuItem,
    TextField,
    styled,
    Box,
    alpha,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { Formik } from "formik";
import DropZone from "components/DropZone";

import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";

const UploadImageBox = styled(Box)(({ theme }) => ({
    width: 70,
    height: 70,
    display: "flex",
    overflow: "hidden",
    borderRadius: "8px",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: alpha(theme.palette.info.light, 0.1),
}));
const StyledClear = styled(Clear)(() => ({
    top: 5,
    right: 5,
    fontSize: 14,
    cursor: "pointer",
    position: "absolute",
})); // ================================================================

// ================================================================
const ProductForm = (props) => {
    const {
        initialValues,
        validationSchema,
        handleFormSubmit,
        files,
        setFiles,
        imgUrl,
        setImgUrl,
    } = props;

    const handleChangeDropZone = (incomingFiles) => {
        incomingFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFiles((prevFiles) => [
                    ...prevFiles,
                    {
                        file,
                        preview: URL.createObjectURL(file),
                    },
                ]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileDelete = (fileToDelete) => {
        setFiles((files) =>
            files.filter((item) => item.file.name !== fileToDelete.file.name)
        );
    };
    console.log(imgUrl);
    return (
        <Card
            sx={{
                p: 6,
            }}
        >
            <Formik
                onSubmit={(values) => handleFormSubmit(values)}
                initialValues={initialValues}
                validationSchema={validationSchema}
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
                        <Grid container spacing={3}>
                            <Grid item sm={12} xs={12}>
                                <TextField
                                    fullWidth
                                    name="productName"
                                    label="Name of Product"
                                    color="info"
                                    size="medium"
                                    placeholder="Name"
                                    value={values.productName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        !!touched.productName &&
                                        !!errors.productName
                                    }
                                    helperText={
                                        touched.productName &&
                                        errors.productName
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <DropZone
                                    setImgUrl={setImgUrl}
                                    imgUrl={imgUrl}
                                    accept="image/jpeg"
                                    onChange={(files) =>
                                        handleChangeDropZone(files)
                                    }
                                />

                                <FlexBox
                                    flexDirection="row"
                                    mt={2}
                                    flexWrap="wrap"
                                    gap={1}
                                >
                                    {files.map((file, index) => (
                                        <UploadImageBox key={index}>
                                            <BazaarImage
                                                src={file.preview}
                                                width="100%"
                                            />
                                            <StyledClear
                                                onClick={() =>
                                                    handleFileDelete(file)
                                                }
                                            />
                                        </UploadImageBox>
                                    ))}
                                </FlexBox>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    rows={6}
                                    multiline
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="description"
                                    label="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    value={values.description}
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
                                    name="quantityInStock"
                                    color="info"
                                    size="medium"
                                    label="Quantity"
                                    placeholder="Quantity"
                                    onBlur={handleBlur}
                                    value={values.quantityInStock}
                                    onChange={handleChange}
                                    error={
                                        !!touched.quantityInStock &&
                                        !!errors.quantityInStock
                                    }
                                    helperText={
                                        touched.quantityInStock &&
                                        errors.quantityInStock
                                    }
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="weight"
                                    color="info"
                                    size="medium"
                                    type="number"
                                    onBlur={handleBlur}
                                    value={values.weight}
                                    label="Weight"
                                    onChange={handleChange}
                                    placeholder="Weight"
                                    error={!!touched.weight && !!errors.weight}
                                    helperText={touched.weight && errors.weight}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="laborCost"
                                    color="info"
                                    size="medium"
                                    type="number"
                                    onBlur={handleBlur}
                                    value={values.laborCost}
                                    label="Labor Cost"
                                    onChange={handleChange}
                                    placeholder="Labor Cost"
                                    error={
                                        !!touched.laborCost &&
                                        !!errors.laborCost
                                    }
                                    helperText={
                                        touched.laborCost && errors.laborCost
                                    }
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    type="number"
                                    name="ratioPrice"
                                    label="Ratio of Price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Ratio of Price"
                                    value={values.ratioPrice}
                                    error={
                                        !!touched.ratioPrice &&
                                        !!errors.ratioPrice
                                    }
                                    helperText={
                                        touched.ratioPrice && errors.ratioPrice
                                    }
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    type="number"
                                    name="stonePrice"
                                    label="Stone Price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Stone Price"
                                    value={values.stonePrice}
                                    error={
                                        !!touched.stonePrice &&
                                        !!errors.stonePrice
                                    }
                                    helperText={
                                        touched.stonePrice && errors.stonePrice
                                    }
                                />
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="goldId"
                                    onBlur={handleBlur}
                                    placeholder="Type of Gold"
                                    onChange={handleChange}
                                    value={values.goldId}
                                    label="Type of Gold"
                                    error={!!touched.goldId && !!errors.goldId}
                                    helperText={touched.goldId && errors.goldId}
                                >
                                    <MenuItem value="50">Gold 10K</MenuItem>
                                    <MenuItem value="53">Gold 14K</MenuItem>
                                    <MenuItem value="54">Gold 16K</MenuItem>
                                    <MenuItem value="51">Gold 18K</MenuItem>
                                    <MenuItem value="55">Gold 20K</MenuItem>
                                    <MenuItem value="56">Gold 21K</MenuItem>
                                    <MenuItem value="57">Gold 22K</MenuItem>
                                    <MenuItem value="52">Gold 24K</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="collectionId"
                                    onBlur={handleBlur}
                                    placeholder="Collection"
                                    onChange={handleChange}
                                    value={values.collectionId}
                                    label="Collection"
                                    error={
                                        !!touched.collectionId &&
                                        !!errors.collectionId
                                    }
                                    helperText={
                                        touched.collectionId &&
                                        errors.collectionId
                                    }
                                >
                                    <MenuItem value="1">Spring</MenuItem>
                                    <MenuItem value="2">Summer</MenuItem>
                                    <MenuItem value="3">Fall</MenuItem>
                                    <MenuItem value="4">Winter</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="isJewel"
                                    onBlur={handleBlur}
                                    placeholder="Jewelry"
                                    onChange={handleChange}
                                    value={values.isJewel}
                                    label="Is Jewelry"
                                    error={
                                        !!touched.isJewel && !!errors.isJewel
                                    }
                                    helperText={
                                        touched.isJewel && errors.isJewel
                                    }
                                >
                                    <MenuItem value="1">True</MenuItem>
                                    <MenuItem value="0">False</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="isGem"
                                    onBlur={handleBlur}
                                    placeholder="Gem"
                                    onChange={handleChange}
                                    value={values.isGem}
                                    label="Is Gem"
                                    error={!!touched.isGem && !!errors.isGem}
                                    helperText={touched.isGem && errors.isGem}
                                >
                                    <MenuItem value="1">True</MenuItem>
                                    <MenuItem value="0">False</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="isActive"
                                    onBlur={handleBlur}
                                    placeholder="Active"
                                    onChange={handleChange}
                                    value={values.isActive}
                                    label="Is Activity"
                                    error={
                                        !!touched.isActive && !!errors.isActive
                                    }
                                    helperText={
                                        touched.isActive && errors.isActive
                                    }
                                >
                                    <MenuItem value="1">True</MenuItem>
                                    <MenuItem value="0">False</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="typeId"
                                    onBlur={handleBlur}
                                    placeholder="Type of Product"
                                    onChange={handleChange}
                                    value={values.typeId}
                                    label="Type of Product"
                                    error={!!touched.typeId && !!errors.typeId}
                                    helperText={touched.typeId && errors.typeId}
                                >
                                    <MenuItem value="30">Bracelet</MenuItem>
                                    <MenuItem value="31">Earring</MenuItem>
                                    <MenuItem value="32">Ring</MenuItem>
                                    <MenuItem value="33">Necklace</MenuItem>
                                    <MenuItem value="34">Charm</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <Button
                                    variant="contained"
                                    color="info"
                                    type="submit"
                                >
                                    Save product
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Card>
    );
};

export default ProductForm;
