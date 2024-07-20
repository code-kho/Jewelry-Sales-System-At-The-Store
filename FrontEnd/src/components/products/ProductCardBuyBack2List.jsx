import ProductCardBuyBack2 from "../product-cards/ProductCardBuyBack2";

// ==========================================================
const ProductCardBuyBack2List = ({ products }) => {
    return (
        <div>
            {products?.map((item) => (
                <ProductCardBuyBack2
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

export default ProductCardBuyBack2List;
