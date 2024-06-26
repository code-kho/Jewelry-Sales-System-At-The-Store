import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { currency } from "lib";
import { Box, Button, IconButton, styled } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import { useAppContext } from "contexts/AppContext";
import { Paragraph, H4 } from "components/Typography";
import ProductViewDialog from "components/products/ProductViewDialog";

const Card = styled(Box)(({ theme }) => ({
  fontFamily: "Ubuntu",
  borderRadius: "3px",
  transition: "all 0.3s",
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[100]}`,
  ":hover": {
    "& .product-actions": {
      right: 5,
    },
    "& img": {
      transform: "scale(1.1)",
    },
    border: `1px solid ${theme.palette.dark.main}`,
  },
}));

const CardMedia = styled(Box)(() => ({
  width: "100%",
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": {
    transition: "0.3s",
  },
}));

const AddToCartButton = styled(IconButton)(() => ({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
}));

const ProductCard20 = ({ product }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const cartItem = state.cart.find((item) => item.id === product.productId);

  const handleFavorite = () => setIsFavorite((fav) => !fav);

  const handleAddToCart = (product) => {
    const payload = {
      id: product.productId,
      name: product.productName,
      price: product.price,
      imgUrl: product.image,
      qty: (cartItem?.qty || 0) + 1,
    };
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload,
    });
    enqueueSnackbar("Added to Cart", {
      variant: "success",
    });
  };

  return (
    <Card height="100%">
      <CardMedia>
        <Link href={`/product/${product.productId}`} passHref>
          <a>
            <Image
              width={300}
              height={300}
              objectFit="cover"
              layout="responsive"
              className="product-img"
              src={product.image}
              alt="Loading"
            />
          </a>
        </Link>

        <AddToCartButton
          className="product-actions"
          onClick={() => setOpenDialog(true)}
        >
          <RemoveRedEye color="disabled" fontSize="small" />
        </AddToCartButton>
      </CardMedia>

      <ProductViewDialog
        openDialog={openDialog}
        handleCloseDialog={() => setOpenDialog(false)}
        product={{
          id: product.productId,
          slug: product.productName,
          title: product.productName,
          price: product.price,
          categoryItem: product.categoryItem,
          imgGroup: [product.image, product.image],
          description: product.description,
        }}
      />
      <Box p={2} textAlign="center">
        <Paragraph>{product.productName}</Paragraph>
        <H4 fontWeight={700} py={0.5}>
          {currency(product.price)}
        </H4>

        <Button
          fullWidth
          color="dark"
          variant="outlined"
          onClick={() => handleAddToCart(product)}
        >
          Add To Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard20;
