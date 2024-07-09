import { useState } from "react";
import { useRouter } from "next/router";
import { Edit } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    MenuItem,
    TextField,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
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

// Define category options
const categoryOptions = [
    { id: 30, name: "bracelet" },
    { id: 31, name: "earring" },
    { id: 32, name: "ring" },
    { id: 33, name: "necklace" },
    { id: 34, name: "charm" },
];
const goldTypeOptions = [
    { id: 50, name: "10k" },
    { id: 53, name: "14k" },
    { id: 54, name: "16k" },
    { id: 51, name: "18k" },
    { id: 55, name: "20k" },
    { id: 56, name: "21k" },
    { id: 57, name: "22k" },
    { id: 52, name: "24k" },
];

export const ProductRow = ({ product }) => {
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
        typeId,
        goldTypeName,
        collectionId,
    } = product;
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const [newProductName, setProductName] = useState(productName);
    const [newWeight, setNewWeight] = useState(weight);
    const [newLaborCost, setNewLaborCost] = useState(laborCost);
    const [newRatioPrice, setNewRatioPrice] = useState(ratioPrice);
    const [newQuantityInStock, setNewQuantityInStock] =
        useState(quantityInStock);
    const [newStonePrice, setNewStonePrice] = useState(stonePrice);
    const [newDescription, setNewDescription] = useState(description);
    const [newGem, setNewGem] = useState(gem ? 1 : 0);
    const [newImage, setNewImage] = useState(image);
    const [newCategoryName, setNewCategoryName] = useState(categoryName);
    const [newCategoryId, setNewCategoryId] = useState(typeId);
    const [newActive, setNewActive] = useState(active ? 1 : 0);
    const [newGoldId, setNewGoldId] = useState(goldId);
    const [newGoldTypeName, setNewGoldTypeName] = useState(goldTypeName);
    const [newCollectionId, setNewCollectionId] = useState(collectionId);

    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = sessionStorage.getItem("token");
    } else {
        console.log("Web Storage is not supported in this environment.");
    }

    const handleUpdateProduct = async () => {
        try {
            const response = await axios.put(
                `https://four-gems-system-790aeec3afd8.herokuapp.com/product/update-product`,
                {
                    productId: productId,
                    productName: newProductName,
                    weight: newWeight,
                    laborCost: newLaborCost,
                    ratioPrice: newRatioPrice,
                    stonePrice: newStonePrice,
                    isGem: newGem,
                    isActive: newActive,
                    image: newImage,
                    quantityInStock: newQuantityInStock,
                    description: newDescription,
                    goldId: newGoldId, // Update to use newGoldId instead of goldId
                    typeId: newCategoryId,
                    collectionId: newCollectionId,
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
        // Ensure the state reflects the current product values when entering edit mode
        setNewGoldId(goldId);
        setNewGoldTypeName(goldTypeName);
        setNewCategoryId(typeId);
        setNewCategoryName(categoryName);
    };

    const handleCancel = () => {
        setEdit(false);
        // Revert the state to initial product values
        setProductName(productName);
        setNewWeight(weight);
        setNewLaborCost(laborCost);
        setNewRatioPrice(ratioPrice);
        setNewQuantityInStock(quantityInStock);
        setNewStonePrice(stonePrice);
        setNewDescription(description);
        setNewGem(gem ? 1 : 0);
        setNewImage(image);
        setNewCategoryName(categoryName);
        setNewCategoryId(typeId);
        setNewActive(active ? 1 : 0);
        setNewGoldId(goldId);
        setNewGoldTypeName(goldTypeName);
        setNewCollectionId(collectionId);
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
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={newCategoryName}
                            onChange={(e) => {
                                const selectedCategory = categoryOptions.find(
                                    (option) => option.name === e.target.value
                                );
                                setNewCategoryName(e.target.value);
                                setNewCategoryId(selectedCategory.id);
                            }}
                            label="Category"
                        >
                            {categoryOptions.map((category) => (
                                <MenuItem
                                    key={category.id}
                                    value={category.name}
                                >
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                    <FormControl fullWidth>
                        <InputLabel>Gold Type</InputLabel>
                        <Select
                            value={newGoldTypeName}
                            onChange={(e) => {
                                const selectedGold = goldTypeOptions.find(
                                    (option) => option.name === e.target.value
                                );
                                setNewGoldTypeName(e.target.value); // Set newGoldTypeName to the name
                                setNewGoldId(selectedGold.id); // Set newGoldId to the id
                            }}
                            label="Gold Type"
                        >
                            {goldTypeOptions.map((gold) => (
                                <MenuItem key={gold.id} value={gold.name}>
                                    {gold.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    goldTypeName
                )}
            </StyledTableCell>

            <StyledTableCell align="left">
                {edit ? (
                    <BazaarSwitch
                        checked={newGem === 1}
                        onChange={(e) => setNewGem(e.target.checked ? 1 : 0)}
                    />
                ) : (
                    <BazaarSwitch checked={newGem === 1} />
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <BazaarSwitch
                        checked={newActive === 1}
                        onChange={(e) => setNewActive(e.target.checked ? 1 : 0)}
                    />
                ) : (
                    <BazaarSwitch checked={newActive === 1} />
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
