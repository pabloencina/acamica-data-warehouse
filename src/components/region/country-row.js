import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import CityRow from "./city-row";
import CreateCountryDialog from "src/components/region/create-region-country-city/create-city-dialog";
import CreateCityDialog from "src/components/region/create-region-country-city/create-city-dialog";
import EditCountryDialog from "./edit-region-country-city/edit-country-dialog";

export default function CountryRow(props) {
    const { country, refreshRegions } = props;
    const [openCity, setOpenCity] = React.useState(false);

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
                    <EditCountryDialog refreshRegions={refreshRegions} />
                    <CreateCityDialog refreshRegions={refreshRegions} countryId={country._id} />
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
