import { Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import { Span } from "../Typography";
import ProductCardImportGoods from "../product-cards/ProductCartImportGoods";

// ==========================================================
export const ProductCardImportGoodsList = ({ products }) => {
    return (
        <div>
            {products.map((item) => (
                <ProductCardImportGoods
                    id={item.productId}
                    slug={item.productName}
                    title={item.productName}
                    price={item.price}
                    stock={item.quantityInStock}
                    imgUrl={item.image}
                />
            ))}
        </div>
    );
};

