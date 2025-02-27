import { Button, Card, Box, styled } from "@mui/material";
import { useFormik } from "formik";
import { H1 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import axios from "axios";
import { useRouter } from "next/router";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";
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
    ".agreement": {
        marginTop: 12,
        marginBottom: 24,
    },
}));

const Otp = () => {
    const nav = useRouter();
    const [otp, setOtp] = React.useState("");
    const handleOtp = (newValue) => {
        setOtp(newValue);
    };
    const email = localStorage.getItem("username");
    const handleFormSubmit = async (values) => {
        try {
            const response = await axios.post(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/user/verify-code?username=${email}&otp=${otp}`,
                {
                    username: email,
                    otp: otp,
                }
            );
            if (response.data !== null) {
                localStorage.setItem("token", response.data.data);
                nav.push("/");
            } else {
                console.log("error");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const { handleSubmit } = useFormik({
        onSubmit: handleFormSubmit,
    });
    return (
        <Wrapper elevation={3}>
            <form onSubmit={handleSubmit}>
                <BazaarImage
                    src="/assets/images/logo.svg"
                    sx={{
                        m: "auto",
                    }}
                />

                <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
                    Please Input Your OTP
                </H1>
                <MuiOtpInput
                    value={otp}
                    onChange={handleOtp}
                    length={6}
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                    }}
                />
                <Button
                    fullWidth
                    onClick={handleFormSubmit}
                    color="primary"
                    variant="contained"
                    sx={{
                        mt: 3,
                        height: 44,
                    }}
                >
                    Login
                </Button>
            </form>
        </Wrapper>
    );
};

export default Otp;
