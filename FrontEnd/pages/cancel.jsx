import Link from "next/link";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import SEO from "components/SEO";
import { FlexBox, FlexRowCenter } from "components/flex-box";

const Error403 = () => {
    const router = useRouter();

    const handleGoBack = () => router.back();

    return (
        <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
            <SEO title="Cancel Order" />

            <Typography variant="h3" align="center" sx={{ mb: 3 }}>
                Order has been canceled by manager
            </Typography>

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
        </FlexRowCenter>
    );
};

export default Error403;
