import SEO from "components/SEO";
import Otp from "pages-sections/sessions/Otp";
import { FlexRowCenter } from "components/flex-box";

const OtpPage = () => {
    return (
        <FlexRowCenter flexDirection="column" minHeight="100vh">
            <SEO title="Otp Page" />
            <Otp />
        </FlexRowCenter>
    );
};

export default OtpPage;
