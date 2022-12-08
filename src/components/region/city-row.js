import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Stack } from "@mui/system";
import * as React from "react";
import DeleteCityDialog from "./delete-region-country-city/delete-city-dialog";
import EditCityDialog from "./edit-region-country-city/edit-city-dialog";

export default function CityRow(props) {
    const { city, refreshRegions } = props;

    return (
        <React.Fragment>
            <TableRow>
                <TableCell scope="row"></TableCell>
                <TableCell scope="row">{city.name}</TableCell>
                <TableCell scope="row">
                    <Stack direction="row" spacing={2}>
                        <EditCityDialog refreshRegions={refreshRegions} />
                        <DeleteCityDialog city={city} />
                    </Stack>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
