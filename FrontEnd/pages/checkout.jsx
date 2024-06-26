import { Grid } from "@mui/material";
import SEO from "components/SEO";
import CheckoutForm from "pages-sections/checkout/CheckoutForm";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";

const Checkout = () => {
  return (
    <CheckoutNavLayout>
      <SEO title="Checkout" />
        <Grid item lg={9} md={9} xs={12}>
          <CheckoutForm />
        </Grid>
    </CheckoutNavLayout>
  );
};

export default Checkout;
