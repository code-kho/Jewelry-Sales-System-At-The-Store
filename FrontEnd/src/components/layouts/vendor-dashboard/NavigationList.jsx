import duotone from "components/icons/duotone";
export const navigations = [
    {
        type: "label",
        label: "Admin",
    },
    {
        name: "Dashboard",
        icon: duotone.Dashboard,
        path: "/vendor/dashboard",
    },
    {
        name: "Products",
        icon: duotone.Products,
        children: [
            {
                name: "Product List",
                path: "/admin/products",
            },
            {
                name: "Review",
                path: "/admin/product-reviews",
            },
        ],
    },
    {
        name: "Orders",
        icon: duotone.Order,
        children: [
            {
                name: "Order List",
                path: "/admin/orders",
            },
        ],
    },
    {
        name: "Users Account",
        icon: duotone.Customers,
        path: "/admin/users-account",
    },
    {
        name: "Warranty",
        icon: duotone.Refund,
        children: [
            {
                name: "Warranty Request",
                path: "/admin/refund-request",
            },
            {
                name: "Warranty Settings",
                path: "/admin/refund-setting",
            },
        ],
    },
    {
        name: "Sellers",
        icon: duotone.Seller,
        children: [
            {
                name: "Seller List",
                path: "/admin/sellers",
            },
            {
                name: "Earning History",
                path: "/admin/earning-history",
            },
        ],
    },
    {
        type: "label",
        label: "Vendor",
    },
    {
        name: "Earnings",
        icon: duotone.ProjectChart,
        children: [
            {
                name: "Earning History",
                path: "/vendor/earning-history",
            },
            {
                name: "Payments",
                path: "/vendor/payouts",
            },
        ],
    },
    {
        name: "Support Tickets",
        icon: duotone.AccountSetting,
        path: "/vendor/support-tickets",
    },
    {
        name: "Customers",
        icon: duotone.ElementHub,
        path: "/admin/customers",
    },
    {
        name: "Promotions",
        icon: duotone.ElementHub,
        path: "/admin/promotions",
    },
];
