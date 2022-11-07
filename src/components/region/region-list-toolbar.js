import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const RegionListToolbar = (props) => {
    const router = useRouter();
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
                    <Button
                        sx={{ m: 1 }}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            router.push("/create-user");
                        }}
                    >
                        Add Region
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
