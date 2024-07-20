import { Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard9 from "components/product-cards/ProductCard9";
import { Span } from "../Typography";
import { useState } from "react";

// ==========================================================
const ProductCard9List = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5; // Number of products per page

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
        <div>
            {paginatedProducts.map((item) => (
                <ProductCard9
                    id={item.productId}
                    key={item.productId}
                    title={item.productName}
                    price={item.price}
                    // off={item.discount}
                    imgUrl={item.image}
                />
            ))}

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
        </div>
    );
};

export default ProductCard9List;
