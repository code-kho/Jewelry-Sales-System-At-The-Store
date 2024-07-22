import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Avatar, Box, useMediaQuery } from "@mui/material";
import LayoutDrawer from "../LayoutDrawer";
import Scrollbar from "components/Scrollbar";
import { FlexBetween } from "components/flex-box";
import SidebarAccordion from "./SidebarAccordion";
import {
    ListLabel,
    BadgeValue,
    StyledText,
    BulletIcon,
    NavWrapper,
    ExternalLink,
    NavItemButton,
    SidebarWrapper,
    ChevronLeftIcon,
    ListIconWrapper,
} from "./LayoutStyledComponents";
import { navigations } from "./NavigationList";
import { jwtDecode } from "jwt-decode";
const TOP_HEADER_AREA = 70;

// -----------------------------------------------------------------------------
const DashboardSidebar = (props) => {
    const {
        sidebarCompact,
        showMobileSideBar,
        setShowMobileSideBar,
        setSidebarCompact,
    } = props;
    const router = useRouter();
    const [onHover, setOnHover] = useState(false);
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    const [role, setRole] = useState(null);
    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem("token");
    } else {
        // If neither localStorage nor sessionStorage is supported
    }
    useEffect(() => {
        // Assume the role is stored in localStorage
        const decoded = jwtDecode(token);
        const userRole = decoded?.role;

        setRole(userRole);

        // Redirect based on role
        if (userRole === "manager" && router.pathname === "/vendor/dashboard") {
            router.push("/manager/products");
        }
    }, [router]);

    const COMPACT = sidebarCompact && !onHover ? 1 : 0;
    const activeRoute = (path) => (router.pathname === path ? 1 : 0);

    const handleNavigation = (path) => {
        router.push(path);
        setShowMobileSideBar();
    };

    const filterNavigations = () => {
        return navigations.filter((item) => {
            if (item.withAdmin && role !== "admin") return false;
            if (!item.withAdmin && role === "admin") return false;
            return true;
        });
    };

    const renderLevels = (data) => {
        return data.map((item, index) => {
            if (item.type === "label")
                return (
                    <ListLabel key={index} compact={COMPACT}>
                        {item.label}
                    </ListLabel>
                );

            if (item.children) {
                return (
                    <SidebarAccordion
                        key={index}
                        item={item}
                        sidebarCompact={COMPACT}
                    >
                        {renderLevels(item.children)}
                    </SidebarAccordion>
                );
            } else if (item.type === "extLink") {
                return (
                    <ExternalLink
                        key={index}
                        href={item.path}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <NavItemButton key={item.name} name="child" active={0}>
                            {item.icon ? (
                                <ListIconWrapper>
                                    <item.icon />
                                </ListIconWrapper>
                            ) : (
                                <span className="item-icon icon-text">
                                    {item.iconText}
                                </span>
                            )}

                            <StyledText compact={COMPACT}>
                                {item.name}
                            </StyledText>

                            {item.badge && (
                                <BadgeValue compact={COMPACT}>
                                    {item.badge.value}
                                </BadgeValue>
                            )}
                        </NavItemButton>
                    </ExternalLink>
                );
            } else {
                return (
                    <Box key={index}>
                        <NavItemButton
                            key={item.name}
                            className="navItem"
                            active={activeRoute(item.path)}
                            onClick={() => handleNavigation(item.path)}
                        >
                            {item?.icon ? (
                                <ListIconWrapper>
                                    <item.icon />
                                </ListIconWrapper>
                            ) : (
                                <BulletIcon active={activeRoute(item.path)} />
                            )}

                            <StyledText compact={COMPACT}>
                                {item.name}
                            </StyledText>

                            {item.badge && (
                                <BadgeValue compact={COMPACT}>
                                    {item.badge.value}
                                </BadgeValue>
                            )}
                        </NavItemButton>
                    </Box>
                );
            }
        });
    };

    const content = (
        <Scrollbar
            autoHide
            clickOnTrack={false}
            sx={{
                overflowX: "hidden",
                maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
            }}
        >
            <NavWrapper compact={sidebarCompact}>
                {renderLevels(filterNavigations())}
            </NavWrapper>
        </Scrollbar>
    );

    if (downLg) {
        return (
            <LayoutDrawer
                open={showMobileSideBar ? true : false}
                onClose={setShowMobileSideBar}
            >
                <Box p={2} maxHeight={TOP_HEADER_AREA}>
                    <Image
                        alt="Logo"
                        width={105}
                        height={50}
                        src="/assets/images/logo.svg"
                        style={{
                            marginLeft: 8,
                        }}
                    />
                </Box>

                {content}
            </LayoutDrawer>
        );
    }

    return (
        <SidebarWrapper
            compact={sidebarCompact ? 1 : 0}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => sidebarCompact && setOnHover(false)}
        >
            <FlexBetween
                p={2}
                maxHeight={TOP_HEADER_AREA}
                justifyContent={COMPACT ? "center" : "space-between"}
            >
                <Avatar
                    src={
                        COMPACT
                            ? "/assets/images/logo.svg"
                            : "/assets/images/logo.svg"
                    }
                    sx={{
                        borderRadius: 0,
                        width: "auto",
                        marginLeft: COMPACT ? 0 : 1,
                    }}
                />

                <ChevronLeftIcon
                    color="disabled"
                    compact={COMPACT}
                    onClick={setSidebarCompact}
                    sidebarcompact={sidebarCompact ? 1 : 0}
                />
            </FlexBetween>

            {content}
        </SidebarWrapper>
    );
};

export default DashboardSidebar;
