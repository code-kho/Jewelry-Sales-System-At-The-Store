import { useState } from "react";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Paragraph, Small } from "components/Typography";
import {
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from "../StyledComponents";
import { currency } from "lib"; // ========================================================================

// ========================================================================
const PromotionRow = ({ seller }) => {
    const {
        description,
        id,
        discount,
        startDate,
        endDate,
        loyaltyPoints,
        package: sellerPackage,
    } = seller;
    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell
                align="center"
                sx={{
                    fontWeight: 400,
                }}
            >
                {id}
            </StyledTableCell>

            <StyledTableCell
                align="center"
                sx={{
                    fontWeight: 400,
                }}
            >
                {description}
            </StyledTableCell>
            <StyledTableCell
                align="center"
                sx={{
                    fontWeight: 400,
                }}
            >
                {discount + "%"}
            </StyledTableCell>
            <StyledTableCell
                align="center"
                sx={{
                    fontWeight: 400,
                }}
            >
                {startDate}
            </StyledTableCell>
            <StyledTableCell
                align="left"
                sx={{
                    fontWeight: 400,
                }}
            >
                {endDate}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default PromotionRow;
