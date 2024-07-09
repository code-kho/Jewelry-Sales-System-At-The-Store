import { Box, Button, Container, MenuItem, styled } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    KeyboardArrowDown,
} from "@mui/icons-material";
import BazaarCard from "components/BazaarCard";
import { FlexBox } from "components/flex-box";
import Category from "components/icons/Category";
import NavLink from "components/nav-link/NavLink";
import { Paragraph } from "components/Typography";
import CategoryMenu from "components/categories/CategoryMenu";
import MegaMenu from "./MegaMenu";
import MegaMenu2 from "./MegaMenu2";
import useSettings from "hooks/useSettings";
import navbarNavigations from "data/navbarNavigations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const navLinkStyle = {
    cursor: "pointer",
    transition: "color 150ms ease-in-out",
    color: "#FFFFFF",
    "&:hover": {
        color: "primary.main",
    },
    "&:last-child": {
        marginRight: 0,
    },
};

const StyledNavLink = styled(NavLink)(() => ({ ...navLinkStyle }));
const ParentNav = styled(Box)(({ theme }) => ({
    "&:hover": {
        color: theme.palette.primary.main,
        "& > .parent-nav-item": {
            display: "block",
        },
    },
}));
const ParentNavItem = styled(Box)(({ theme }) => ({
    top: 0,
    zIndex: 5,
    left: "100%",
    paddingLeft: 8,
    display: "none",
    position: "absolute",
    [theme.breakpoints.down(1640)]: {
        right: "100%",
        left: "auto",
        paddingRight: 8,
    },
}));
const NavBarWrapper = styled(BazaarCard)(({ theme, border }) => ({
    height: "60px",
    display: "block",
    fontSize: "17px",
    backgroundColor: "#984465",
    borderRadius: "0px",
    position: "relative",
    ...(border && {
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
    }),
    [theme.breakpoints.down(1150)]: {
        display: "none",
    },
}));
const InnerContainer = styled(Container)(() => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));
const CategoryMenuButton = styled(Button)(({ theme }) => ({
    width: "278px",
    height: "40px",
    backgroundColor: theme.palette.grey[100],
    "&:hover": {
        backgroundColor: "#FFFFFF",
    },
}));
const ChildNavsWrapper = styled(Box)(() => ({
    zIndex: 5,
    left: "50%",
    top: "100%",
    display: "none",
    position: "absolute",
    transform: "translate(-50%, 0%)",
}));

const LogoutButton = styled("div")(({ theme }) => ({
    color: "white",
    cursor: "pointer",
    "&:hover": {
        color: theme.palette.primary.main,
    },
}));

