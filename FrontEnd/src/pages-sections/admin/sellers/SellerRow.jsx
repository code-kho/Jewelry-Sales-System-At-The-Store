import { useEffect, useState } from "react";
import { RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import {
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from "../StyledComponents";
import UserDetailPopup from "./Popup";

const SellerRow = ({ user, onUserClick }) => {
    const { fullName, username, email, roleName, revenue } = user;
    const [showPopup, setShowPopup] = useState(false);
    const [userDetail, setUserDetail] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            console.error("No token found");
        }
    }, []);

    const handleRowClick = async () => {
        try {
            const response = await fetch(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/user/get-by-email?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch user details");
            }

            const responseData = await response.json();
            const userData = responseData.data[0];
            setUserDetail(userData);
            setShowPopup(true);
        } catch (error) {
            console.error("Error fetching user details:", error);
            // Handle error state or display error message
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <StyledTableRow
                tabIndex={-1}
                role="checkbox"
                onClick={handleRowClick}
            >
                <StyledTableCell align="left">{fullName}</StyledTableCell>
                <StyledTableCell align="left">{username}</StyledTableCell>
                <StyledTableCell align="left">{email}</StyledTableCell>
                <StyledTableCell align="left">{roleName}</StyledTableCell>
                <StyledTableCell align="left">
                    ${revenue.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="center">
                    <StyledIconButton>
                        <RemoveRedEye />
                    </StyledIconButton>
                </StyledTableCell>
            </StyledTableRow>
            {showPopup && (
                <UserDetailPopup user={userDetail} onClose={handleClosePopup} />
            )}
        </>
    );
};

export default SellerRow;
