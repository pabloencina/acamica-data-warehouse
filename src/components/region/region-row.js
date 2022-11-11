import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import CountryRow from "./country-row";
import CreateCountryDialog from "src/components/region/create-region-country-city/create-country-dialog";
import EditRegionDialog from "./edit-region-country-city/edit-region-dialog";

export default function RegionRow(props) {
    const { region, refreshRegions } = props;

    const [openCountry, setOpenCountry] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenCountry(!openCountry)}
                    >
                        {openCountry ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell scope="row">{region.name}</TableCell>
                <TableCell scope="row">
                    <EditRegionDialog />
                    <CreateCountryDialog regionId={region._id} refreshRegions={refreshRegions} />
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openCountry} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell component="th"></TableCell>
                                        <TableCell component="th">Countries</TableCell>
                                        <TableCell component="th">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {region.countries.map((country) => (
                                        <CountryRow
                                            key={country.name}
                                            country={country}
                                            refreshRegions={refreshRegions}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

RegionRow.propTypes = {
    region: PropTypes.shape({
        name: PropTypes.string.isRequired,
        countries: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                cities: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string.isRequired,
                    })
                ),
            })
        ).isRequired,
    }).isRequired,
};
