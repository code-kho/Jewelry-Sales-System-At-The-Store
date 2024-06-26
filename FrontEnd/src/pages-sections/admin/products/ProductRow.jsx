import { useState } from "react";
import { useRouter } from "next/router";
import { Edit } from "@mui/icons-material";
import { Avatar, Box, Button, MenuItem, TextField } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { currency } from "lib";
import {
    StyledTableRow,
    CategoryWrapper,
    StyledTableCell,
    StyledIconButton,
} from "../StyledComponents";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DropZone from "../../../components/DropZone";

// ========================================================================
const ProductRow = ({ product }) => {
    const {
        productName,
        price,
        image,
        description,
        productId,
        categoryName,
        gem,
        weight,
        laborCost,
        ratioPrice,
        quantityInStock,
        stonePrice,
        active,
        goldId,
    } = product;
    const router = useRouter();
    const [update, setUpdate] = useState();
    const [edit, setEdit] = useState(false);
    const [newProductName, setProductName] = useState(productName);
    const [newWeight, setNewWeight] = useState(weight);
    const [newLaborCost, setNewLaborCost] = useState(laborCost);
    const [newRatioPrice, setNewRatioPrice] = useState(ratioPrice);
    const [newQuantityInStock, setNewQuantityInStock] =
        useState(quantityInStock);
    const [newStonePrice, setNewStonePrice] = useState(stonePrice);
    const [newDescription, setNewDescription] = useState(description);
    const [newGem, setNewGem] = useState(gem);
    const [newImage, setNewImage] = useState(image);
    const [newCategoryName, setNewCategoryName] = useState(categoryName);
    const [newActive, setNewActive] = useState(active);
    const [newGoldId, setNewGoldId] = useState(goldId);

    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = sessionStorage.getItem("token");
    } else {
        console.log("Web Storage is not supported in this environment.");
    }

    const handleUpdateProduct = async () => {
        console.log(productId);
        try {
            const response = await axios.put(
                console.log(productId),
                `https://four-gems-api-c21adc436e90.herokuapp.com/product/update-product=${productId}`,
                {
                    productId: productId,
                    productName: newProductName,
                    weight: newWeight,
                    price: price,
                    laborCost: newLaborCost,
                    ratioPrice: newRatioPrice,
                    stonePrice: newStonePrice,
                    quantityInStock: newQuantityInStock,
                    description: newDescription,
                    goldId: newGoldId,
                    isGem: newGem,
                    image: newImage,
                    active: newActive,
                    categoryName: newCategoryName,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setUpdate(response.data);
            setEdit(false);
            console.log(response.data);
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    const handleEdit = () => {
        setEdit(true);
    };

    const handleCancel = () => {
        setEdit(false);
    };

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">{productId}</StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <DropZone
                        onChange={(files) => {
                            const file = files[0];
                            file.then((imageData) => {
                                setNewImage(imageData);
                            }).catch((error) => {
                                console.error("Error converting image:", error);
                            });
                        }}
                    />
                ) : (
                    <Avatar
                        src={newImage}
                        alt={productName}
                        sx={{
                            borderRadius: "8px",
                            width: 100,
                            height: 100,
                        }}
                    />
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newProductName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                ) : (
                    productName
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                ) : (
                    categoryName
                )}
            </StyledTableCell>
            <StyledTableCell align="left">{currency(price)}</StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newLaborCost}
                        onChange={(e) => setNewLaborCost(e.target.value)}
                    />
                ) : (
                    currency(laborCost)
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newRatioPrice}
                        onChange={(e) => setNewRatioPrice(e.target.value)}
                    />
                ) : (
                    currency(ratioPrice)
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newStonePrice}
                        onChange={(e) => setNewStonePrice(e.target.value)}
                    />
                ) : (
                    currency(stonePrice)
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                    />
                ) : (
                    weight
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newQuantityInStock}
                        onChange={(e) => setNewQuantityInStock(e.target.value)}
                    />
                ) : (
                    quantityInStock
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        multiline
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            style: {
                                fontSize: "inherit",
                                padding: 0,
                            },
                        }}
                        sx={{
                            "& .MuiInputBase-root": {
                                fontSize: "inherit",
                            },
                        }}
                    />
                ) : (
                    <Box sx={{ whiteSpace: "pre-wrap" }}>{description}</Box>
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newGoldId}
                        onChange={(e) => setNewGoldId(e.target.value)}
                    />
                ) : (
                    goldId
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={newGem}
                        onChange={(e) => setNewGem(e.target.value)}
                    />
                ) : gem ? (
                    "Yes"
                ) : (
                    "No"
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <BazaarSwitch
                        checked={newActive}
                        onChange={(e) => setNewActive(e.target.checked)}
                    />
                ) : (
                    <BazaarSwitch checked={newActive} />
                )}
            </StyledTableCell>
            <StyledTableCell align="center">
                {edit ? (
                    <FlexBox justifyContent="center">
                        <StyledIconButton onClick={handleUpdateProduct}>
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

export default ProductRow;
