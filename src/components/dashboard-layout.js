import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { AppContext } from "src/utils/app-context-provider";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "xl",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
        paddingLeft: 160,
    },
}));

export const DashboardLayout = (props) => {
    const { children } = props;
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { loggedUser } = useContext(AppContext);

    return (
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    {children}
                </Box>
            </DashboardLayoutRoot>
            <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
            <DashboardSidebar
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
                loggedUser={loggedUser}
            />
        </>
    );
};
