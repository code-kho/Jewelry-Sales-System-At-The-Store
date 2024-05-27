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
import api from "utils/__api__/products";
import goldPriceTable from "./gold-price-table";
import GoldPriceTable from "./gold-price-table"; // styled component

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
    const goldData = [
        { kind: '24K Gold', usdPrice: 76.3956, vndPrice: 1940000 },
        { kind: '22K Gold', usdPrice: 69.9916, vndPrice: 1940000 },
        { kind: '21K Gold', usdPrice: 66.8102, vndPrice: 1940000 },
        { kind: '20K Gold', usdPrice: 63.6287, vndPrice: 1940000 },
        { kind: '18K Gold', usdPrice: 57.2659, vndPrice: 1940000 },
        { kind: '16K Gold', usdPrice: 50.903, vndPrice: 1940000 },
        { kind: '14K Gold', usdPrice: 44.5401, vndPrice: 1940000 },
        { kind: '10K Gold', usdPrice: 31.8144, vndPrice: 1940000 },
    ];
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
                <div style={{
                    display: "grid",
                    textAlign: "center",
                    paddingBottom: "1.5rem",
                }}>
                    <H1 fontSize={40}> Gold and Currency Price </H1>
                    <H2 fontSize={32}> Update at ... </H2>

                </div>

                <div className="container">
                    <table className="gold-table">
                        <thead>
                        <tr>
                            <th>Kind of Gold</th>
                            <th>Price (USD/Gram)</th>
                            <th>Price (VND/Gram)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {goldData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.kind}</td>
                                <td>{row.usdPrice}</td>
                                <td>{row.vndPrice}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <style jsx>{`
                        .container {
                            margin: 20px;
                            font-family: "Comic Neue";
                            font-size: 28px;
                        }

                        .gold-table {
                            width: 100%;
                            border-collapse: collapse;
                            background-color: #ffffff;
                        }

                        .gold-table th, .gold-table td {
                            border: 1px solid #000;
                            padding: 8px;
                            text-align: center;
                            color: #D4AF37;
                            //font-weight: bold;
                        }

                        .gold-table th {
                            background-color: #BADDF4;
                            color: #102E46;
                        }
                    `}</style>
                </div>

                {relatedProducts && <RelatedProducts productsData={relatedProducts}/>}

                <div style={{
                    display: "grid",
                    textAlign: "center",
                    paddingBottom: "1.5rem",
                }}>
                    <H1> Four Gems Jewelry </H1>
                </div>

                <GoldPriceTable/>
            </Container>
        </ShopLayout1>
    );

};


export default GoldPage;
