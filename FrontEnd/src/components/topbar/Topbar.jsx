import Link from "next/link";
import { useEffect, useState } from "react";
import { CallOutlined, MailOutline } from "@mui/icons-material";
import { Box, Container, styled, Typography } from "@mui/material";
import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { layoutConstant } from "utils/constants"; // styled component

const TopbarWrapper = styled(Box, {
    shouldForwardProp: (props) => props !== "bgColor",
})(({ theme, bgColor }) => ({
    fontSize: 15,
    height: "60px",
    background: bgColor || theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "& .topbarLeft": {
        "& .logo": {
            display: "none",
        },
        "& .title": {
            marginLeft: "10px",
        },
        "@media only screen and (max-width: 900px)": {
            "& .logo": {
                display: "block",
            },
            "& > *:not(.logo)": {
                display: "none",
            },
        },
    },
    "& .topbarRight": {
        display: "flex",
        alignItems: "center",
        "& .link": {
            paddingRight: 30,
            color: theme.palette.secondary.contrastText,
        },
        "@media only screen and (max-width: 900px)": {
            "& .link": {
                display: "none",
            },
        },
    },
    "& .menuItem": {
        minWidth: 100,
    },
    "& .marginRight": {
        marginRight: "1.25rem",
    },
    "& .handler": {
        height: layoutConstant.topbarHeight,
    },
    "& .smallRoundedImage": {
        height: 15,
        width: 25,
        borderRadius: 2,
    },
    "& .menuTitle": {
        fontSize: 12,
        marginLeft: "0.5rem",
        fontWeight: 600,
    },
})); // ===========================================

// ===========================================
const Topbar = ({ bgColor }) => {
    useEffect(() => {
    }, []);

    return (
        <TopbarWrapper bgColor={bgColor}>
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <FlexBox className="topbarLeft" alignItems="center">
                    <div className="logo">
                        <Link href="/" passHref>
                            <Image
                                display="block"
                                height="28px"
                                src="/assets/images/logo.svg"
                                alt="logo"
                            />
                        </Link>
                    </div>

                    <FlexBox alignItems="center">
                        <CallOutlined fontSize="small" />
                        <Span className="title">0902 999 777</Span>
                    </FlexBox>

                    <FlexBox alignItems="center" ml={2.5}>
                        <MailOutline fontSize="small" />
                        <Span className="title">fourgems2024@gmail.com</Span>
                    </FlexBox>
                </FlexBox>

                <FlexBox className="topbarRight" alignItems="center">
                    {/* <Typography sx={{ paddingRight: "15px" }}>Counter: {counterId}</Typography> */}
                    <Typography sx={{ paddingRight: "15px" }}>EN</Typography>
                    <Typography sx ={{mr:"3px"}}>USD</Typography>
                </FlexBox>
            </Container>
        </TopbarWrapper>
    );
};

const languageList = [
    {
        title: "EN",
        imgUrl: "/assets/images/flags/usa.png",
    },
];
const currencyList = [
    {
        title: "USD",
        imgUrl: "/assets/images/flags/usa.png",
    },
];
export default Topbar;
