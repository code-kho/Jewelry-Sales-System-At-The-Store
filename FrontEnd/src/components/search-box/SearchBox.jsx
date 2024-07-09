import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Box, MenuItem, TextField, styled } from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import TouchRipple from "@mui/material/ButtonBase";
import BazaarMenu from "components/BazaarMenu";
import { FlexBox } from "components/flex-box";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";
import axios from "axios";

const DropDownHandler = styled(FlexBox)(({ theme }) => ({
    whiteSpace: "pre",
    borderTopRightRadius: 300,
    borderBottomRightRadius: 300,
    borderLeft: `1px solid ${theme.palette.text.disabled}`,
    [theme.breakpoints.down("xs")]: {
        display: "none",
    },
}));

const SearchBox = () => {
    const parentRef = useRef();
    const [_, startTransition] = useTransition();
    const [category, setCategory] = useState("All Categories");
    const [resultList, setResultList] = useState([]);

    const handleCategoryChange = (cat) => () => setCategory(cat);

    const handleSearch = async (e) => {
        startTransition(async () => {
            const counterId = localStorage.getItem("counterId");
            const value = e.target?.value;
            const token = localStorage.getItem("token");
            let type = "";
            if (category === "All Categories") {
                type = "";
            } else {
                type = category.toLowerCase();
            }
            try {
                const response = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/show-product?countId=${counterId}&pageSize=100&page=0&sortKeyword=price&sortType= &categoryName=${type}&searchKeyword=${value}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                console.log(response.data.data.map((name) => name.productName));
                if (!value) setResultList([]);
                else
                    setResultList(
                        response.data.data.map.filter(
                            (res) => res.active === true
                        )((product) => ({
                            productName: product.productName,
                            productId: product.productId,
                        }))
                    );
            } catch (e) {
                console.log(e);
            }
        });
    };

    const handleDocumentClick = () => setResultList([]);

    useEffect(() => {
        window.addEventListener("click", handleDocumentClick);
        return () => window.removeEventListener("click", null);
    }, []);
    const categoryDropdown = (
        <BazaarMenu
            direction="left"
            sx={{
                zIndex: 1502,
            }}
            handler={
                <DropDownHandler
                    px={3}
                    gap={0.5}
                    height="100%"
                    color="grey.700"
                    bgcolor="#FFFFFF"
                    alignItems="center"
                    component={TouchRipple}
                >
                    {category}
                    <KeyboardArrowDownOutlined
                        fontSize="small"
                        color="inherit"
                    />
                </DropDownHandler>
            }
        >
            {categories.map((item) => (
                <MenuItem key={item} onClick={handleCategoryChange(item)}>
                    {item}
                </MenuItem>
            ))}
        </BazaarMenu>
    );
    console.log(resultList);
    return (
        <Box
            position="relative"
            flex="1 1 0"
            maxWidth="670px"
            mx="auto"
            {...{
                ref: parentRef,
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Searching for..."
                onChange={handleSearch}
                InputProps={{
                    sx: {
                        height: 44,
                        paddingRight: 0,
                        borderRadius: 300,
                        color: "grey.700",
                        backgroundColor: "#FFFFFF",
                        overflow: "hidden",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "primary.main",
                        },
                    },
                    endAdornment: categoryDropdown,
                    startAdornment: <SearchOutlinedIcon fontSize="small" />,
                }}
            />

            {resultList.length > 0 && (
                <SearchResultCard elevation={2}>
                    {resultList.map((item) => (
                        <Link
                            href={`/product/${item.productId}`}
                            key={item.productId}
                            passHref
                        >
                            <MenuItem key={item.productId}>
                                {item.productName}
                            </MenuItem>
                        </Link>
                    ))}
                </SearchResultCard>
            )}
        </Box>
    );
};

const categories = [
    "All Categories",
    "Necklace",
    "Ring",
    "Earring",
    "Charm",
    "Bracelet",
];

export default SearchBox;
