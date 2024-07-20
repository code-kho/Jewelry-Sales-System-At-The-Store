import categoriesMegaMenu from "./categoriesMegaMenu";
import { useEffect } from "react"; // MEGAMENU DATA

const navbarNavigations = [
    {
        title: "Home",
        megaMenu: false,
        megaMenuWithSub: false,
        url: "/",
        withStaff: true,
    },
    {
        megaMenu: false,
        megaMenuWithSub: false,
        title: "Barcode",
        url: "/barcode",
        withStaff: true,
    },
    {
        megaMenu: false,
        megaMenuWithSub: false,
        title: "Support Ticket",
        url: "/support-ticket",
        common: true,
    },
    {
        megaMenu: false,
        megaMenuWithSub: false,
        title: "Buy Back",
        url: "/buy-back",
        withStaff: false,
    },
    {
        megaMenu: false,
        megaMenuWithSub: false,
        title: "Warranty",
        url: "/warranty",
        withStaff: false,
    },
];
export default navbarNavigations;
