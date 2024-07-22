import { Button, CircularProgress, Typography, Box } from "@mui/material";
import axios from "axios";
import SEO from "components/SEO";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Waiting = () => {
    const router = useRouter();
    const [page, setPage] = useState("");
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem("token");
    }

    useEffect(() => {
        const fetchStatusOrder = async () => {
            const orderId = localStorage.getItem("orderId");
            try {
                const responseGetOrderStatus = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/order/status/${orderId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setPage(responseGetOrderStatus.data.data);
            } catch (error) {
                console.error("Failed to search customers:", error);
            }
        };

        fetchStatusOrder();
        const intervalId = setInterval(fetchStatusOrder, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        if (page === "Confirm") {
            router.push("payment");
        } else if (page === "Cancel") {
            router.push("/cancel");
        }
    }, [page]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            router.push("/");
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${
            remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
    };

    return (
        <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
            <SEO title="Process Order" />

            <Typography variant="h3" align="center" sx={{ mb: 3 }}>
                Please wait for the confirmation
            </Typography>

            <CircularProgress color="primary" sx={{ mt: 3, mb: 3 }} />

            <Box>
                <Typography variant="h6" align="center">
                    Time remaining: {formatTime(timeLeft)}
                </Typography>
            </Box>
        </FlexRowCenter>
    );
};

export default Waiting;
