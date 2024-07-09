import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import CreateCustomer from "../../../src/pages-sections/admin/CustomerInfo/CreateCustomer";
import CustomerInfoCreateLayout from "../../../src/components/layouts/customer-create-form"; // =============================================================================

CreateCusInfo.getLayout = function getLayout(page) {
    return <CustomerInfoCreateLayout>{page}</CustomerInfoCreateLayout>;
}; // =============================================================================

export default function CreateCusInfo() {
    const router = useRouter();
    const INITIAL_VALUES = {
        name: "",
        gender: "",
        email: "",
        phoneNumber: "",
        address: "",
    };
    const validationSchema = yup.object().shape({
        name: yup.string().required("required"),
        gender: yup.string().required("required"),
        email: yup.string().required("required"),
        phoneNumber: yup.string().required("required"),
        address: yup.string().required("required"),
    });

    const handleFormSubmit = async (values) => {
        const customerInfo = {
            name: values.name,
            gender: values.gender,
            email: values.email,
            phoneNumber: values.phoneNumber,
            address: values.address,
        };
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "https://four-gems-system-790aeec3afd8.herokuapp.com/customers",
                customerInfo,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
        } catch (e) {
            console.log(e);
        }
        await router.push("/checkout");
    };
    return (
        <Box py={4}>
            <H3 mb={2}>Add New Customer</H3>

            <CreateCustomer
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                handleFormSubmit={handleFormSubmit}
            />
        </Box>
    );
}
