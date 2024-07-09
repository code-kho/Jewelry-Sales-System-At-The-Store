import { Container, Grid } from "@mui/material";
import Navigations from "./Navigations";
import QCLayout from "../QCLayout";
/**
 *  Used in:
 *  1. wish-list page
 *  2. buy-back and buy-back-details page
 *  3. orders and order-details page
 *  4. payment-methods and payment-method-details page
 *  5. buyback-profile and edit buyback-profile page
 *  6. support-tickets page
 */
// ======================================================

// ======================================================
const QCDashboardLayout = ({ children }) => (
    <QCLayout>
        <Container
            sx={{
                my: "2rem",
            }}
        >
            <Grid container spacing={3}>
                <Grid
                    item
                    lg={3}
                    xs={12}
                    sx={{
                        display: {
                            xs: "none",
                            sm: "none",
                            md: "block",
                        },
                    }}
                >
                    <Navigations />
                </Grid>

                <Grid item lg={9} xs={12}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    </QCLayout>
);

export default QCDashboardLayout;
