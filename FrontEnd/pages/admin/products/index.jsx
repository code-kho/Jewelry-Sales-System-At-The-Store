import { Button, Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import { ProductRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

// TABLE HEADING DATA LIST
const tableHeading = [
    { id: "id", label: "ID", align: "left" },
    { id: "image", label: "Image", align: "left" },
    { id: "name", label: "Name", align: "left" },
    { id: "category", label: "Category", align: "left" },
    { id: "price", label: "Price", align: "left" },
    { id: "laborCost", label: "Labor Cost", align: "left" },
    { id: "ratioPrice", label: "Ratio Price", align: "left" },
    { id: "stonePrice", label: "Stone Price", align: "left" },
    { id: "weight", label: "Weight", align: "left" },
    { id: "quantity", label: "Quantity", align: "left" },
    { id: "description", label: "Description", align: "left" },
    { id: "goldId", label: "Gold Type", align: "left" },
    { id: "gem", label: "Is Gem", align: "left" },
    { id: "active", label: "Publish", align: "left" },
    { id: "action", label: "Edit", align: "center" },
];

ProductList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function ProductList({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleNav = () => {
        router.push("/admin/products/create");
    };

    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = sessionStorage.getItem("token");
    } else {
        console.log("Web Storage is not supported in this environment.");
    }

    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort,
        page,
        handleChangeRowsPerPage,
    } = useMuiTable({
        listData: products,
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const counterId = localStorage.getItem("counterId");
            try {
                if (token) {
                    const response = await axios.get(
                        `https://four-gems-api-c21adc436e90.herokuapp.com/product/show-product?countId=${counterId}&pageSize=200&page=0&sortKeyword=productId&sortType=DESC&categoryName= &searchKeyword=`,
                        {
                            headers: {
                                Authorization: `Bearer ` + token,
                            },
                        }
                    );
                    setProducts(response.data.data);
                } else {
                    console.warn(
                        "Token is missing. Please ensure it's properly set."
                    );
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log(filteredList.length);
    return (
        <Box py={4}>
            <H3>Product List</H3>

            <SearchArea
                handleSearch={() => {}}
                buttonText="Add Product"
                handleBtnClick={handleNav}
                searchPlaceholder="Search Product..."
            />
            <Card>
                <Scrollbar autoHide={false}>
                    <TableContainer
                        sx={{
                            minWidth: 3000, // Double the width
                            width: 3000, // Double the width
                        }}
                    >
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                rowCount={filteredList.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                sx={{
                                    "& th": {
                                        minWidth: 200, // Adjust the min-width of table header cells
                                    },
                                }}
                            />

                            <TableBody>
                                {filteredList.map((product) => (
                                    <ProductRow
                                        product={product}
                                        key={product.productId}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(products.length / rowsPerPage)}
                        page={page + 1}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Stack>
            </Card>
        </Box>
    );
}

export const getStaticProps = async () => {
    try {
        const products = await api.products();
        return {
            props: {
                initialProducts: products,
            },
        };
    } catch (error) {
        console.error("Failed to fetch initial products:", error);
        return {
            props: {
                initialProducts: [],
            },
        };
    }
};