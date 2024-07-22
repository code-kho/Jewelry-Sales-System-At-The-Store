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
        title: "Logout",
        url: "/login",
        withStaff: false,
    },
];
export default navbarNavigations;
