import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import { H1 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import ProductDescription from "components/products/ProductDescription";
import CareAndMaintenance from "components/products/CareAndMaintenance";
import axios from "axios"; // styled component
import { jwtDecode } from "jwt-decode";

const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 0,
    marginTop: 40,
    marginBottom: 24,
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
    "& .inner-tab": {
        minHeight: 40,
        fontWeight: 600,
        textTransform: "capitalize",
        margin: "0 5rem",
        fontSize: "1.3rem",
    },
})); // ===============================================================

// ===============================================================
const ProductDetails = (props) => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(0);
    const [product, setProduct] = useState({});
    // const[id, setId] = useState(0);
    const handleOptionClick = (_, value) => setSelectedOption(value); // Show a loading state when the fallback is rendered
    // setId(router.query.id)
    const id = router.query.id;
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = sessionStorage.getItem("token");
    } else {
    }
    useEffect(() => {
        const fetchData = async () => {
            const decoded = jwtDecode(token);
            const counterId = decoded?.counterId;
            try {
                if (token) {
                    const response = await axios.get(
                        `https://four-gems-system-790aeec3afd8.herokuapp.com/product/get-product-by-id?productId=${id}&countId=${counterId}`,
                        {
                            headers: {
                                Authorization: `Bearer ` + token,
                            },
                        }
                    );
                    setProduct(response.data.data);
                } else {
                    console.warn(
                        "Token is missing. Please ensure it's properly set."
                    );
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchData();
    }, [id]);
    return (
        <ShopLayout1>
            <Container
                sx={{
                    mt: 2,
                }}
            >
                {/* PRODUCT DETAILS INFO AREA */}
                {product ? (
                    <ProductIntro product={product} />
                ) : (
                    <H2>Loading...</H2>
                )}

                <div
                    style={{
                        display: "grid",
                        textAlign: "center",
                        paddingBottom: "1.5rem",
                    }}
                >
                    <H1> Four Gems Jewelry </H1>
                </div>
            </Container>
        </ShopLayout1>
    );
};

export default ProductDetails;
