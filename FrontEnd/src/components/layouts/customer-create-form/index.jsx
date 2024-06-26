import { Container, Grid } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
// ======================================================
// ======================================================
const CustomerInfoCreateLayout = ({ children }) => (
    <ShopLayout1>
        <Container>
            <Grid>
                <Grid item lg={12} xs={12} sx={{
                    width: "70%",
                    margin: "auto",
                }}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    </ShopLayout1>
);

export default CustomerInfoCreateLayout;
