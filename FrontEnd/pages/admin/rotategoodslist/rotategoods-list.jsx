import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import { ReviewRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import {useEffect, useState} from "react";
import axios from "axios";
// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "id",
    label: "Resquest Id",
    align: "left",
  },
  {
    id: "fromCounter",
    label: "From Counter",
    align: "left",
  },
  {
    id: "toCounter",
    label: "To Counter",
    align: "left",
  },
  {
    id: "totalQuantity",
    label: "Total Product",
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

RotategoodsList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function RotategoodsList({ reviews }) {
  const [showRotate, setShowRotate] = useState();
  let token = '';
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  } else if (typeof sessionStorage !== 'undefined') {
    // Fallback to sessionStorage if localStorage is not supported
    token = localStorage.getItem('token');
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log('Web Storage is not supported in this environment.');
  }
  useEffect(() => {
    const counterId = localStorage.getItem("counterId");
    const fetchRotateReq = async () => {
      try {
        const resRotateRes = await axios.get(
            `https://four-gems-system-790aeec3afd8.herokuapp.com/transfer-request/get-in-counter?counterId=${counterId}`,
            {
              headers: {
                Authorization: "Bearer " + token, //the token is a variable which holds the token
              },
            }
        );
        console.log(resRotateRes.data.data);
        setShowRotate(resRotateRes.data.data);
      } catch (e) {
        console.log("Can not fetch rotate request" + e);
      }
    };
    fetchRotateReq();
  }, []);
  const filteredRotateReq = showRotate?.map((item) => ({
    id: item.id,
    fromCounter: item.fromCounter.address,
    toCounter: item.toCounter.address,
    totalQuantity: item.totalQuantity,
    status: item.status
  }));
  console.log(filteredRotateReq)
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredRotateReq,
    defaultSort: "product",
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Product Reviews</H3>

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 1000,
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
                {filteredList?.map((showRotate) => (
                  <ReviewRow showRotate={showRotate} key={showRotate.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(filteredList.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const reviews = await api.reviews();
  return {
    props: {
      reviews,
    },
  };
};
