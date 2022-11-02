import { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { company as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";

const items = [
    {
        href: "/contacts",
        icon: <UsersIcon fontSize="small" />,
        title: "Contacts",
    },
    {
        href: "/companies",
        icon: <ShoppingBagIcon fontSize="small" />,
        title: "Companies",
    },
    {
        href: "/users",
        icon: <UserIcon fontSize="small" />,
        title: "Users",
    },
    {
        href: "/regions",
        icon: <CogIcon fontSize="small" />,
        title: "Region/city",
    },
    {
        href: "/register",
        icon: <UserAddIcon fontSize="small" />,
        title: "Register",
    },
    {
        href: "/login",
        icon: <LockIcon fontSize="small" />,
        title: "Login",
    },
];

export const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    const router = useRouter();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
        defaultMatches: true,
        noSsr: false,
    });

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            if (open) {
                onClose?.();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.asPath]
    );

    const content = (
        <>
            <Logo
                sx={{
                    display: "flex",
                    height: "30%",
                }}
            ></Logo>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <Divider
                    sx={{
                        borderColor: "#2D3748",
                        my: 3,
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
                <Divider sx={{ borderColor: "#2D3748" }} />
                <Box
                    sx={{
                        px: 2,
                        py: 3,
                    }}
                ></Box>
            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: "neBASICutral.900",
                        color: "#FFFFFF",
                        width: 160,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: "neutral.900",
                    color: "#FFFFFF",
                    width: 180,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
