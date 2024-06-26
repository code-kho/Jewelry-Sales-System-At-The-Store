import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import useMuiTable from "hooks/useMuiTable";
import { SellerRow } from "pages-sections/admin";
import { useState, useEffect } from "react";
import CustomSearchArea from './CustomSearchArea';

const tableHeading = [
  { id: "fullName", label: "Full Name", align: "left" },
  { id: "username", label: "Username", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "roleName", label: "Role", align: "left" },
  { id: "revenue", label: "Revenue", align: "left" },
  { id: "action", label: "Action", align: "center" },
];
function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}

export default function SellerList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    if (!storedToken) {
      console.error("No token found");
      return;
    }



    fetch("https://four-gems-api-c21adc436e90.herokuapp.com/user/get-all", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
        .then(response => response.json())
        .then(data => {
          if (data.status === 0 && data.data) {
            setUsers(data.data.filter(user => user.roleName === "staff"));
          }
        })
        .catch(error => console.error("Error fetching users:", error));
  }, []);
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: users,
  });
  return getLayout(<Box py={4}>
    <H3 mb={2}>Sellers</H3>

    <SearchArea
        handleSearch={() => {}}
        buttonText=""
        handleBtnClick={() => {}}
        searchPlaceholder="Search Seller..."
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
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
            />

            <TableBody>
              {filteredList.map((user, index) => (
                  <SellerRow user={user} key={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Stack alignItems="center" my={4}>
        <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(users.length / rowsPerPage)}
        />
      </Stack>
    </Card>
  </Box>);
}
