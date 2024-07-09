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

const OrderRow = ({ order }) => {
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
    const handleConfirmUser = async () => {
        try {
            const resConfirmUser = await axios.put(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/order/confirm-order?id=${orderId}`,
                orderId,
                {
                    headers: {
                        Authorization: "Bearer " + token, //the token is a variable which holds the token
                    },
                }
            );
            window.location.reload();
            console.log(resConfirmUser.data.data);
        } catch (e) {
            console.log(e);
        }
    };
    const handleViewOrderDetail = async () => {
        console.log(orderId);
        localStorage.setItem("orderId", orderId);
        router.push(`/admin/orders/${orderId}`);
    };
    const handleCancelUser = async () => {
        try {
            console.log(orderId);
            const resCancelUser = await axios.put(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/order/cancel-order?id=${orderId}`,
                orderId,
                {
                    headers: {
                        Authorization: "Bearer " + token, //the token is a variable which holds the token
                    },
                }
            );
            window.location.reload();
            console.log(resCancelUser.data.data);
        } catch (e) {
            console.log(e);
        }
    };
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

            <StyledTableCell align="left">
                {currency(totalAmount)}
            </StyledTableCell>

            <StyledTableCell align="left">
                <StatusWrapper status={status}>{status}</StatusWrapper>
            </StyledTableCell>

            <StyledTableCell align="center">
                {isProcess ? (
                    <div>
                        <Button
                            sx={{
                                margin: "1px",
                                borderRadius: "10px",
                            }}
                            variant="contained"
                            color="info"
                            onClick={() => handleConfirmUser()}
                        >
                            Confirm
                        </Button>
                        <Button
                            sx={{
                                margin: "1px",
                                width: "89.28px",
                                borderRadius: "10px",
                            }}
                            variant="contained"
                            color="error"
                            onClick={() => handleCancelUser()}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <>
                        <StyledIconButton
                            onClick={() => handleViewOrderDetail()}
                        >
                            <RemoveRedEye />
                        </StyledIconButton>

                        <StyledIconButton>
                            <Delete />
                        </StyledIconButton>
                    </>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default OrderRow;
