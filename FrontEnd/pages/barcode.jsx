import { useState, useEffect } from "react";
import Navbar from "../src/components/navbar/Navbar";
import Topbar from "../src/components/topbar/Topbar";
import Header from "../src/components/header/Header";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAppContext } from "contexts/AppContext";

const BarCodeTest = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { state, dispatch } = useAppContext();
    const [barCode, setBarcodeScan] = useState("No Product");
    const [getProductByBarCode, setGetProductByBarCode] = useState();
    const [isClient, setIsClient] = useState(false);
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
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            let barcode = "";
            let lastKeyTime = Date.now();

            const onKeydown = (event) => {
                const now = Date.now();

                // Reset barcode if too much time has passed since the last key press
                if (now - lastKeyTime > 100) {
                    barcode = "";
                }

                // Process only alphanumeric keys (ignore special keys)
                if (/^[a-zA-Z0-9]$/.test(event.key)) {
                    barcode += event.key;
                } else if (event.key === "Enter") {
                    // Check if the barcode length is correct and set the barcode state
                    if (barcode.length > 0) {
                        setBarcodeScan(barcode);
                    }
                    barcode = "";
                }

                lastKeyTime = now;
            };

            document.addEventListener("keydown", onKeydown);

            return () => {
                document.removeEventListener("keydown", onKeydown);
            };
        }
    }, [isClient]);

    useEffect(() => {
        const counterId = localStorage.getItem("counterId");
        if (barCode !== "No Product") {
            const fetchProByBarCode = async () => {
                try {
                    const resGetByBarCode = await axios.get(
                        `https://four-gems-api-c21adc436e90.herokuapp.com/product/get-product-by-barcode?countId=${counterId}&barcode=${barCode}`,
                        {
                            headers: {
                                Authorization: "Bearer " + token, //the token is a variable which holds the token
                            },
                        }
                    );
                    const product = resGetByBarCode.data.data;
                    setGetProductByBarCode(product);
                    handleAddToCart(product);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchProByBarCode();
        }
    }, [barCode, token]);
    console.log(barCode)
    const handleAddToCart = (product) => {
        const payload = {
            id: product.productId,
            name: product.productName,
            price: product.price,
            imgUrl: product.image,
            qty: 1,
        };
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload,
        });
        enqueueSnackbar("Added to Cart", {
            variant: "success",
        });
    };

    return (
        <div>
            <Topbar />
            <Header />
            <Navbar />
            <h1 style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
                You have added a {getProductByBarCode ? getProductByBarCode.productName : "No product"} to the cart.
            </h1>
        </div>
    );
};

export default BarCodeTest;