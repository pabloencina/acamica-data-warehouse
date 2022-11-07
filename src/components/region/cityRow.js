import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";

export default function CityRow(props) {
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
