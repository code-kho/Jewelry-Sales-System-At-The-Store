import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import useMuiTable from "hooks/useMuiTable";
import api from "utils/__api__/dashboard";
import CustomerOrderRow from "../../../src/pages-sections/admin/customers/CustomerOrderRow";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchCustomer from "../../../src/components/dashboard/SearchCustomer"; // table column list

const tableHeading = [
    {
        id: "name",
        label: "Name",
        align: "left",
    },
    {
        id: "membership",
        label: "MemberShip",
        align: "left",
    },
    {
        id: "email",
        label: "Email",
        align: "left",
    },
    {
        id: "phone",
        label: "Phone",
        align: "left",
    },
    {
        id: "address",
        label: "Address",
        align: "left",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
    },
]; // =============================================================================

SellerList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function SellerList({ sellers }) {
    const [customerInfo, setCustomerInfo] = useState(sellers);
    const [loading, setLoading] = useState(false);
    const [dataSearch, setDataSearch] = useState();
    const [customerSearch, setCustomerSearch] = useState();
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = localStorage.getItem("token");
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
        listData: customerInfo,
    });
    console.log(customerInfo);
    useEffect(() => {
        const fetchDataCus = async () => {
            setLoading(true);
            try {
                const responeCusInfo = await axios.get(
                    `https://four-gems-api-c21adc436e90.herokuapp.com/customers`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setCustomerInfo(responeCusInfo.data.data);
            } catch (error) {
                console.error("Failed to fetch customers info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataCus();
    }, []);
    useEffect(() => {
        console.log(dataSearch);
        const fetchDataCusSearch = async () => {
            try {
                const responeSearchCus = await axios.get(
                    `https://four-gems-api-c21adc436e90.herokuapp.com/customers?phoneNumber=${dataSearch}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setCustomerSearch(responeSearchCus.data.data);
                console.log(responeSearchCus.data.data);
                setCustomerInfo(responeSearchCus.data.data);
            } catch (error) {
                console.error("Failed to search data customers:", error);
            }
        };
        fetchDataCusSearch();
    }, [dataSearch]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Box py={4}>
            <H3 mb={2}>Customers</H3>
            <SearchCustomer
                dataSearch={dataSearch}
                setDataSearch={setDataSearch}
                searchPlaceholder="Search Customer..."
            />

            <Card>
                <Scrollbar>
                    <TableContainer
                        sx={{
                            minWidth: 1100,
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
                            />

                            <TableBody>
                                {filteredList.map((seller, index) => (
                                    <CustomerOrderRow
                                        seller={seller}
                                        key={index}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(customerInfo?.length / rowsPerPage)}
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
    const customerInfo = await api.sellers();
    return {
        props: {
            customerInfo,
        },
    };
};
