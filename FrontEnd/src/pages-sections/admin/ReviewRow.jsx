import {Delete, RemoveRedEye} from "@mui/icons-material";
import {
    StatusWrapper,
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from "./StyledComponents";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // ========================================================================

// ========================================================================
const ReviewRow = ({showRotate}) => {
    const [confirmRotate, setConfirmRotate] = useState();
    const {id, fromCounter, toCounter, totalQuantity, status} = showRotate;
    let token = '';
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem('token');
    } else if (typeof sessionStorage !== 'undefined') {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem('token');
    } else {

    }
    const decoded = jwtDecode(token);
    const handleConfirmRotate = async (id) => {
            const fetchConfirmRotate = async () => {
                try {
                    const resConfirmRotate = await axios.put(
                        `https://four-gems-system-790aeec3afd8.herokuapp.com/transfer-request/approve?userId=${decoded.id}&transferRequestId=${id}`,
                        {
                            userId: decoded.id,
                            transferRequestId: id,
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + token, //the token is a variable which holds the token
                            },
                        }
                    );
                    window.location.reload();
                } catch (e) {
                    console.log("Can not confirm rotate request" + e);
                }
            };
            fetchConfirmRotate();
    }
    const handleCancelRotate = async (id) => {
        const fetchCancelRotate = async () => {
            try {
                const resCancelRotate = await axios.put(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/transfer-request/cancel?userId=${decoded.id}&transferRequestId=${id}`,
                    {
                        userId: decoded.id,
                        transferRequestId: id,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                window.location.reload();
            } catch (e) {
                console.log("Can not confirm rotate request" + e);
            }
        };
        fetchCancelRotate();
    }
    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="center">{id}</StyledTableCell>

            <StyledTableCell align="left">{fromCounter}</StyledTableCell>

            <StyledTableCell align="left">{toCounter}</StyledTableCell>

            <StyledTableCell align="center">{totalQuantity}</StyledTableCell>

            <StyledTableCell align="left">
                <StatusWrapper status={status}>{status}</StatusWrapper>
            </StyledTableCell>

            <StyledTableCell align="center">
                {status === "PENDING" ? (
                    <div>
                        <Button
                            sx={{
                                margin: "1px",
                                borderRadius: "10px",
                            }}
                            variant="contained"
                            color="info"
                            onClick={() => handleConfirmRotate(id)}
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
                            onClick={() => handleCancelRotate(id)}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <>
                        <StyledIconButton
                            onClick={() => handleViewOrderDetail()}
                        >
                            <RemoveRedEye/>
                        </StyledIconButton>
                    </>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default ReviewRow;
