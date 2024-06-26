import {useState} from "react";
import {Delete, Edit, RemoveRedEye} from "@mui/icons-material";
import {Avatar, Box} from "@mui/material";
import {FlexBox} from "components/flex-box";
import {Paragraph, Small} from "components/Typography";
import {
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from "../StyledComponents";
import {currency} from "lib"; // ========================================================================

// ========================================================================
const CustomerOrderRow = ({seller}) => {
    const {
        name,
        memberShipTier,
        email,
        phoneNumber,
        address,
        package: sellerPackage,
    } = seller;
    return (
        <StyledTableRow tabIndex={-1} role="checkbox">

            <StyledTableCell align="left" sx={{
                fontWeight: 400,
            }}>{name}</StyledTableCell>

            <StyledTableCell
                align="center"
                sx={{
                    fontWeight: 400,
                }}
            >
                {memberShipTier}
            </StyledTableCell>

            <StyledTableCell
                align="left"
                sx={{
                    fontWeight: 400,
                }}
            >
                {email}
            </StyledTableCell>
            <StyledTableCell
                align="left"
                sx={{
                    fontWeight: 400,
                }}
            >
                {phoneNumber}
            </StyledTableCell>

            <StyledTableCell
                align="left"
                sx={{
                    fontWeight: 400,
                }}
            >
                {address}
            </StyledTableCell>
            <StyledTableCell align="center">
                <StyledIconButton>
                    <Edit/>
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default CustomerOrderRow;
