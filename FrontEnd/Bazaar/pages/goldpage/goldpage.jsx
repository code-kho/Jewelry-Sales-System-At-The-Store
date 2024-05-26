import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import { H1 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import RelatedProducts from "components/products/RelatedProducts";
import ProductDescription from "components/products/ProductDescription";
import CareAndMaintenance from "components/products/CareAndMaintenance";
import {
    getFrequentlyBought,
    getRelatedProducts,
} from "utils/__api__/related-products";
import api from "utils/__api__/products"; // styled component

const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 0,
    marginTop: 40,
    marginBottom: 24,
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
    "& .inner-tab": {
        minHeight: 40,
        fontWeight: 600,
        textTransform: "capitalize",
        margin: '0 5rem',
        fontSize: '1.3rem',
    },
})); // ===============================================================

// ===============================================================
const GoldPage = (props) => {
    const { frequentlyBought, relatedProducts, product } = props;
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(0);

    const handleOptionClick = (_, value) => setSelectedOption(value); // Show a loading state when the fallback is rendered

    if (router.isFallback) {
        return <h1>Loading...</h1>;
    }

    return (
        <ShopLayout1>
            <Container
                sx={{
                    // mt: 0,
                }}
            >


        <div>
            <table></table>
        </div>



                <div style={{
                    display: "grid",
                    textAlign: "center",
                    paddingBottom: "1.5rem",
                }}>
                    <H1> Four Gems Jewelry </H1>
                </div>
            </Container>
        </ShopLayout1>
    );
};


export default GoldPage;
