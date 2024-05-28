import Link from "next/link";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib"; // ================================================================

// ================================================================
const ProductIntro = ({ product }) => {
  const { id, price, title, images, slug, thumbnail } = product;
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0); // CHECK PRODUCT EXIST OR NOT IN THE CART

  const cartItem = state.cart.find((item) => item.id === id); // HANDLE SELECT IMAGE

  const handleImageClick = (ind) => () => setSelectedImage(ind); // HANDLE CHANGE CART

  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: amount,
        name: title,
        imgUrl: thumbnail,
        id,
        slug,
      },
    });
  };

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={2}>
            <LazyImage
              alt={title}
              width={590}
              height={420}
              bgcolor="white"
              loading="eager"
              objectFit="contain"
              src={product.images[selectedImage]}
            />
          </FlexBox>

          <FlexBox overflow="auto">
            {images.map((url, ind) => (
              <FlexRowCenter
                key={ind}
                width={140}
                height={140}
                minWidth={100}
                bgcolor="white"
                border="1px solid"
                ml={ind === 0 ? "auto" : 0}
                style={{
                  cursor: "pointer",
                }}
                onClick={handleImageClick(ind)}
                mr={ind === images.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <Avatar
                  src={url}
                  variant="square"
                  sx={{
                    height: 40,
                  }}
                />
              </FlexRowCenter>
            ))}
          </FlexBox>
        </Grid>

        <Grid bgcolor="white" item md={6} xs={12} mt={3} alignItems="center">
          <div style={{
            display: "grid",
            textAlign: "center",
            paddingTop: 7,
          }}><H1 mb={2}>{title}</H1></div>
          <div style={{
            fontFamily: "Ubuntu",
            fontSize: "25px",
          }}>
            {/*<FlexBox alignItems="center" mb={0}>*/}
            {/*  <Box>Brand:</Box>*/}
            {/*  <H2 ml={1}>Swarovski</H2>*/}
            {/*</FlexBox>*/}
            <FlexBox alignItems="center" mb={2}>
              <p>Octagon shape, White, Rose gold-tone plated</p>
            </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={4}
                readOnly
              />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          <Box mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(price)}
            </H2>
            <Box color="inherit">Stock Available</Box>
          </Box>

          {!cartItem?.qty ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{
                mb: 4.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb={4.5}>
              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
          )}

          <FlexBox alignItems="center" mb={2}>
            <Box>Sold By:</Box>
            <Link href="/shops/fdfdsa">
              <a>
                <H6 ml={1}>Mobile Store</H6>
              </a>
            </Link>
          </FlexBox>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
