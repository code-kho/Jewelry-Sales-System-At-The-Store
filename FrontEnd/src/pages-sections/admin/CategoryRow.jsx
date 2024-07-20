import { useState } from "react";
import { useRouter } from "next/router";
import { Edit } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
    StyledTableRow,
    StyledTableCell,
    StyledIconButton,
} from "./StyledComponents";

const CategoryRow = ({ category }) => {
    const { id, name, createdDate } = category;
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const [newName, setNewName] = useState(name);

    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = sessionStorage.getItem("token");
    } else {
        console.log("Web Storage is not supported in this environment.");
    }

    const handleUpdateCategory = async () => {
        try {
            const response = await axios.put(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/product-type?typeId=${id}&name=${newName}`,
                {
                    name: newName,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(response.data);
            setEdit(false);
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    const handleEdit = () => {
        setEdit(true);
    };

    const handleCancel = () => {
        setEdit(false);
        setNewName(name);
    };

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">{id}</StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                ) : (
                    name
                )}
            </StyledTableCell>

            <StyledTableCell align="left">
                {new Date(createdDate).toLocaleDateString()}
            </StyledTableCell>
            <StyledTableCell align="center">
                {edit ? (
                    <FlexBox justifyContent="center">
                        <StyledIconButton onClick={handleUpdateCategory}>
                            <CheckIcon color="success" />
                        </StyledIconButton>
                        <StyledIconButton onClick={handleCancel}>
                            <ClearIcon color="error" />
                        </StyledIconButton>
                    </FlexBox>
                ) : (
                    <FlexBox justifyContent="center">
                        <StyledIconButton onClick={handleEdit}>
                            <Edit />
                        </StyledIconButton>
                    </FlexBox>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default CategoryRow;
