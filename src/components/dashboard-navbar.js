import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useContext } from "react";
import { deleteTokenFromCookie } from "src/services/loginService";
import { AppContext } from "src/utils/app-context-provider";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
    const { handleLoggedUserChange } = useContext(AppContext);

    const { onSidebarOpen, ...other } = props;

    const router = useRouter();

    const handleLogOut = (event) => {
        deleteTokenFromCookie();
        handleLoggedUserChange({});
        router.push("/login");
    };

    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    width: {
                        lg: "calc(100% - 150px)",
                    },
                }}
                {...other}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2,
                    }}
                >
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{
                            display: {
                                xs: "inline-flex",
                                lg: "none",
                            },
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip title="Log out">
                        <IconButton sx={{ ml: 1 }} onClick={handleLogOut}>
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func,
};
