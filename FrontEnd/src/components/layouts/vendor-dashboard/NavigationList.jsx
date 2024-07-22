import duotone from "components/icons/duotone";
export const navigations = [
    {
        type: "label",
        label: "Admin",
        withAdmin: "true",
    },
    {
        name: "Dashboard",
        icon: duotone.Dashboard,
        path: "/vendor/dashboard",
        withAdmin: "true",
    },
    {
        name: "Product List",
        icon: duotone.Products,
        path: "/admin/products",
        withAdmin: "true",
    },
    {
        name: "Category List",
        icon: duotone.Products,
        path: "/admin/categories",
        withAdmin: "true",
    },
    {
        name: "Export Product To Counter",
        icon: duotone.Products,
        withAdmin: "true",
        children: [
            {
                name: "Import Requests",
                path: "/admin/import/import-goods",
            },
            {
                name: "Quantity Counter List",
                path: "/admin/import/counter-list",
            },
        ],
    },
    {
        name: "Users Account",
        icon: duotone.Customers,
        path: "/admin/users-account",
        withAdmin: "true",
    },
    // DemoFinal
    // {
    //     name: "Warranty",
    //     icon: duotone.Refund,
    //     children: [
    //         {
    //             name: "Warranty Request",
    //             path: "/admin/refund-request",
    //         },
    //         {
    //             name: "Warranty Settings",
    //             path: "/admin/refund-setting",
    //         },
    //     ],
    // },
    // {
    //     name: "Support Tickets",
    //     icon: duotone.AccountSetting,
    //     path: "/vendor/support-tickets",
    // },
    {
        type: "label",
        label: "Manager",
    },
    // {
    //     name: "Earnings",
    //     icon: duotone.ProjectChart,
    //     children: [
    //         {
    //             name: "Earning History",
    //             path: "/vendor/earning-history",
    //         },
    //         {
    //             name: "Payments",
    //             path: "/vendor/payouts",
    //         },
    //     ],
    // },
    {
        name: "Manager Product List",
        icon: duotone.Products,
        path: "/manager/products",
    },
    {
        name: "Order List",
        icon: duotone.Order,
        path: "/admin/orders",
    },
    {
        name: "Rotate Goods",
        icon: duotone.Products,
        children: [
            {
                name: "Rotate Requests",
                path: "/admin/rotate/rotate-request",
            },
            {
                name: "Rotate List",
                path: "/admin/rotategoodslist/rotategoods-list",
            },
        ],
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
    {
        name: "Sellers",
        icon: duotone.Seller,
        path: "/admin/sellers",
    },
];
