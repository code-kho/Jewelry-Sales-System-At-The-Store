import { useState, useEffect } from "react";
import { Button, Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import { CategoryRow } from "pages-sections/admin";
import axios from "axios";
import { useRouter } from "next/router";

// TABLE HEADING DATA LIST
const tableHeading = [
    { id: "id", label: "ID", align: "left" },
    { id: "name", label: "Product Type Name", align: "left" },
    { id: "createdDate", label: "Created Date", align: "left" },
    { id: "action", label: "Edit", align: "center" },
];

CategoryList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function CategoryList({ initialCategories }) {
    const [categories, setCategories] = useState(initialCategories);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleNav = () => {
        router.push("/admin/categories/create");
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
        listData: categories,
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (token) {
                    const response = await axios.get(
                        `https://four-gems-system-790aeec3afd8.herokuapp.com/product-type`,
                        {
                            headers: {
                                Authorization: `Bearer ` + token,
                            },
                        }
                    );
                    setCategories(response?.data?.data);
                } else {
                    console.warn(
                        "Token is missing. Please ensure it's properly set."
                    );
                }
            } catch (error) {
                console.error("Failed to fetch product types:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categories]);

    return (
        <Box py={4}>
            <H3>Product Type List</H3>

            <SearchArea
                handleSearch={() => {}}
                buttonText="Add Product Type"
                handleBtnClick={handleNav}
                searchPlaceholder="Search Product Type..."
            />
            <Card>
                <Scrollbar autoHide={false}>
                    <TableContainer
                        sx={{
                            minWidth: 1200,
                            width: 1200,
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
                                        minWidth: 150,
                                    },
                                }}
                            />

                            <TableBody>
                                {filteredList.map((category) => (
                                    <CategoryRow
                                        category={category}
                                        key={category?.id}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(categories?.length / rowsPerPage)}
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
        const response = await axios.get(
            `https://four-gems-system-790aeec3afd8.herokuapp.com/product-type`
        );
        const categories = response?.data?.data || [];
        return {
            props: {
                initialCategories: categories,
            },
        };
    } catch (error) {
        console.error("Failed to fetch initial product types:", error);
        return {
            props: {
                initialCategories: [],
            },
        };
    }
};
