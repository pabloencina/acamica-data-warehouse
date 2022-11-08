import { Box, Button, Typography } from "@mui/material";
import CreateRegionDialog from "src/pages/create-region-dialog";

export const RegionListToolbar = (props) => {
    return (
        <Box {...props}>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    m: -1,
                }}
            >
                <Typography sx={{ m: 1 }} variant="h6">
                    Regions
                </Typography>
                <Box sx={{ m: 1 }}>
                    <CreateRegionDialog />
                </Box>
            </Box>
        </Box>
    );
};
