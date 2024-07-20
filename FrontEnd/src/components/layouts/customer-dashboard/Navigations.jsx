import { Fragment } from "react";
import { useRouter } from "next/router";
import { Card, styled, Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import NavLink from "components/nav-link/NavLink"; // custom styled components

const MainContainer = styled(Card)(({ theme }) => ({
    paddingBottom: "1.5rem",
    [theme.breakpoints.down("md")]: {
        boxShadow: "none",
        overflowY: "auto",
        height: "calc(100vh - 64px)",
    },
}));
const StyledNavLink = styled(
    ({ children, isCurrentPath, onClick, ...rest }) => (
        <NavLink onClick={onClick} {...rest}>
            {children}
        </NavLink>
    )
)(({ theme, isCurrentPath }) => ({
    display: "flex",
    alignItems: "center",
    borderLeft: "4px solid",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    marginBottom: "1.25rem",
    justifyContent: "space-between",
    borderColor: isCurrentPath ? theme.palette.primary.main : "transparent",
    "& .nav-icon": {
        color: isCurrentPath
            ? theme.palette.primary.main
            : theme.palette.grey[600],
    },
    "&:hover": {
        borderColor: theme.palette.primary.main,
        "& .nav-icon": {
            color: theme.palette.primary.main,
        },
    },
}));

const Navigations = () => {
    const { pathname, router } = useRouter();

    const handleLogOut = () => {
        router?.push("/login");
        localStorage.clear();
    };

    return (
        <MainContainer>
            {linkList.map((item) => (
                <Fragment key={item.title}>
                    <Typography
                        p="26px 30px 1rem"
                        color="grey.600"
                        fontSize="12px"
                    >
                        {item.title}
                    </Typography>

                    {item.list.map((item) => (
                        <StyledNavLink
                            href={item.href}
                            key={item.title}
                            isCurrentPath={pathname.includes(item.href)}
                            onClick={
                                item.title === "Logout"
                                    ? handleLogOut
                                    : undefined
                            }
                        >
                            <FlexBox alignItems="center" gap={1}>
                                <span>{item.title}</span>
                            </FlexBox>
                        </StyledNavLink>
                    ))}
                </Fragment>
            ))}
        </MainContainer>
    );
};

const linkList = [
    {
        title: "DASHBOARD",
        list: [
            {
                href: "/support-tickets",
                title: "Support Tickets",
            },
            {
                href: "/buy-back",
                title: "Buy Back",
            },
            {
                href: "/wish-list",
                title: "Warranty",
            },
            {
                href: "/login",
                title: "Logout",
            },
        ],
    },
];
export default Navigations;
