import { Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import { Span } from "../Typography";
import ProductCardBuyBack1 from "../product-cards/ProductCardBuyBack1";

// ==========================================================
const ProductCardBuyBack1List = ({ products }) => {
    return (
        <div>
            {products?.map((item) => (
                <ProductCardBuyBack1
                    id={item.productId}
                    key={item.productId}
                    title={item.productName}
                    price={item.price}
                    imgUrl={item.image}
                />
            ))}

        </div>
    );
};

export default ProductCardBuyBack1List;
