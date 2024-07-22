import Link from "next/link";
import { format } from "date-fns";
import { East, RemoveRedEye } from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { currency } from "lib";
import {
    StatusWrapper,
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from "../admin";
import { router } from "next/client";

// =================================================
export const OrderRowWarranty = ({ order }) => {
    const { orderId } = order;
    const handleViewOrderDetail = async () => {
        localStorage.setItem("orderIdStaff", orderId);
        router.push(`./${orderId}`);
    };

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">{order.orderId}</StyledTableCell>

            <StyledTableCell>
                <H5 m={0.75} textAlign="left">
                    {order.customerName}
                </H5>
            </StyledTableCell>

            <StyledTableCell>
                <Typography className="pre" m={0.75} textAlign="left">
                    {format(new Date(order.orderDate), "MMM dd, yyyy")}
                </Typography>
            </StyledTableCell>

            <StyledTableCell>
                <Typography m={0.75} textAlign="left">
                    {currency(order.totalAmount)}
                </Typography>
            </StyledTableCell>

            <StyledTableCell align="left">
                <StatusWrapper status={order.status}>
                    {order.status}
                </StatusWrapper>
            </StyledTableCell>

            <StyledTableCell align="center">
                <StyledIconButton onClick={() => handleViewOrderDetail()}>
                    <RemoveRedEye />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};
