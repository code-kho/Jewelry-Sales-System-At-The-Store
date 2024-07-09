import Link from "next/link";
import {
    Add,
    Remove,
    Favorite,
    FavoriteBorder,
    RemoveRedEye,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    Chip,
    Grid,
    IconButton,
    Rating,
    styled,
} from "@mui/material";
import { useSnackbar } from "notistack";
import Image from "components/BazaarImage";
import { H5, Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
import { calculateDiscount, currency } from "lib";
import { useCallback, useState } from "react";

const Wrapper = styled(Card)(() => ({
    width: "100%",
    overflow: "hidden",
    position: "relative",
    marginBottom: "1.25rem",
}));

const ProductCard9 = (props) => {
    const { imgUrl, title, price, off, rating, id, slug } = props;
    const { state, dispatch } = useAppContext();
    const { enqueueSnackbar } = useSnackbar();
    const [openModal, setOpenModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
    const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
    const cartItem = state.cart.find((item) => item.id === id);

    const handleCartAmountChange = (product, type) => () => {
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: product,
        });

        if (type === "remove") {
            enqueueSnackbar("Removed from Cart", {
                variant: "error",
            });
        } else {
            enqueueSnackbar("Added to Cart", {
                variant: "success",
            });
        }
    };

    return (
        <Wrapper>
            <IconButton
                size="small"
                sx={{
                    position: "absolute",
                    top: 15,
                    right: 15,
                }}
                onClick={toggleIsFavorite}
            >
                {isFavorite ? (
                    <Favorite color="primary" fontSize="small" />
                ) : (
                    <FavoriteBorder fontSize="small" />
                )}
            </IconButton>

            <Grid container spacing={1}>
                <Grid item sm={3} xs={12}>
                    <Box position="relative">
                        {!!off && (
                            <Chip
                                size="small"
                                color="primary"
                                label={`${off}% off`}
                                sx={{
                                    top: 15,
                                    left: 15,
                                    px: "5px",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    position: "absolute",
                                }}
                            />
                        )}

                        <Image src={imgUrl} alt={title} width="100%" />
                    </Box>
                </Grid>

                <Grid item sm={9} xs={12}>
                    <FlexBox
                        flexDirection="column"
                        justifyContent="center"
                        height="100%"
                        p={2}
                    >
                        <Link href={`/product/${slug}`}>
                            <a>
                                <H5 fontWeight="600" my="0.5rem">
                                    {title}
                                </H5>
                            </a>
                        </Link>

                        <Rating value={rating || 0} color="warn" readOnly />

                        <FlexBox mt={1} mb={2} alignItems="center">
                            <H5 fontWeight={600} color="primary.main" mr={1}>
                                {currency(price)}
                            </H5>

                            {off && (
                                <Span fontWeight="600" color="grey.600">
                                    <del>{calculateDiscount(price, off)}</del>
                                </Span>
                            )}
                        </FlexBox>

                        <FlexBox>
                            {!cartItem?.qty && (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        height: 32,
                                    }}
                                    onClick={handleCartAmountChange({
                                        id,
                                        slug,
                                        price,
                                        imgUrl,
                                        name: title,
                                        qty: 1,
                                    })}
                                >
                                    Add To Cart
                                </Button>
                            )}

                            {!!cartItem?.qty && (
                                <FlexBetween>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        sx={{
                                            padding: "5px",
                                        }}
                                        onClick={handleCartAmountChange(
                                            {
                                                id,
                                                slug,
                                                price,
                                                imgUrl,
                                                name: title,
                                                qty: cartItem.qty + 1,
                                            },
                                            "add"
                                        )}
                                    >
                                        <Add fontSize="small" />
                                    </Button>

                                    <H5
                                        fontWeight="600"
                                        fontSize="15px"
                                        mx={1.5}
                                    >
                                        {cartItem.qty}
                                    </H5>

                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        sx={{
                                            padding: "5px",
                                        }}
                                        onClick={handleCartAmountChange(
                                            {
                                                id,
                                                slug,
                                                price,
                                                imgUrl,
                                                name: title,
                                                qty: cartItem.qty - 1,
                                            },
                                            "remove"
                                        )}
                                    >
                                        <Remove fontSize="small" />
                                    </Button>
                                </FlexBetween>
                            )}
                        </FlexBox>
                    </FlexBox>
                </Grid>
            </Grid>

            <ProductViewDialog
                openDialog={openModal}
                handleCloseDialog={toggleDialog}
                product={{
                    title,
                    price,
                    id,
                    slug,
                    imgGroup: [imgUrl, imgUrl],
                }}
            />
        </Wrapper>
    );
};

ProductCard9.defaultProps = {
    title: `Apple iPhone 5 Unlocked 16GB 8MP Used Cell-Phone-16gbIOS Used Refurbished 100%Factory Used`,
    imgUrl: "/assets/images/products/macbook.png",
    off: 50,
    rating: 0,
    price: 450,
};
export default ProductCard9;
