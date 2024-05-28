import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H1, H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import RelatedProducts from "components/products/RelatedProducts";
import GoldPriceTable from "./gold-price-table";
import {getRelatedProducts} from "../../src/utils/__api__/related-products";
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
        margin: '0 5rem',
        fontSize: '1.3rem',
    },
}));

const GoldPage = (props) => {
    const { frequentlyBought, relatedProducts, product } = props;
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(0);
<<<<<<< HEAD
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
=======
    const [goldType, setGoldType] = useState(null);
    const [VNDPrice, setVNDPrice] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchVNDPrice = async () => {
            try {
                const response = await axios.get('https://v6.exchangerate-api.com/v6/ee99510cfff86d6a1abd06e9/latest/USD?fbclid=IwZXh0bgNhZW0CMTAAAR37CxmzoLLTk9IY5UXhq2AFF_pitJhnjHwuMpfZLc5QeRwzu4hpCx6CNiY_aem_AVQHYNMmVwUvG5V3Agzhse0Mo_tq1m1HwCIRdyRrZ4u_gR5Of4PSz3mIsM8t-7gIkDyotlHJNpG6Nu8UI43CJ8Fp');
                // console.log(response.data.conversion_rates.SGD); // Ghi log dữ liệu phản hồi vào console
                if (response.data) { // Kiểm tra nếu có thuộc tính 'price'
                    setVNDPrice(response.data.conversion_rates.VND);
                } else {
                    setError('Không thể vnd.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy giá vndd:', error);
                setError('Lỗi khi lấy giá vnd.');
            }
        };

        fetchVNDPrice();
    }, []);

    console.log(VNDPrice)
    const goldData = [
        { type: '24k Gold', price: goldType?.price_gram_24k },
        { type: '22k Gold', price: goldType?.price_gram_22k },
        { type: '21k Gold', price: goldType?.price_gram_21k },
        { type: '20k Gold', price: goldType?.price_gram_20k },
        { type: '18k Gold', price: goldType?.price_gram_18k },
        { type: '16k Gold', price: goldType?.price_gram_16k },
        { type: '14k Gold', price: goldType?.price_gram_14k },
        { type: '10k Gold', price: goldType?.price_gram_10k },
    ]
    const handleOptionClick = (_, value) => setSelectedOption(value);

>>>>>>> trung
    if (router.isFallback) {
        return <h1>Loading...</h1>;
    }

    const convertVND = (price) => (price * VNDPrice).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });;

    return (
        <ShopLayout1>
<<<<<<< HEAD
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
=======
            <Container>
                <div style={{ display: "grid", textAlign: "center", paddingBottom: "1.5rem" }}>
                    <H1 fontSize={40}>Gold and Currency Price</H1>
>>>>>>> trung
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

                <div style={{ display: "grid", textAlign: "center", paddingBottom: "1.5rem" }}>
                    <H1>Four Gems Jewelry</H1>
                </div>

                <GoldPriceTable setGoldType={setGoldType}  goldType={goldType}/>

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
          }

          .gold-table th {
            background-color: #BADDF4;
            color: #102E46;
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