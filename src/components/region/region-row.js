import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import * as React from "react";
import CreateCountryDialog from "src/components/region/create-region-country-city/create-country-dialog";
import CountryRow from "./country-row";
import DeleteRegionDialog from "./delete-region-country-city/delete-region-dialog";
import EditRegionDialog from "./edit-region-country-city/edit-region-dialog";

export default function RegionRow(props) {
    const { region, refreshRegions } = props;

    const [openCountry, setOpenCountry] = React.useState(false);

    const onRegionDeleted = () => {
        refreshRegions();
    };

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
                    <Stack direction="row" spacing={2}>
                        <CreateCountryDialog
                            regionId={region._id}
                            refreshRegions={refreshRegions}
                        />
                        <EditRegionDialog refreshRegions={refreshRegions} />
                        <DeleteRegionDialog region={region} onRegionDeleted={onRegionDeleted} />
                    </Stack>
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
