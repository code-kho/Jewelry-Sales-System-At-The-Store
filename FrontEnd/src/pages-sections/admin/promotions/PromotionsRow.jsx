import { Delete, Edit } from "@mui/icons-material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import {
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from "./StyledComponents";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@mui/material";

const PromotionRow = ({ promotion }) => {
    const { id, description, discount, endDate } = promotion;
    const router = useRouter();
    const [edit, setEdit] = useState(false);

    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    }

    const handleUpdatePromotion = async () => {
        // Add your update logic here
    };

    const handleDeletePromotion = async () => {
        try {
            await axios.delete(
                `https://four-gems-api-c21adc436e90.herokuapp.com/promotions/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete promotion:", error);
        }
    };

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">{id}</StyledTableCell>
            <StyledTableCell align="left">{description}</StyledTableCell>
            <StyledTableCell align="left">{discount}</StyledTableCell>
            <StyledTableCell align="left">{endDate}</StyledTableCell>
            <StyledTableCell align="center">
                {edit ? (
                    <div>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={handleUpdatePromotion}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setEdit(!edit)}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <div>
                        <StyledIconButton sx={{
                            color: "grey.600",
                        }}  onClick={() => setEdit(!edit)}>
                            <Edit />
                        </StyledIconButton>
                    </div>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default PromotionRow;
