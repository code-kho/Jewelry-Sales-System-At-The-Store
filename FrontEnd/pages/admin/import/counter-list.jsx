import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import api from "utils/__api__/dashboard";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductRowImport } from "pages-sections/admin/products/ProductRowImport";
// TABLE HEADING DATA LIST
const tableHeading = [
    { id: "id", label: "ID", align: "left" },
    { id: "image", label: "Image", align: "left" },
    { id: "name", label: "Name", align: "left" },
    { id: "counter1", label: "CounterOne", align: "left" },
    { id: "counter2", label: "CounterTwo", align: "left" },
    { id: "counter3", label: "CounterThree", align: "left" },
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
            try {
                if (token) {
                    const response = await axios.get(
                        `https://four-gems-system-790aeec3afd8.herokuapp.com/product/show-all-product-with-quantity-counter`,
                        {
                            headers: {
                                Authorization: `Bearer ` + token,
                            },
                        }
                    );
                    console.log(response?.data?.data);
                    setProducts(response?.data?.data);
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
    return (
        <Box py={4}>
            <H3 sx={{ mb: 2 }}>Product Quantity List</H3>

            <Card>
                <Scrollbar autoHide={false}>
                    <TableContainer
                        sx={{
                            minWidth: 1200, // Double the width
                            width: 1200, // Double the width
                        }}
                    >
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                rowCount={filteredList?.length}
                                numSelected={selected?.length}
                                onRequestSort={handleRequestSort}
                                sx={{
                                    "& th": {
                                        minWidth: 200, // Adjust the min-width of table header cells
                                    },
                                }}
                            />

                            <TableBody>
                                {filteredList &&
                                    filteredList?.map((product) => (
                                        <ProductRowImport
                                            quantityInCounter={
                                                product.quantityInCounter
                                            }
                                            product={product}
                                            key={product?.productId}
                                        />
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(products?.length / rowsPerPage)}
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
