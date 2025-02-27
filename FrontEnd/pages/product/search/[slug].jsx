import { useCallback, useEffect, useState } from "react";
import { Apps, FilterList, ViewList } from "@mui/icons-material";
import {
    Box,
    Card,
    Container,
    Grid,
    IconButton,
    MenuItem,
    TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FlexBox } from "components/flex-box";
import Sidenav from "components/sidenav/Sidenav";
import { H5, Paragraph } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductCard1List from "components/products/ProductCard1List";
import ProductCard9List from "components/products/ProductCard9List";
import ProductFilterCard from "components/products/ProductFilterCard";
import axios from "axios";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

const ProductSearchResult = () => {
    const [view, setView] = useState("grid");
    const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const toggleView = useCallback((v) => () => setView(v), []);
    const [productList, setProductList] = useState([]);
    const [length, setLength] = useState(0);
    const router = useRouter();

    const [selectedValue, setSelectedValue] = useState(sortOptions[0].value);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const cateogory = router.query.slug;
    const token =
        typeof localStorage !== "undefined"
            ? localStorage.getItem("token")
            : "";

    useEffect(() => {
        const fetchShowProduct = async () => {
            const decoded = jwtDecode(token);
            const counterId = decoded?.counterId;
            try {
                const resShowProduct = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/product/show-product?countId=${counterId}&pageSize=200&page=0&sortKeyword=price&sortType=${selectedValue}&categoryName=${cateogory}&searchKeyword= `,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const filteredProducts = resShowProduct.data.data.filter(
                    (res) => res.active === true
                );
                setProductList(filteredProducts);
                setLength(filteredProducts.length);
            } catch (e) {
                console.log(e);
            }
        };

        fetchShowProduct();
    }, [selectedValue, cateogory, token]);

    return (
        <ShopLayout1>
            <Container
                sx={{
                    mt: 4,
                    mb: 6,
                }}
            >
                <Card
                    elevation={1}
                    sx={{
                        mb: "55px",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: {
                            sm: "1rem 1.25rem",
                            md: "0.5rem 1.25rem",
                            xs: "1.25rem 1.25rem 0.25rem",
                        },
                    }}
                >
                    <Box>
                        <H5>Searching for {cateogory}</H5>
                        <Paragraph color="grey.600">
                            {length} results found
                        </Paragraph>
                    </Box>

                    <FlexBox
                        alignItems="center"
                        columnGap={4}
                        flexWrap="wrap"
                        my="0.5rem"
                    >
                        <FlexBox alignItems="center" gap={1} flex="1 1 0">
                            <Paragraph color="grey.600" whiteSpace="pre">
                                Sort by:
                            </Paragraph>

                            <TextField
                                select
                                fullWidth
                                size="small"
                                variant="outlined"
                                placeholder="Sort by"
                                defaultValue={sortOptions[0].value}
                                value={selectedValue}
                                onChange={handleChange}
                                sx={{
                                    flex: "1 1 0",
                                    minWidth: "150px",
                                }}
                            >
                                {sortOptions.map((item) => (
                                    <MenuItem
                                        value={item.value}
                                        key={item.value}
                                    >
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FlexBox>

                        <FlexBox alignItems="center" my="0.25rem">
                            <Paragraph color="grey.600" mr={1}>
                                View:
                            </Paragraph>

                            <IconButton onClick={toggleView("grid")}>
                                <Apps
                                    color={
                                        view === "grid" ? "primary" : "inherit"
                                    }
                                    fontSize="small"
                                />
                            </IconButton>

                            <IconButton onClick={toggleView("list")}>
                                <ViewList
                                    color={
                                        view === "list" ? "primary" : "inherit"
                                    }
                                    fontSize="small"
                                />
                            </IconButton>

                            {downMd && (
                                <Sidenav
                                    handle={
                                        <IconButton>
                                            <FilterList fontSize="small" />
                                        </IconButton>
                                    }
                                >
                                    <ProductFilterCard />
                                </Sidenav>
                            )}
                        </FlexBox>
                    </FlexBox>
                </Card>

                <Grid container spacing={3}>
                    <Grid
                        item
                        md={3}
                        sx={{
                            display: {
                                md: "block",
                                xs: "none",
                            },
                        }}
                    >
                        <ProductFilterCard />
                    </Grid>

                    <Grid item md={9} xs={12}>
                        {view === "grid" ? (
                            <ProductCard1List products={productList} />
                        ) : (
                            <ProductCard9List products={productList} />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </ShopLayout1>
    );
};

const sortOptions = [
    {
        label: "Price high to low",
        value: "DESC",
    },
    {
        label: "Price low to high",
        value: "ASC",
    },
];

export default ProductSearchResult;
