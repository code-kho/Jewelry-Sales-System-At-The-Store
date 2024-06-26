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
import OrderBuyBack from "../../src/pages-sections/admin/orders/OrderBuyBack";
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

BuyBackList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function BuyBackList({ orders }) {
    // RESHAPE THE ORDER LIST BASED TABLE HEAD CELL ID
    const [orderBuyBack, setOrderBuyBack] = useState();
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
        const fetchOrderBuyBack = async () => {
            setLoading(true);
            try {
                const responeOrderToBuyBack = await axios.get(
                    `https://four-gems-api-c21adc436e90.herokuapp.com/order/get-order-to-buy-back`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setOrderBuyBack(responeOrderToBuyBack.data.data);
                console.log(responeOrderToBuyBack.data.data);
            } catch (error) {
                console.error("Failed to fetch order buy back:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderBuyBack();
    }, []);
    console.log(orderBuyBack);
    const filteredOrders = orderBuyBack?.map((order) => ({
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
        <Box sx={{
            pl: 11,
            pr: 11,
        }}>
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
                                {filteredList.map((orderBuyBack) => (
                                    <OrderBuyBack
                                        order={orderBuyBack}
                                        key={orderBuyBack?.orderId}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(orderBuyBack?.length / rowsPerPage)}
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