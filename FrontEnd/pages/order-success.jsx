import Link from "next/link";
import {Button, Typography} from "@mui/material";
import { useRouter } from "next/router";
import SEO from "components/SEO";
import BazaarImage from "components/BazaarImage";
import { FlexBox, FlexRowCenter } from "components/flex-box";

const OrderSuccess = () => {
    const router = useRouter();

    const handleGoBack = () => router.back();

    return (
        <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
            <SEO title="Order Successfull" />
            <BazaarImage
                src="/assets/images/icons/success.svg"
                sx={{
                    display: "block",
                    maxWidth: 320,
                    width: "100%",
                    mb: 1,
                }}
            />
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                Thanks for buying our products
            </Typography>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                Have a wonderful day (^o^)
            </Typography>

            <FlexBox flexWrap="wrap">
                <Link href="/" passHref legacyBehavior>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            m: 1,
                        }}
                    >
                        Go to Home
                    </Button>
                </Link>
            </FlexBox>
        </FlexRowCenter>
    );
};

export default OrderSuccess;
