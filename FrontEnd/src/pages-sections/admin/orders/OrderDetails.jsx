import { Delete, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Button,
  Avatar,
  Divider,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H2, H5, H6, Paragraph, Span } from "components/Typography";
import { currency } from "lib";
import {jwtDecode} from "jwt-decode";
import {token} from "stylis";

// ===================================================================
const OrderDetails = ({ order }) => {
  console.log(order);
  let token = '';
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  } else if (typeof sessionStorage !== 'undefined') {
    // Fallback to sessionStorage if localStorage is not supported
    token = localStorage.getItem('token');
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log('Web Storage is not supported in this environment.');
  }
  const decoded = jwtDecode(token);
  console.log(decoded)
  order.orderItemList.map((item) => console.log(item.img));

  return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
              sx={{
                p: 3,
              }}
          >
            <FlexBox alignItems="center" gap={4} sx={{
              justifyContent: "space-around",
            }}>
              <Paragraph>
                <Span color="grey.600">Order ID: </Span>
                {order.orderId}
              </Paragraph>

              <Paragraph>
                <Span color="grey.600">Placed on: </Span>
                {order.orderDate}
              </Paragraph>
              <Paragraph>
                <Span color="grey.600">Create by: </Span>
                {decoded.username}
              </Paragraph>
            </FlexBox>

            {order.orderItemList.map((item, index) => (
                <FlexBox
                    key={index}
                    flexShrink={0}
                    gap={1.5}
                    alignItems="center"
                    justifyContent="center"
                    my={2}
                >
                  <Avatar
                      src={item.img}
                      sx={{
                        height: 200,
                        width: 200,
                        borderRadius: "8px",
                        marginLeft: "50px",
                      }}
                  />

                  <Box
                      sx={{
                        ml: 5,
                        textAlign: "center",
                      }}
                  >
                    <H2 mb={1}>{item.productName}</H2>

                    <FlexBox alignItems="center" gap={3} justifyContent="center">
                      <Paragraph
                          fontSize={20}
                          color="grey.600"
                          sx={{
                            textDecoration: "line-through",
                          }}
                      >
                        {currency(item.price)} x
                      </Paragraph>
                      <Paragraph fontSize={20} color="primary.600">
                        {currency(item.discountPrice)} x
                      </Paragraph>
                      <Box maxWidth={100}>
                        <Paragraph fontSize={20} color="grey.600">
                          {item.quantity}
                        </Paragraph>
                      </Box>
                    </FlexBox>
                  </Box>
                </FlexBox>
            ))}
            <Box mt={4}>
              <H5 mt={0} mb={4} textAlign="center">
                Total Summary
              </H5>

              <Box mb={1.5} display="flex" justifyContent="space-between">
                <Paragraph color="grey.600">Subtotal:</Paragraph>
                <H6>{currency(order.priceBeforeVoucher)}</H6>
              </Box>

              <Box mb={1.5} display="flex" justifyContent="space-between">
                <Paragraph color="grey.600">Voucher:</Paragraph>

                <Box display="flex" alignItems="center" gap={1} maxWidth={100}>
                  <Paragraph color="grey.600">{order.voucherPercent}%</Paragraph>
                </Box>
              </Box>

              <Divider
                  sx={{
                    my: 2,
                  }}
              />

              <Box mb={2} display="flex" justifyContent="space-between">
                <H6>Total</H6>
                <H6>{currency(order.totalAmount)}</H6>
              </Box>

              <Paragraph textAlign="center">Paid by {order.paymentMethod}</Paragraph>
            </Box>
          </Card>
        </Grid>
      </Grid>
  );
};

export default OrderDetails;
