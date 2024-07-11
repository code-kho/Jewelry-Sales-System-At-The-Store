import {Divider, Typography} from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import {Paragraph, Span} from "components/Typography";
import { currency } from "lib";
import {useAppContext} from "../../contexts/AppContext";

const PaymentSummary = () => {
    const { state } = useAppContext();
    const cartList = state.cart;
    const perDiscount = localStorage.getItem("percentDiscount")
    const getTotalPrice = () =>
        cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
    const tax = (getTotalPrice() - (getTotalPrice() * perDiscount/100)) * 0.08;
    const totalPrice = tax + getTotalPrice();
    localStorage.setItem("totalPrice", totalPrice);
  return (
    <Card1>
        <FlexBetween mb={1}>
            <Typography color="grey.600">Subtotal:</Typography>
            <Typography
                fontSize="18px"
                fontWeight="600"
                lineHeight="1"
            >
                {currency(getTotalPrice())}
            </Typography>
        </FlexBetween>

        <FlexBetween mb={1}>
            <Typography color="grey.600">Discount <Span sx={{color: "green"}}>(-{perDiscount}%)</Span>:</Typography>
            <Typography
                fontSize="18px"
                fontWeight="600"
                lineHeight="1"
            >
                {currency(getTotalPrice() * perDiscount/100)}
            </Typography>
        </FlexBetween>

        <FlexBetween mb={2}>
            <Typography color="grey.600">Tax <Span sx={{color: "red"}}>(+8%)</Span>:</Typography>
            <Typography
                fontSize="18px"
                fontWeight="600"
                lineHeight="1"
            >
                {currency(tax)}
            </Typography>
        </FlexBetween>

      <Divider
        sx={{
          mb: 2,
        }}
      />

      <Paragraph
        fontSize={25}
        fontWeight={600}
        lineHeight={1}
        textAlign="right"
      >
        {currency(getTotalPrice() - (getTotalPrice() * perDiscount/100) + tax)}
      </Paragraph>
    </Card1>
  );
};

export default PaymentSummary;
