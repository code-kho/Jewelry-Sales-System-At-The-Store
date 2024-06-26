import { useCallback, useState } from "react";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import axios from "axios";
import { useRouter } from "next/router";

const fbStyle = {
    background: "#3B5998",
    color: "white",
};
const googleStyle = {
    background: "#4285F4",
    color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
    <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
    width: 500,
    padding: "2rem 3rem",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
    ".passwordEye": {
        color: passwordVisibility
            ? theme.palette.grey[600]
            : theme.palette.grey[400],
    },
    ".facebookButton": {
        marginBottom: 10,
        ...fbStyle,
        "&:hover": fbStyle,
    },
    ".googleButton": { ...googleStyle, "&:hover": googleStyle },
    ".agreement": {
        marginTop: 12,
        marginBottom: 24,
    },
}));

const Login = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisibility((visible) => !visible);
    }, []);
    const nav = useRouter();

    const handleFormSubmit = async (values) => {
        // console.log(values);
        // gọi api post, truyền password vaf username về theo form BE, lấy dc response != "" => log
        // if
        // http://localhost:8080/user/signin?username=${email}&password=${password}
        const { email, password } = values;

        console.log(
            `http://localhost:8080/user/signin?username=${email}&password=${password}`
        );
        localStorage.setItem("username", email);
        try {
            const response = await axios.post(
                `https://four-gems-api-c21adc436e90.herokuapp.com/user/signin?username=${email}&password=${password}`,
                {
                    username: email,
                    password: password,
                }
            );
            console.log(response.data.data !== undefined);
            // if (response.data.data !== "") {
            //     console.log("successfully logged in");

            //     nav.push("/");
            // } else {
            //     console.log("error");
            // }
            if (response.data.data !== "") {
                console.log("successfully logged in");
                nav.push("/otp");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            onSubmit: handleFormSubmit,
            validationSchema: formSchema,
        });
    return (
        <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
            <form onSubmit={handleSubmit}>
                <BazaarImage
                    src="/assets/images/logo.svg"
                    sx={{
                        m: "auto",
                    }}
                />

                <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
                    Welcome To Shop
                </H1>

                <BazaarTextField
                    mb={1.5}
                    fullWidth
                    name="email"
                    size="small"
                    type="text"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    label="Email or Phone Number"
                    placeholder="exmple@mail.com"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                />

                <BazaarTextField
                    mb={2}
                    fullWidth
                    size="small"
                    name="password"
                    label="Password"
                    autoComplete="on"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    placeholder="*********"
                    type={passwordVisibility ? "text" : "password"}
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    InputProps={{
                        endAdornment: (
                            <EyeToggleButton
                                show={passwordVisibility}
                                click={togglePasswordVisibility}
                            />
                        ),
                    }}
                />

                <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                        height: 44,
                    }}
                >
                    Login
                </Button>
            </form>

            {/* <SocialButtons /> */}

            {/*<FlexRowCenter mt="1.25rem">*/}
            {/*  <Box>Don&apos;t have account?</Box>*/}
            {/*  <Link href="/signup" passHref legacyBehavior>*/}
            {/*    <a>*/}
            {/*      <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">*/}
            {/*        Sign Up*/}
            {/*      </H6>*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*</FlexRowCenter>*/}

            <FlexBox
                justifyContent="center"
                bgcolor="grey.200"
                borderRadius="4px"
                py={2.5}
                mt="1.25rem"
            >
                Forgot your password?
                <Link href="/reset-password" passHref legacyBehavior>
                    <a>
                        <H6
                            ml={1}
                            mt={0.3}
                            borderBottom="1px solid"
                            borderColor="grey.900"
                        >
                            Reset It
                        </H6>
                    </a>
                </Link>
            </FlexBox>
        </Wrapper>
    );
};

const initialValues = {
    email: "",
    password: "",
};
const formSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup.string().required("Username is required"),
});
export default Login;
