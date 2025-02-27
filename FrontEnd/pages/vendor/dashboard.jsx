import { Box, Grid } from "@mui/material";
import Card1 from "pages-sections/dashboard/Card1";
import Section3 from "pages-sections/dashboard/Section3";
import WishCard from "pages-sections/dashboard/WishCard";
import Analytics from "pages-sections/dashboard/Analytics";
import RecentPurchase from "pages-sections/dashboard/RecentPurchase";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import StockOutProducts from "pages-sections/dashboard/StockOutProducts";
import api from "utils/__api__/dashboard";
import { useGetDate, useYesterdayDate } from "../../src/hooks/useGetDate";
import { useEffect, useState } from "react";
import axios from "axios"; // =============================================================================
import { jwtDecode } from "jwt-decode";

VendorDashboard.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function VendorDashboard(props) {
    const { cardList, recentPurchase, stockOutProducts } = props;
    const { startDate, endDate } = useGetDate();
    const [order, setOrder] = useState(); //Orders Today
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem("token");
    } else {
        // If neither localStorage nor sessionStorage is supported
    }
    useEffect(() => {
        const fetchOrder = async () => {
            const decoded = jwtDecode(token);
            const counterId = decoded?.counterId;
            try {
                const resOrder = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/order/get-number-order-by-date?countId=${counterId}&startDate=${endDate}&endDate=${endDate}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setOrder(resOrder.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchOrder();
    }, []);
    const { yesStartDate, yesEndDate } = useYesterdayDate();
    const [orderY, setOrderY] = useState(); //Orders Yesterday
    useEffect(() => {
        const fetchOrderY = async () => {
            const decoded = jwtDecode(token);
            const counterId = decoded?.counterId;
            try {
                const resOrderY = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/order/get-number-order-by-date?countId=${counterId}&startDate=${yesStartDate}&endDate=${yesEndDate}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setOrderY(resOrderY.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchOrderY();
    }, []);
    const [items, setItems] = useState(); //Items Today
    useEffect(() => {
        const fetchItem = async () => {
            const decoded = jwtDecode(token);
            const counterId = decoded?.counterId;
            try {
                const resItems = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/order/get-number-item-by-date?countId=${counterId}&startDate=${startDate}&endDate=${endDate}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setItems(resItems.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchItem();
    }, []);
    const [outOfStock, setOutOfStock] = useState(); //Items Yesterday
    useEffect(() => {
        const fetchOutStock = async () => {
            try {
                const decoded = jwtDecode(token);
                const counterId = decoded?.counterId;
                const resOutStock = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/get-product-out-of-stock?countId=${counterId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );

                setOutOfStock(resOutStock.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchOutStock();
    }, []);
    const [itemsY, setItemsY] = useState(); //Items Yesterday
    useEffect(() => {
        const fetchItemY = async () => {
            const decoded = jwtDecode(token);
            const counterId = decoded?.counterId;
            try {
                const resItemsY = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/order/get-number-item-by-date?countId=${counterId}&startDate=${yesStartDate}&endDate=${yesEndDate}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );

                setItemsY(resItemsY.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchItemY();
    }, []);
    const [kpiStaff, setKpiStaff] = useState();
    useEffect(() => {
        const fetchKpiStaff = async () => {
            const decoded = jwtDecode(token);
            const counterId = decoded?.counterId;
            try {
                const resKpiStaff = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/user/get-top-5?countId=${counterId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                console.log(resKpiStaff.data);
                setKpiStaff(resKpiStaff.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchKpiStaff();
    }, []);
    return (
        <Box py={4}>
            <Grid container spacing={3}>
                {/* WISHING CARD */}
                <Grid item md={6} xs={12}>
                    <WishCard />
                </Grid>

                {/* ALL TRACKING CARDS */}
                <Grid container item md={6} xs={12} spacing={3}>
                    <Grid item md={6} sm={6} xs={12}>
                        <Card1
                            title="Orders"
                            amount1={order}
                            amount2={orderY}
                        />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <Card1
                            title="Items Sold"
                            amount1={items}
                            amount2={itemsY}
                        />
                    </Grid>
                </Grid>

                {/* SALES AREA */}
                <Grid item xs={12}>
                    <Section3 />
                </Grid>

                {/* ANALYTICS AREA */}
                <Grid item xs={12}>
                    <Analytics />
                </Grid>

                {/* RECENT PURCHASE AREA */}
                <Grid item md={7} xs={12}>
                    <RecentPurchase data={kpiStaff} />
                </Grid>

                {/* STOCK OUT PRODUCTS */}
                <Grid item md={5} xs={12}>
                    <StockOutProducts data={outOfStock} />
                </Grid>
            </Grid>
        </Box>
    );
}
export const getStaticProps = async () => {
    const cardList = await api.getAllCard();
    const recentPurchase = await api.recentPurchase();
    const stockOutProducts = await api.stockOutProducts();
    return {
        props: {
            cardList,
            recentPurchase,
            stockOutProducts,
        },
    };
};
