import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RegionRow from "./region-row";
import { RegionListToolbar } from "./region-list-toolbar";

export default function CollapsibleTable({ regions }) {
    console.log(regions);
    //const { regions } = regions;

    return (
        <>
            <RegionListToolbar />
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
                            <RegionRow key={region.name} region={region} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
