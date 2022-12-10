import BusinessIcon from "@mui/icons-material/Business";
import ContactsIcon from "@mui/icons-material/Contacts";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";

export const DashboardSidebar = (props) => {
    const { open, onClose, loggedUser } = props;

    const items = [
        {
            href: "/",
            icon: <ContactsIcon fontSize="small" />,
            title: "Contacts",
            show: true,
        },
        {
            href: "/companies",
            icon: <BusinessIcon fontSize="small" />,
            title: "Companies",
            show: true,
        },
        {
            href: "/regions",
            icon: <PublicIcon fontSize="small" />,
            title: "Regions",
            show: true,
        },
        {
            href: "/users",
            icon: <PersonIcon fontSize="small" />,
            title: "Users",
            show: loggedUser.profile === "ADMIN",
        },
    ];

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
            <Box
                sx={{
                    marginTop: 3,
                    display: "flex",
                    justifyContent: "center",
                    height: "10%",
                }}
            >
                <Logo
                    sx={{
                        display: "flex",
                        height: "100%",
                    }}
                ></Logo>
            </Box>
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
                        my: 2,
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                            show={item.show}
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
                        backgroundColor: "neutral.900",
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
