import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchOrder from "components/dashboard/SearchOrder";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import useMuiTable from "hooks/useMuiTable";
import { OrderRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
// TABLE HEADING DATA LIST
const tableHeading = [
    {
        id: "orderId",
        label: "Order ID",
        align: "left",
    },
    {
        id: "customerName",
        label: "Customer Id",
        align: "left",
    },
    {
        id: "orderDate",
        label: "Order Date",
        align: "left",
    },
    {
        id: "totalAmount",
        label: "Amount",
        align: "left",
    },
    {
        id: "status",
        label: "Status",
        align: "left",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
    },
]; // =============================================================================

OrderList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function OrderList({ orders }) {
    // RESHAPE THE ORDER LIST BASED TABLE HEAD CELL ID
    const [orderInfo, setOrderInfo] = useState(orders);
    const [loading, setLoading] = useState(false);
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else {
        console.log("Web Storage is not supported in this environment.");
    }
    useEffect(() => {
        const fetchOrderInfo = async () => {
            setLoading(true);
            const counterId = localStorage.getItem("counterId");
            try {
                const responeOrderInfo = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/order?counterId=${counterId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setOrderInfo(responeOrderInfo.data.data);
                console.log(responeOrderInfo.data.data);
            } catch (error) {
                console.error("Failed to fetch order info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderInfo();
    }, []);
    console.log(orderInfo);
    const filteredOrders = orderInfo?.map((order) => ({
        orderId: order?.orderId,
        customerName: order?.customerName,
        orderDate: order?.orderDate,
        totalAmount: order?.totalAmount,
        status: order?.status,
    }));
    console.log(filteredOrders);
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
        listData: filteredOrders,
        defaultSort: "status",
        defaultOrder: "desc",
    });
    return (
        <Box py={4}>
            <H3 mb={2}>Orders</H3>

            <SearchOrder
                handleSearch={() => {}}
                searchPlaceholder="Search Order..."
            />

            <Card>
                <Scrollbar>
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
                                numSelected={selected?.length}
                                rowCount={filteredList?.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((orderInfo) => (
                                    <OrderRow
                                        order={orderInfo}
                                        key={orderInfo?.orderId}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(orderInfo?.length / rowsPerPage)}
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
    const orders = await api?.orders();
    return {
        props: {
            orders,
        },
    };
};