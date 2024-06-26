import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H1, H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import GoldPriceTable from "./gold-price-table";

import axios from "axios";

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
}));

const GoldPage = (props) => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(0);
    const [goldType, setGoldType] = useState(null);
    const [VNDPrice, setVNDPrice] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchVNDPrice = async () => {
            try {
                const response = await axios.get(
                    "https://v6.exchangerate-api.com/v6/ee99510cfff86d6a1abd06e9/latest/USD?fbclid=IwZXh0bgNhZW0CMTAAAR37CxmzoLLTk9IY5UXhq2AFF_pitJhnjHwuMpfZLc5QeRwzu4hpCx6CNiY_aem_AVQHYNMmVwUvG5V3Agzhse0Mo_tq1m1HwCIRdyRrZ4u_gR5Of4PSz3mIsM8t-7gIkDyotlHJNpG6Nu8UI43CJ8Fp"
                );
                // console.log(response.data.conversion_rates.SGD); // Ghi log dữ liệu phản hồi vào console
                if (response.data) {
                    // Kiểm tra nếu có thuộc tính 'price'
                    setVNDPrice(response.data.conversion_rates.VND);
                } else {
                    setError("Không thể vnd.");
                }
            } catch (error) {
                console.error("Lỗi khi lấy giá vnd:", error);
                setError("Lỗi khi lấy giá vnd.");
            }
        };

        fetchVNDPrice();
    }, []);

    console.log(VNDPrice);
    const goldData = [
        { type: "24k Gold", price: goldType?.price_gram_24k },
        { type: "22k Gold", price: goldType?.price_gram_22k },
        { type: "21k Gold", price: goldType?.price_gram_21k },
        { type: "20k Gold", price: goldType?.price_gram_20k },
        { type: "18k Gold", price: goldType?.price_gram_18k },
        { type: "16k Gold", price: goldType?.price_gram_16k },
        { type: "14k Gold", price: goldType?.price_gram_14k },
        { type: "10k Gold", price: goldType?.price_gram_10k },
    ];
    const handleOptionClick = (_, value) => setSelectedOption(value);

    // if (router.isFallback) {
    //     return <h1>Loading...</h1>;
    // }

    // if (!respone.ok) {
    //     throw new Error("Something went wrong!");
    // }

    // if (isLoading) {
    //     return (
    //         <SpinnerLoading/>
    //     );
    // }

    // if (httpError) {
    //     return (
    //         <div className="container mt-5">
    //             <p>{httpError}</p>
    //         </div>
    //     );
    // }

    const convertVND = (price) =>
        (price * VNDPrice).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

    return (
        <ShopLayout1>
            <Container>
                <div
                    style={{
                        display: "grid",
                        textAlign: "center",
                        paddingBottom: "1.5rem",
                        paddingTop: "1.5rem",
                    }}
                >
                    <H1 fontSize={40}>Gold and Currency Price</H1>
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
                            {goldData?.map(({ type, price }) => (
                                <tr key={type}>
                                    <td>{type}</td>
                                    <td>{price}</td>
                                    <td>{convertVND(price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/*{relatedProducts && <RelatedProducts productsData={relatedProducts} />}*/}

                <div
                    style={{
                        display: "grid",
                        textAlign: "center",
                        paddingBottom: "1.5rem",
                    }}
                >
                    <H1>Four Gems Jewelry</H1>
                </div>

                <GoldPriceTable setGoldType={setGoldType} goldType={goldType} />

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

                    .gold-table th,
                    .gold-table td {
                        border: 1px solid #000;
                        padding: 8px;
                        text-align: center;
                        color: #d4af37;
                    }

                    .gold-table th {
                        background-color: #baddf4;
                        color: #102e46;
                    }
                `}</style>
            </Container>
        </ShopLayout1>
    );
};

export default GoldPage;

// export const getStaticProps = async ({ params }) => {
//     const relatedProducts = await getRelatedProducts();
//     return {
//         props: {
//             relatedProducts,
//         },
//     };
// };
