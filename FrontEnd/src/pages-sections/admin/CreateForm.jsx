import { Button, Card, Grid, TextField } from "@mui/material";
import { Formik } from "formik";

export const CreateForm = (props) => {
    const { initialValues, validationSchema, handleFormSubmit } = props;
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
                                    name="categoryName"
                                    label="Name of Product"
                                    color="info"
                                    size="medium"
                                    placeholder="Name of Category"
                                    value={values.categoryName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        !!touched.categoryName &&
                                        !!errors.categoryName
                                    }
                                    helperText={
                                        touched.categoryName &&
                                        errors.categoryName
                                    }
                                />
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
