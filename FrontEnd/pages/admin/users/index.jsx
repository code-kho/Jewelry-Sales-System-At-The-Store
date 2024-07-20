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

// TABLE HEADING DATA LIST
const tableHeading = [
    {
        id: "name",
        label: "Name",
        align: "left",
    },
    {
        id: "category",
        label: "Category",
        align: "left",
    },
    {
        id: "brand",
        label: "Brand",
        align: "left",
    },
    {
        id: "price",
        label: "Price",
        align: "left",
    },
    {
        id: "published",
        label: "Published",
        align: "left",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
    },
]; // =============================================================================

ProductList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function ProductList(props) {
    const { products } = props; // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
    const router = useRouter();
    const hadleNav = () => {
        router.push("/admin/products/create");
    };
    const hadleNav1 = () => {
        router.push("/admin/categories");
    };
    const filteredProducts = products.map((item) => ({
        id: item.id,
        name: item.title,
        brand: item.brand,
        price: item.price,
        image: item.thumbnail,
        published: item.published,
        category: item.categories[0],
    }));
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
        listData: filteredProducts,
    });
    return (
        <Box py={4}>
            <H3>Product List</H3>
            <Button
                size="small"
                color="info"
                variant="outlined"
                sx={{
                    position: "absolute",
                    bottom: "517px",
                    right: "250px",
                    height: "44px",
                    width: "144.74px",
                    color: "#FFFFFF",
                    backgroundColor: "#4E97FD",
                }}
                onClick={hadleNav1}
            >
                All Categories
            </Button>
            <SearchArea
                handleSearch={() => {}}
                buttonText="Add Product"
                handleBtnClick={hadleNav}
                searchPlaceholder="Search Product..."
            />
            <Card>
                <Scrollbar autoHide={false}>
                    <TableContainer
                        sx={{
                            minWidth: 900,
                        }}
                    >
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                rowCount={products.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((product, index) => (
                                    <ProductRow product={product} key={index} />
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
    // const products = await api.products();
    const products = await api.products();
    return {
        props: {
            products,
        },
    };
};
