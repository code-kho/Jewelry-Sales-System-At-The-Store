import React, { useState, useEffect } from "react";
import axios from "axios";

const GoldPriceTable = (props) => {
    const { goldType, setGoldType } = props;
    const [goldPrice, setGoldPrice] = useState(null);
    const [error, setError] = useState(null);
    const [goldApiToken, setGoldApiToken] = useState("");
    const [newToken, setNewToken] = useState("");
    useEffect(() => {
        const getNewToken = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const newToken = await axios.post(
                        "https://four-gems-system-790aeec3afd8.herokuapp.com/token/refresh-token",
                        {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    );
                    setNewToken(newToken.data);
                } else {
                    setError("No token found. Please log in.");
                }
            } catch (e) {
                console.error("Error fetching access token:", e);
                setError("Error fetching access token.");
            }
        };
        getNewToken();
    }, []);

    useEffect(() => {
        const getAccessToken = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const accessToken = await axios.get(
                            "https://four-gems-system-790aeec3afd8.herokuapp.com/token/get-token",
                            {
                                headers: {
                                    Authorization: "Bearer " + token,
                                },
                            }
                        );
                        console.log(accessToken.error);
                        setGoldApiToken(accessToken.data);
                    } catch (goldApiToken) {}
                } else {
                    setError("No token found. Please log in.");
                }
            } catch (e) {
                console.error("Error fetching access token:", e);
                setError("Error fetching access token.");
            }
        };
        getAccessToken();
    }, []);
    console.log(goldApiToken);

    useEffect(() => {
        const fetchGoldPrice = async () => {
            try {
                const response = await axios.get(
                    "https://www.goldapi.io/api/XAU/USD",
                    {
                        headers: {
                            "x-access-token": "goldapi-1gnd90slx7lb2u5-io",
                        },
                    }
                );
                if (response.data && response.data.price) {
                    setGoldType(response.data);
                    setGoldPrice(response.data.currency);
                } else {
                    setError("Error fetching gold price.");
                }
            } catch (error) {
                console.error("Error fetching gold price:", error);
                setError("Error fetching gold price.");
            }
        };
        fetchGoldPrice();
    }, [goldApiToken]);
};

export default GoldPriceTable;
