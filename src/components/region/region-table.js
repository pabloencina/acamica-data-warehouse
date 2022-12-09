import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { RegionListToolbar } from "./region-list-toolbar";
import RegionRow from "./region-row";

export default function RegionTable({ regions, refreshRegions }) {
    return (
        <>
            <RegionListToolbar refreshRegions={refreshRegions} />
            <Box sx={{ mt: 3 }}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th"></TableCell>
                                <TableCell component="th">Regions</TableCell>
                                <TableCell component="th">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {regions.map((region) => (
                                <RegionRow
                                    key={region.name}
                                    region={region}
                                    refreshRegions={refreshRegions}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
