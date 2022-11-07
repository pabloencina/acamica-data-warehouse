import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";

function CountryRow(props) {
    const { country } = props;
    const [openCity, setOpenCity] = React.useState(false);
    console.log(country);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell scope="row">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenCity(!openCity)}
                    >
                        {openCity ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell scope="row">{country.name}</TableCell>
                <TableCell scope="row">
                    <Tooltip title="Edit">
                        <IconButton>
                            <EditOutlinedIcon fontSize="big" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add city">
                        <IconButton>
                            <AddLocationOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openCity} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell component="th"></TableCell>
                                        <TableCell component="th">Cities</TableCell>
                                        <TableCell component="th">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {country.cities.map((city) => (
                                        <CityRow key={city.name} city={city} />
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

function CityRow(props) {
    const { city } = props;
    console.log(city);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell scope="row"></TableCell>
                <TableCell scope="row">{city.name}</TableCell>
                <TableCell scope="row">
                    <Tooltip title="Edit">
                        <IconButton>
                            <EditOutlinedIcon fontSize="big" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add city">
                        <IconButton>
                            <AddLocationOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function RegionRow(props) {
    const { region } = props;

    console.log(region.countries);
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
                    <Tooltip title="Edit">
                        <IconButton>
                            <EditOutlinedIcon fontSize="big" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add country">
                        <IconButton>
                            <AddLocationOutlinedIcon />
                        </IconButton>
                    </Tooltip>
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

export default function CollapsibleTable({ regions }) {
    return (
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
