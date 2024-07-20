// src/pages-sections/admin/promotions/StyledComponents.jsx
import { IconButton, TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/system";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: "14px",
    padding: "16px",
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
