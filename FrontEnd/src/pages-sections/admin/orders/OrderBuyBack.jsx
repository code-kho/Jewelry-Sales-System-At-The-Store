import { useRouter } from "next/router";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { currency } from "lib";
import {
    StatusWrapper,
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from "../StyledComponents";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const OrderBuyBack = ({ order }) => {
    const { orderId, customerName, orderDate, totalAmount, status } = order;
    const router = useRouter();
    const [isProcess, setIsProcess] = useState(status === "In Process");
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else {
        console.log("Web Storage is not supported in this environment.");
    }
    const handleViewOrderDetail = async () => {
        console.log(orderId)
        localStorage.setItem("orderId", orderId);
        router.push(`/admin/orders/${orderId}`);
    }
    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">{orderId}</StyledTableCell>
            <StyledTableCell align="left">{customerName}</StyledTableCell>

            <StyledTableCell
                align="left"
                sx={{
                    fontWeight: 400,
                }}
            >
                {orderDate}
            </StyledTableCell>

            <StyledTableCell align="left">{currency(totalAmount)}</StyledTableCell>

            <StyledTableCell align="left">
                <StatusWrapper status={status}>{status}</StatusWrapper>
            </StyledTableCell>

            <StyledTableCell align="center">
                    <div>
                        <StyledIconButton onClick={() => handleViewOrderDetail()}>
                            <RemoveRedEye />
                        </StyledIconButton>

                        <StyledIconButton>
                            <Delete />
                        </StyledIconButton>
                    </div>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default OrderBuyBack;
