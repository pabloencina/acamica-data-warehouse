import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
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
import CountryRow from "./countryRow";
import CreateCountryDialog from "src/pages/create-country-dialog";

export default function RegionRow(props) {
    const { region } = props;

    console.log(region);
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
                    <Tooltip title="Edit Region">
                        <IconButton>
                            <EditOutlinedIcon fontSize="big" />
                        </IconButton>
                    </Tooltip>
                    <CreateCountryDialog />
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
                                        <CountryRow key={country.name} country={country} />
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
