import { Box, useTheme } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Section5 from "pages-sections/market-2/Section5";
import Section6 from "pages-sections/market-2/Section6";
import Section7 from "pages-sections/market-2/Section7";
import Section8 from "pages-sections/market-2/Section8";
import Section9 from "pages-sections/market-2/Section9";
import ShopLayout1 from "components/layouts/ShopLayout1";
import api from "utils/__api__/market-2";
import { useRouter } from "next/router"; // =======================================================
import { H1 } from "components/Typography";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// =======================================================
const Market = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const [showBraceletProduct, setShowBraceletProduct] = useState([]);
    const [showRingProduct, setShowRingProduct] = useState([]);
    const [showEarringProduct, setShowEarringProduct] = useState([]);
    const [showNecklaceProduct, setShowNecklaceProduct] = useState([]);
    const [showCharmProduct, setShowCharmProduct] = useState([]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }
            const decoded = jwtDecode(token);
            localStorage.setItem("role", decoded.role);
            localStorage.setItem("counterId", decoded?.counterId);
            if (decoded?.role === "staff") {
                router.push("/");
            } else if (decoded?.role === "QC") {
                router.push("/qcpage");
            } else {
                router.push("/vendor/dashboard");
            }
        }
    }, []);
    useEffect(() => {
        const fetchProductBracelet = async () => {
            const token = localStorage.getItem("token");
            const counterId = localStorage.getItem("counterId");
            try {
                const resBraceletProduct = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/show-product?countId=${counterId}&pageSize=100&page=0&sortKeyword=productId&sortType=ASC&categoryName=bracelet&searchKeyword= `,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );

                setShowBraceletProduct(
                    resBraceletProduct?.data?.data.filter(
                        (res) => res.active === true
                    )
                );
            } catch (e) {
                console.log(e);
            }
        };
        fetchProductBracelet();
    }, []);

    useEffect(() => {
        const fetchProductRing = async () => {
            const token = localStorage.getItem("token");
            const counterId = localStorage.getItem("counterId");
            try {
                const resRingProduct = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/show-product?countId=${counterId}&pageSize=100&page=0&sortKeyword=price&sortType= &categoryName=ring&searchKeyword= `,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setShowRingProduct(
                    resRingProduct?.data?.data.filter(
                        (res) => res.active === true
                    )
                );
            } catch (e) {
                console.log(e);
            }
        };
        fetchProductRing();
    }, []);

    useEffect(() => {
        const fetchProductEarring = async () => {
            const token = localStorage.getItem("token");
            const counterId = localStorage.getItem("counterId");
            try {
                const resEarringProduct = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/show-product?countId=${counterId}&pageSize=100&page=0&sortKeyword=price&sortType= &categoryName=earring&searchKeyword= `,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setShowEarringProduct(
                    resEarringProduct?.data?.data.filter(
                        (res) => res.active === true
                    )
                );
            } catch (e) {
                console.log(e);
            }
        };
        fetchProductEarring();
    }, []);

    useEffect(() => {
        const fetchProductNecklaces = async () => {
            const token = localStorage.getItem("token");
            const counterId = localStorage.getItem("counterId");
            try {
                const resNecklacesProduct = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/show-product?countId=${counterId}&pageSize=100&page=0&sortKeyword=price&sortType= &categoryName=necklace&searchKeyword= `,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setShowNecklaceProduct(
                    resNecklacesProduct?.data?.data.filter(
                        (res) => res.active === true
                    )
                );
            } catch (e) {
                console.log(e);
            }
        };
        fetchProductNecklaces();
    }, []);

    useEffect(() => {
        const fetchProductCharm = async () => {
            const token = localStorage.getItem("token");
            const counterId = localStorage.getItem("counterId");
            try {
                const resCharmProduct = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/show-product?countId=${counterId}&pageSize=100&page=0&sortKeyword=productId&sortType=ASC&categoryName=charm&searchKeyword= `,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setShowCharmProduct(
                    resCharmProduct?.data?.data.filter(
                        (res) => res.active === true
                    )
                );
            } catch (e) {
                console.log(e);
            }
        };
        fetchProductCharm();
    }, []);

    return (
        <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
            <SEO title="FourGemsShop" />
            <Box bgcolor="#FFFFFF">
                {/* Necklaces */}
                <Section5 products={showNecklaceProduct} />

                {/*/!* Rings*!/*/}
                <Section6 products={showRingProduct} />

                {/*/!* Earrings *!/*/}
                <Section7 products={showEarringProduct} />

                {/*  Charm */}
                <Section8 products={showCharmProduct} />

                {/* Bracelet */}
                <Section9 products={showBraceletProduct} />

                <div
                    style={{
                        display: "grid",
                        textAlign: "center",
                        paddingBottom: "1.5rem",
                    }}
                >
                    <H1> Four Gems Jewelry </H1>
                </div>
            </Box>
            {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
            <Setting />
        </ShopLayout1>
    );
};

export const getStaticProps = async () => {
    const products = await api?.getProducts();
    const serviceList = await api?.getServices();
    const categories = await api?.getCategories();
    const mainCarouselData = await api?.getMainCarouselData();
    const menFashionProducts = await api?.getMenFashionProducts();
    const electronicsProducts = await api?.getElectronicsProducts();
    const womenFashionProducts = await api?.getWomenFashionProducts();
    return {
        props: {
            products,
            categories,
            serviceList,
            mainCarouselData,
            menFashionProducts,
            electronicsProducts,
            womenFashionProducts,
        },
    };
};
export default Market;
