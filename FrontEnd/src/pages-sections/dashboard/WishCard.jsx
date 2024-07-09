import NextImage from "next/image";
import { Box, Card } from "@mui/material";
import { H1, H2, H5, Paragraph } from "components/Typography";
import { currency } from "lib";
import { useGetDate } from "../../hooks/useGetDate";
import { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerLoading } from "../../utils/__api__/spiner";
import { jwtDecode } from "jwt-decode";

const WishCard = () => {
    const { startDate, endDate } = useGetDate();
    const [start, setStart] = useState();
    const [name, setName] = useState();
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem("token");
    } else {
        // If neither localStorage nor sessionStorage is supported
        console.log("Web Storage is not supported in this environment.");
    }
    useEffect(() => {
        const decoded = jwtDecode(token);
        // console.log(decoded)
        const fetchDataName = async () => {
            try {
                const resName = await axios.post(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/user/get-info-by-token?token=${token}`,
                    {},
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setName(decoded.name);
            } catch (e) {
                console.log(e);
            }
        };
        fetchDataName();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const counterId = localStorage.getItem("counterId");
            try {
                //http://localhost:8080/order/get-money-by-date?countId=1&startDate=2021-05-29&endDate=2024-05-29
                const res = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/order/get-money-by-date?countId=${counterId}&startDate=${endDate}&endDate=${endDate}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                // console.log(res.data)
                setStart(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);
    // console.log(name)
    return (
        <Card
            sx={{
                p: 3,
                height: "100%",
                display: "flex",
                position: "relative",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    mb: 6,
                }}
            >
                <H2 color="info.main" mb={0.5}>
                    Hello, Welcome back.
                </H2>
                <H5 color="grey.600">
                    Here’s what happening with your store today!
                </H5>
                <H1 mt={1}>
                    {isNaN(start) ? <SpinnerLoading /> : currency(start)}
                </H1>
                <H5 color="grey.600">Today’s total sales</H5>
            </Box>
            <Box
                sx={{
                    right: 24,
                    bottom: 0,
                    position: "absolute",
                    display: {
                        xs: "none",
                        sm: "block",
                    },
                }}
            >
                <NextImage
                    src="/assets/images/illustrations/dashboard/welcome.svg"
                    width={180}
                    height={160}
                    alt="Welcome"
                />
            </Box>
        </Card>
    );
};

export default WishCard;
