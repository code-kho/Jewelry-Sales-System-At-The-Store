import Link from "next/link";
import { Add, Remove, FavoriteBorder } from "@mui/icons-material";
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
import Image from "components/BazaarImage";
import { H5, Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { calculateDiscount, currency } from "lib";
import {grey} from "../../theme/themeColors";

const Wrapper = styled(Card)(() => ({
    width: "100%",
    overflow: "hidden",
    position: "relative",
    marginBottom: "1.25rem",
})); // ===========================================================

// ===========================================================
const ProductCardBuyBack1 = (props) => {
    const { imgUrl, title, price, off, rating, id, slug } = props;
    const { state, dispatch } = useAppContext();
    const cartItem = state.cart.find((item) => item.slug === slug);

    const handleCartAmountChange = (amount) => () => {
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
                name: title,
                qty: amount,
                price,
                imgUrl,
                id,
                slug,
            },
        });
    };

    return (
        <Wrapper>

            <Grid container spacing={1}>
                <Grid item sm={3} xs={12} sx={{
                    ml: 3
                }}>
                    <Box position="relative">
                        <Image src={imgUrl} alt={title} width="100%" />
                    </Box>
                </Grid>

                <Grid item sm={6} xs={12} sx={{
                    ml: 20
                }}>
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
                                <Button
                                    variant="contained"
                                    sx={{
                                        height: 32,
                                    }}
                                >
                                    Can't Buy Back
                                </Button>
                        </FlexBox>
                    </FlexBox>
                </Grid>
            </Grid>
        </Wrapper>
    );
};
export default ProductCardBuyBack1;
