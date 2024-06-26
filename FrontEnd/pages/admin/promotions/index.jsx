import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import useMuiTable from "hooks/useMuiTable";
import PromotionRow from "pages-sections/admin/promotions/PromotionsRow";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const tableHeading = [
    { id: "promotionId", label: "Promotion ID", align: "left" },
    { id: "description", label: "Description", align: "left" },
    { id: "discount", label: "Discount", align: "left" },
    { id: "endDate", label: "End Date", align: "left" },
    { id: "action", label: "Action", align: "center" },
];

PromotionList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function PromotionList() {
    const [promotions, setPromotions] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [dataSearch, setDataSearch] = useState("");

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
        router.push("/admin/promotions/create");
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
        listData: promotions,
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "https://four-gems-api-c21adc436e90.herokuapp.com/promotions",
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setPromotions(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Failed to fetch promotions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDataSearch = async () => {
            if (!dataSearch) return;
            try {
                const response = await axios.get(
                    `https://four-gems-api-c21adc436e90.herokuapp.com/promotions/search?query=${dataSearch}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setPromotions(response.data.data);
            } catch (error) {
                console.error("Failed to search promotions:", error);
            }
        };
        fetchDataSearch();
    }, [dataSearch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box py={4}>
            <H3 mb={2}>Promotions</H3>

            <SearchArea
                dataSearch={dataSearch}
                setDataSearch={setDataSearch}
                buttonText="Add Promotion"
                handleBtnClick={handleNav}
                searchPlaceholder="Search Promotion..."
            />

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 900 }}>
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
                                {filteredList.map((promotion) => (
                                    <PromotionRow
                                        promotion={promotion}
                                        key={promotion.promotionId}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(promotions?.length / rowsPerPage)}
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
        const promotions = await api.fetchPromotions();
        return {
            props: {
                initialPromotions: promotions,
            },
        };
    } catch (error) {
        return {
            props: {
                initialPromotions: [],
            },
        };
    }
};
