import { Box, Button, Typography } from "@mui/material";
import CreateRegionDialog from "src/components/region/create-region-dialog";

export const RegionListToolbar = (props) => {
    const { refreshRegions } = props;
    return (
        <Box>
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
                    <CreateRegionDialog refreshRegions={refreshRegions} />
                </Box>
            </Box>
        </Box>
    );
};
