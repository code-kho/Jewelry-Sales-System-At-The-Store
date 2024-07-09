import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import useMuiTable from "hooks/useMuiTable";
import { CustomerRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const tableHeading = [
    {
        id: "name",
        label: "Name",
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
        id: "password",
        label: "Password",
        align: "left",
    },
    {
        id: "email",
        label: "Email",
        align: "left",
    },
    {
        id: "roleName",
        label: "Role Name",
        align: "left",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
    },
];

CustomerList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function CustomerList({ initialCustomers }) {
    const [customers, setCustomers] = useState(initialCustomers);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [dataSearch, setDataSearch] = useState();
    const [accountSearch, setAccountSearch] = useState();
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem("token");
    } else {
        // If neither localStorage nor sessionStorage is supported
        console.log("Web Storage is not supported in this environment.");
    }
    const handleNav = () => {
        router.push("/admin/users/create");
    };
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
        listData: customers,
    });
    //console.log(customers)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const respone = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/user/get-all`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setCustomers(respone.data.data);
            } catch (error) {
                console.error("Failed to fetch customers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchDataSearch = async () => {
            try {
                const responeSearch = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/user/get-by-email?email=${dataSearch}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token, //the token is a variable which holds the token
                        },
                    }
                );
                setAccountSearch(responeSearch.data.data);
                setCustomers(responeSearch.data.data);
            } catch (error) {
                console.error("Failed to search customers:", error);
            }
        };
        fetchDataSearch();
    }, [dataSearch]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Box py={4}>
            <H3 mb={2}>Users</H3>

            <SearchArea
                dataSearch={dataSearch}
                setDataSearch={setDataSearch}
                buttonText="Add User"
                handleBtnClick={handleNav}
                searchPlaceholder="Search User..."
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
                                numSelected={selected.length}
                                rowCount={filteredList.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((customer) => (
                                    <CustomerRow
                                        customer={customer}
                                        key={customer.id}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(customers.length / rowsPerPage)}
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
    const customers = await api.customers();
    return {
        props: {
            initialCustomers: customers,
        },
    };
};
