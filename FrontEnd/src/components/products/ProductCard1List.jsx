import { Fragment, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";

const ProductCard1List = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9; // Number of products per page

    // Calculate the number of pages
    const pageCount = Math.ceil(products.length / productsPerPage);

    // Slice the products array to get the products for the current page
    const paginatedProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Fragment>
            <Grid container spacing={3}>
                {paginatedProducts.map((item) => (
                    <Grid item lg={4} sm={6} xs={12} key={item.productId}>
                        <ProductCard1
                            id={item.productId}
                            title={item.productName}
                            price={item.price}
                            imgUrl={item.image}
                        />
                    </Grid>
                ))}
            </Grid>

            <FlexBetween flexWrap="wrap" mt={4}>
                <Span color="grey.600">
                    Showing {productsPerPage * (currentPage - 1) + 1}-
                    {Math.min(productsPerPage * currentPage, products.length)}{" "}
                    of {products.length} Products
                </Span>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                />
            </FlexBetween>
        </Fragment>
    );
};

export default ProductCard1List;
