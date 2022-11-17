import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const CompanyListToolbar = (props) => {
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
                    Companies
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button
                        sx={{ m: 1 }}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            router.push("/create-company");
                        }}
                    >
                        Add Company
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
