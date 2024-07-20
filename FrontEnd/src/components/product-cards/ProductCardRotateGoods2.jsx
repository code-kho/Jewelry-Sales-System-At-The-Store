import { Add, Remove } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    Grid,
    styled,
} from "@mui/material";
import Image from "components/BazaarImage";
import { H5, Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";

const Wrapper = styled(Card)(() => ({
    width: "100%",
    overflow: "hidden",
    position: "relative",
    marginBottom: "1.25rem",
})); // ===========================================================

// ===========================================================
const ProductCardRotateGoods = (props) => {
    const { imgUrl, title, price, id, stock, slug } = props;
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
                <Grid item sm={4} xs={12}>
                    <Box position="relative">
                        <Image src={imgUrl} alt={title} width="100%" />
                    </Box>
                </Grid>

                <Grid item sm={8} xs={12}>
                    <FlexBox
                        flexDirection="column"
                        justifyContent="center"
                        height="100%"
                        p={2}
                    >
                        <H5 fontWeight="600" my="0.5rem">
                            {title}
                        </H5>

                        <FlexBox mt={1} mb={2} alignItems="center">
                            <Span>Quantity in stock: </Span>
                            <H5 fontWeight={600} color="primary.main" ml={1}>
                                {stock}
                            </H5>
                        </FlexBox>

                        <FlexBox>
                                <Button
                                    variant="contained"
                                    sx={{
                                        height: 32,
                                    }}
                                >
                                    Out of stock
                                </Button>
                        </FlexBox>
                    </FlexBox>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default ProductCardRotateGoods;
