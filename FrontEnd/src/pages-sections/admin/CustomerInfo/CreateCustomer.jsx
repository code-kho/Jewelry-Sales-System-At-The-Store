import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
const CreateCustomer = (props) => {
    const { initialValues, validationSchema, handleFormSubmit } = props;
    return (
        <Card
            sx={{
                p: 6,
            }}
        >
            <Formik
                onSubmit={handleFormSubmit}
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
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Full Name"
                                    color="info"
                                    size="medium"
                                    placeholder="Full Name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    color="info"
                                    size="medium"
                                    placeholder="Address"
                                    value={values.address}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    color="info"
                                    size="medium"
                                    placeholder="Email"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="phoneNumber"
                                    label="Phone Number"
                                    color="info"
                                    size="medium"
                                    placeholder="Phone Number"
                                    value={values.phoneNumber}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="gender"
                                    onBlur={handleBlur}
                                    placeholder="Gender"
                                    onChange={handleChange}
                                    value={values.gender}
                                    label="Gender"
                                    error={!!touched.gender && !!errors.gender}
                                    helperText={touched.gender && errors.gender}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <Button variant="contained" color="info" type="submit">
                                    Add Customer
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Card>
    );
};

export default CreateCustomer;
