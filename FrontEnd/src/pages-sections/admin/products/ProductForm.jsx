import { useEffect, useState } from "react";
import {collection, addDoc } from "firebase/firestore";
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
    } = props;

    const handleChangeDropZone = (incomingFiles) => {
        const jpegFiles = incomingFiles.filter(
            (file) => file.type === "image/jpeg"
        );

        jpegFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFiles((prevFiles) => [
                    ...prevFiles,
                    {
                        file,
                        preview: URL.createObjectURL(file),
                        base64: reader.result,
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
                                    name="name"
                                    label="Name of Product"
                                    color="info"
                                    size="medium"
                                    placeholder="Name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="barcode"
                                    label="Barcode"
                                    color="info"
                                    size="medium"
                                    placeholder="Barcode"
                                    value={values.barcode}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        !!touched.barcode && !!errors.barcode
                                    }
                                    helperText={
                                        touched.barcode && errors.barcode
                                    }
                                />
                            </Grid>

                            {/*<Grid item xs={12}>*/}
                            {/*    <DropZone onChange={(files) => handleChangeDropZone(files)}/>*/}

                            {/*    <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>*/}
                            {/*        {files.map((file, index) => (*/}
                            {/*            <UploadImageBox key={index}>*/}
                            {/*                <BazaarImage src={file.preview} width="100%"/>*/}
                            {/*                <StyledClear onClick={() => handleFileDelete(file)}/>*/}

                            {/*            </UploadImageBox>*/}
                            {/*        ))}*/}

                            {/*    </FlexBox>*/}
                            {/*</Grid>*/}

                            <Grid item xs={12}>
                                <DropZone
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
                                    name="quantity"
                                    color="info"
                                    size="medium"
                                    label="Quantity"
                                    placeholder="Quantity"
                                    onBlur={handleBlur}
                                    value={values.quantity}
                                    onChange={handleChange}
                                    error={
                                        !!touched.quantity && !!errors.quantity
                                    }
                                    helperText={
                                        touched.quantity && errors.quantity
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
                                    name="laborPrice"
                                    color="info"
                                    size="medium"
                                    type="number"
                                    onBlur={handleBlur}
                                    value={values.laborPrice}
                                    label="Labor Cost"
                                    onChange={handleChange}
                                    placeholder="Labor Cost"
                                    error={
                                        !!touched.laborPrice &&
                                        !!errors.laborPrice
                                    }
                                    helperText={
                                        touched.laborPrice && errors.laborPrice
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
                            {/* <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  name="costPrice"
                  label="Gold Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Gold Price"
                  value={values.costPrice}
                  error={!!touched.costPrice && !!errors.costPrice}
                  helperText={touched.costPrice && errors.costPrice}
                />
              </Grid> */}
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="goldType"
                                    onBlur={handleBlur}
                                    placeholder="Type of Gold"
                                    onChange={handleChange}
                                    value={values.goldType}
                                    label="Type of Gold"
                                    error={
                                        !!touched.goldType && !!errors.goldType
                                    }
                                    helperText={
                                        touched.goldType && errors.goldType
                                    }
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
                                    name="collection"
                                    onBlur={handleBlur}
                                    placeholder="Collection"
                                    onChange={handleChange}
                                    value={values.gold_type}
                                    label="Collection"
                                    error={
                                        !!touched.collection &&
                                        !!errors.collection
                                    }
                                    helperText={
                                        touched.collection && errors.collection
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
                                    name="isGem"
                                    onBlur={handleBlur}
                                    placeholder="Gem"
                                    onChange={handleChange}
                                    value={values.product_type}
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
                                    name="typeId"
                                    onBlur={handleBlur}
                                    placeholder="Type of Product"
                                    onChange={handleChange}
                                    value={values.product_type}
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
