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

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            let barcode = "";
            let lastKeyTime = Date.now();

            const onKeydown = (event) => {
                const now = Date.now();

                if (now - lastKeyTime > 100) {
                    barcode = "";
                }

                if (/^[a-zA-Z0-9]$/.test(event.key)) {
                    barcode += event.key;
                } else if (event.key === "Enter") {
                    if (barcode.length > 0) {
                        setBarcodeScan(barcode);
                        barcode = "";
                    }
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
        let token = localStorage.getItem("token");

        const fetchProByBarCode = async () => {
            if (barCode !== "No Product") {
                try {
                    const resGetByBarCode = await axios.get(
                        `https://four-gems-system-790aeec3afd8.herokuapp.com/product/get-product-by-barcode?countId=${counterId}&barcode=${barCode}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const product = resGetByBarCode.data.data;
                    setGetProductByBarCode(product);
                    handleAddToCart(product);
                    setBarcodeScan("No Product");
                } catch (e) {
                    console.log(e);
                }
            }
        };
        fetchProByBarCode();
    }, [barCode]);

    const handleAddToCart = (product) => {
        const cartItem = state.cart.find((item) => item.id === product.productId);
        const payload = {
            id: product.productId,
            name: product.productName,
            price: product.price,
            imgUrl: product.image,
            qty: (cartItem?.qty || 0) + 1,
        };
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload,
        });
        enqueueSnackbar("Added to Cart", {
            variant: "success",
        });
    };

    console.log(barCode);
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
