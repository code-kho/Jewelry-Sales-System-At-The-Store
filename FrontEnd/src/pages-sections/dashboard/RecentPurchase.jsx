import { Button, Card } from "@mui/material";
import { H5 } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import DataListTable from "./table"; // table column list
import { useRouter } from "next/router";
const tableHeading = [
  {
    id: "orderId",
    label: "Seller ID",
    alignRight: false,
  },
  {
    id: "product",
    label: "Name",
    alignRight: false,
  },
  {
    id: "payment",
    label: "Phone Number",
    alignRight: false,
  },
  {
    id: "amount",
    label: "Amount",
    alignCenter: true,
  },
]; // ===================================================

// ===================================================
const RecentPurchase = ({ data }) => {
  const router = useRouter();
  const hadleNav1 = () => {
    router.push("/admin/earning-history");
  };
  return (
    <Card>
      <FlexBetween px={3} py={2.5}>
        <H5>KPI Board</H5>

        <Button
          size="small"
          color="info"
          variant="outlined"
          onClick={hadleNav1}
        >
          All Saler
        </Button>
      </FlexBetween>

      <DataListTable
        dataList={data}
        tableHeading={tableHeading}
        type="RECENT_PURCHASE"
      />
    </Card>
  );
};

export default RecentPurchase;
