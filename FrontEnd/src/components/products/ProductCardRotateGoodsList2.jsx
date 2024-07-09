import ProductCardRotateGoods2 from "../product-cards/ProductCardRotateGoods2";
// ==========================================================


const ProductCardRotateGoodsList = ({ products }) => {
    return (
        <div>
            {products.map((item) => (
                <ProductCardRotateGoods2
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

export default ProductCardRotateGoodsList;
