import Link from "next/link";
import { useRouter } from "next/router";
import { Person } from "@mui/icons-material";
import { Button } from "@mui/material";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardBuyBack1List from "../../src/components/products/ProductCardBuyBack1List";
import ProductCardBuyBack2List from "../../src/components/products/ProductCardBuyBack2List";
import QCDashboardLayout from "../../src/components/layouts/customer-dashboard/QCPage";

// ===========================================================
const CartBuyBack = () => {
    const router = useRouter();
    const [cartBuyBack, setCartBuyBack] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const orderId = localStorage.getItem("orderId");
        const fetchProductBuyBack = async () => {
            try {
                const response = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/get-product-available-for-buy-back?orderId=${orderId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                console.log("Full response:", response.data);
                setCartBuyBack(response.data.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductBuyBack();
    }, []);

    console.log("cartBuyBack:", cartBuyBack);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <QCDashboardLayout>
            {/* TITLE HEADER AREA */}
            <UserDashboardHeader
                icon={Person}
                title="Order Items"
                button={
                    <Link href="/buy-back" passHref>
                        <Button
                            color="primary"
                            sx={{
                                px: 4,
                                bgcolor: "primary.light",
                            }}
                        >
                            Back to Buy Back
                        </Button>
                    </Link>
                }
                navigation={<CustomerDashboardNavigation />}
            />

            {/* ORDER ITEM LIST */}
            <div>
                {cartBuyBack.map((product, index) => (
                    <div key={index}>
                        {product.availableBuyBack ? (
                            <ProductCardBuyBack2List products={[product]} />
                        ) : (
                            <ProductCardBuyBack1List products={[product]} />
                        )}
                    </div>
                ))}
            </div>
        </QCDashboardLayout>
    );
};

export default CartBuyBack;