const Navbar = ({ navListOpen, hideCategories, elevation, border }) => {
    const router = useRouter();
    const { settings } = useSettings();
    const [role, setRole] = useState("");
    useEffect(() => {
        const role = localStorage.getItem("role");
        setRole(role);
    }, []);
    const handleLogOut = () => {
        console.log("Logout clicked");
        localStorage.clear();
        router.push("/login");
    };
    const renderNestedNav = (list = [], isRoot = false) => {
        return list.map((nav) => {
            if (isRoot) {
                if (nav.megaMenu) {
                    return (
                        <MegaMenu
                            key={nav.title}
                            title={nav.title}
                            menuList={nav.child}
                        />
                    );
                }
                if (nav.megaMenuWithSub) {
                    return (
                        <MegaMenu2
                            key={nav.title}
                            title={nav.title}
                            menuList={nav.child}
                        />
                    );
                }
                if (role === "staff") {
                    if (
                        (nav.url && nav.withStaff === true) ||
                        nav.common === true
                    ) {
                        return (
                            <StyledNavLink href={nav.url} key={nav.title}>
                                {nav.title}
                            </StyledNavLink>
                        );
                    }
                } else {
                    if (
                        (nav.url && nav.withStaff === false) ||
                        nav.common === true
                    ) {
                        return (
                            <StyledNavLink href={nav.url} key={nav.title}>
                                {nav.title}
                            </StyledNavLink>
                        );
                    }
                }
                if (nav.child) {
                    return (
                        <FlexBox
                            key={nav.title}
                            alignItems="center"
                            position="relative"
                            flexDirection="column"
                            sx={{
                                "&:hover": {
                                    "& > .child-nav-item": {
                                        display: "block",
                                    },
                                },
                            }}
                        >
                            <FlexBox
                                alignItems="flex-end"
                                gap={0.3}
                                sx={navLinkStyle}
                            >
                                {nav.title}{" "}
                                <KeyboardArrowDown
                                    sx={{
                                        color: "grey.500",
                                        fontSize: "1.1rem",
                                    }}
                                />
                            </FlexBox>
                            <ChildNavsWrapper className="child-nav-item">
                                <BazaarCard
                                    elevation={3}
                                    sx={{
                                        mt: 2.5,
                                        py: 1,
                                        minWidth: 200,
                                    }}
                                >
                                    {renderNestedNav(nav.child)}
                                </BazaarCard>
                            </ChildNavsWrapper>
                        </FlexBox>
                    );
                }
            } else {
                if (nav.url) {
                    return (
                        <NavLink href={nav.url} key={nav.title}>
                            <MenuItem>{nav.title}</MenuItem>
                        </NavLink>
                    );
                }
                if (nav.child) {
                    return (
                        <ParentNav
                            position="relative"
                            minWidth="230px"
                            key={nav.title}
                        >
                            <MenuItem color="grey.700">
                                <Box flex="1 1 0" component="span">
                                    {nav.title}
                                </Box>
                                {settings.direction === "ltr" ? (
                                    <ArrowRight fontSize="small" />
                                ) : (
                                    <ArrowLeft fontSize="small" />
                                )}
                            </MenuItem>
                            <ParentNavItem className="parent-nav-item">
                                <BazaarCard
                                    sx={{
                                        py: "0.5rem",
                                        minWidth: "230px",
                                    }}
                                    elevation={3}
                                >
                                    {renderNestedNav(nav.child)}
                                </BazaarCard>
                            </ParentNavItem>
                        </ParentNav>
                    );
                }
            }
        });
    };

    return (
        <NavBarWrapper
            hoverEffect={false}
            elevation={elevation}
            border={border}
        >
            {!hideCategories ? (
                <InnerContainer>
                    <CategoryMenu open={navListOpen}>
                        <CategoryMenuButton variant="text">
                            <Category fontSize="small" />
                            <Paragraph
                                fontWeight="600"
                                textAlign="left"
                                flex="1 1 0"
                                ml={1.25}
                                color="grey.600"
                            >
                                Categories
                            </Paragraph>
                            {settings.direction === "ltr" ? (
                                <ChevronRight
                                    className="dropdown-icon"
                                    fontSize="small"
                                />
                            ) : (
                                <ChevronLeft
                                    className="dropdown-icon"
                                    fontSize="small"
                                />
                            )}
                        </CategoryMenuButton>
                    </CategoryMenu>
                    <FlexBox gap={4}>
                        {renderNestedNav(navbarNavigations, true)}
                        <LogoutButton onClick={handleLogOut}>
                            Logout
                        </LogoutButton>
                    </FlexBox>
                </InnerContainer>
            ) : (
                <InnerContainer sx={{ justifyContent: "center" }}>
                    <FlexBox gap={4}>
                        {renderNestedNav(navbarNavigations, true)}
                        <LogoutButton onClick={handleLogOut}>
                            Logout
                        </LogoutButton>
                    </FlexBox>
                </InnerContainer>
            )}
        </NavBarWrapper>
    );
};

Navbar.defaultProps = {
    elevation: 2,
    navListOpen: false,
    hideCategories: false,
};
export default Navbar;
