import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import AccountForm from "../../../src/pages-sections/admin/accounts/AccountForm";
import axios from "axios";
import { useRouter } from "next/router"; // =============================================================================

CreateAccount.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function CreateAccount() {
  const router = useRouter();
  const INITIAL_VALUES = {
    userName: "",
    name: "",
    address: "",
    email: "",
    password: "",
    phoneNumber: "",
    roleId: "",
    counterId: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    userName: yup.string().required("required"),
    address: yup.string().required("required"),
    email: yup.string().required("required"),
    password: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
    roleId: yup.string().required("required"),
    counterId: yup.string().required("required"),
  });

  const handleFormSubmit = async (values) => {
    const accountNew = {
      name: values.name,
      userName: values.userName,
      address: values.address,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      roleId: values.roleId,
      counterId: values.counterId,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://four-gems-api-c21adc436e90.herokuapp.com/user/signup",
        accountNew,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    await router.push("/admin/users-account");
  };
  return (
    <Box py={4}>
      <H3 mb={2}>Add New User</H3>

      <AccountForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
