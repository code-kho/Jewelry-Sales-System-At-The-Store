import { Fragment, useCallback, useState } from "react";
import { Box } from "@mui/material";
import Topbar from "components/topbar/Topbar";
import NavbarQC from "../navbar/NavbarQC";
/**
 *  Used in:
 *  1. grocery1, grocery2, healthbeauty-shop
 *  2. checkout-alternative
 */
// =======================================================

// =======================================================
const QCLayout = ({ children, showTopbar = true, showNavbar = true }) => {
    const [isFixed, setIsFixed] = useState(false);
    const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);
    return (
        <Fragment>
            {/* TOPBAR */}
            {showTopbar && <Topbar />}

            <Box zIndex={4} position="relative" className="section-after-sticky">
                {/* BODY CONTENT */}
                {children}
            </Box>
        </Fragment>
    );
};

export default QCLayout;