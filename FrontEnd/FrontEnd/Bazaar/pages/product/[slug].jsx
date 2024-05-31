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
const ProductDetails = (props) => {
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
          mt: 2,
        }}
      >
        {/* PRODUCT DETAILS INFO AREA */}
        {product ? <ProductIntro product={product} /> : <H2>Loading...</H2>}

        {/* PRODUCT DESCRIPTION AND REVIEW */}
        <div style={{backgroundColor: "#FFFFFF", paddingBottom: "1.5rem"}}>
          <StyledTabs
              textColor="primary"
              value={selectedOption}
              indicatorColor="primary"
              onChange={handleOptionClick}
              centered
          >
            <Tab className="inner-tab" label="Description" />
            <Tab className="inner-tab" label="Review (50)" />
            <Tab className="inner-tab" label="Care & maintenance" />
          </StyledTabs>
          <Box mb={6}
               margin='0 10rem'
               fontFamily='Ubuntu'
               color='black'
          >
            {selectedOption === 0 && <ProductDescription />}
            {selectedOption === 1 && <ProductReview />}
            {selectedOption === 2 && <CareAndMaintenance />}
          </Box>
        </div>

        {relatedProducts && <RelatedProducts productsData={relatedProducts} />}

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

export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
export const getStaticProps = async ({ params }) => {
  const relatedProducts = await getRelatedProducts();
  const frequentlyBought = await getFrequentlyBought();
  const product = await api.getProduct(params.slug);
  return {
    props: {
      frequentlyBought,
      relatedProducts,
      product,
    },
  };
};
export default ProductDetails;
