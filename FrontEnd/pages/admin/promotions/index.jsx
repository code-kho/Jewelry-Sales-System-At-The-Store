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
import SearchCustomer from "../../../src/components/dashboard/SearchCustomer";
import PromotionRow from "../../../src/pages-sections/admin/promotion/PromotionRow";
import SearchPromotion from "../../../src/components/dashboard/SearchPromotion";
import {useRouter} from "next/router"; // table column list

const tableHeading = [
    {
        id: "id",
        label: "Id",
        align: "left",
    },
    {
        id: "description",
        label: "Description",
        align: "left",
    },
    {
        id: "discount",
        label: "Discount",
        align: "left",
    },
    {
        id: "startDate",
        label: "Start Date",
        align: "left",
    },
    {
        id: "endDate",
        label: "End Date",
        align: "left",
    },
]; // =============================================================================

SellerList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function SellerList() {
    const [promotionInfo, setPromotionInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSearch, setDataSearch] = useState();
    const [promotionSearch, setPromotionSearch] = useState([]);
    const router = useRouter();
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else {
        
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
        listData: promotionInfo,
    });
    const handleAddPromotion = async => {
        router.push("/admin/promotions/create")
    }
    useEffect(() => {
        const fetchDataPromotion = async () => {
            setLoading(true);
            try {
                const responePromotionInfo = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/promotions`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setPromotionInfo(responePromotionInfo.data.data.content);
            } catch (error) {
                console.error("Failed to fetch promotion info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataPromotion();
    }, []);
    useEffect(() => {
        const fetchDataPromotionSearch = async () => {
            try {
                const responeSearchPromotion = await axios.get(
                    `https://four-gems-system-790aeec3afd8.herokuapp.com/promotions?description=${dataSearch}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setPromotionSearch(responeSearchPromotion.data.data.content);
                setPromotionInfo(responeSearchPromotion.data.data.content);
            } catch (error) {
                console.error("Failed to search data customers:", error);
            }
        };
        fetchDataPromotionSearch();
    }, [dataSearch]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Box py={4}>
            <H3 mb={2}>Promotion</H3>
            <SearchPromotion
                dataSearch={dataSearch}
                setDataSearch={setDataSearch}
                buttonText="Add Promotion"
                handleBtnClick={() => {handleAddPromotion()}}
                searchPlaceholder="Search Promotion..."
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
                                    <PromotionRow
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
                        count={Math.ceil(promotionInfo?.length / rowsPerPage)}
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
