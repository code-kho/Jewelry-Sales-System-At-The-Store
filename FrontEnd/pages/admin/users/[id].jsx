import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import axios from "axios";
import UpdateAccountForm from "../../../src/pages-sections/admin/accounts/UpdateAccountForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
UpdateAccount.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function UpdateAccount() {
  const router = useRouter();
  const [update, setUpdate] = useState();
  // console.log(update);
  useEffect(() => {
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
    const handleGetUser = async () => {
      try {
        const respone = await axios.post(
          `https://four-gems-system-790aeec3afd8.herokuapp.com/user/get-user-information?userId=${router.query.id}`,
          {
            userId: router.query.id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setUpdate(respone.data.data);
        // console.log(respone.data.data);
      } catch (error) {
        console.error("Failed to update account:", error);
      }
    };
    handleGetUser();
  }, []);
  const INITIAL_VALUES = {
    username: update?.username,
    fullName: update?.fullName,
    address: update?.address,
    phoneNumber: update?.phoneNumber,
    roleName: update?.roleName,
    revenue: update?.revenue,
  };
  const validationSchema = yup.object().shape({
    username: yup.string().required("required"),
    fullName: yup.string().required("required"),
    address: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
    roleName: yup.string().required("required"),
    revenue: yup.string().required("required"),
  });
  const handleFormSubmit = async (values) => {
    // console.log(values);
  };
  return (
    <Box py={4}>
      <H3 mb={2}>Update User</H3>

      <UpdateAccountForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
