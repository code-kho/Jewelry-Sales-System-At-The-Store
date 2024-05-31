import { Box, Grid } from "@mui/material";
import ProductCard1 from "components/product-cards/ProductCard1";
import { H2 } from "components/Typography";

// ===================================================
const RelatedProducts = ({ productsData }) => {
  return (
    <Box mb={7.5}
         my={3}
    >
      <H2 mb={2}>You May Also Like</H2>
      <Grid container spacing={2}>
        {productsData.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              rating={item.rating}
              imgUrl={item.thumbnail}
              discount={item.discount}
              hoverEffect
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
