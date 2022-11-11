import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function CityRow(props) {
    const { city } = props;

    return (
        <React.Fragment>
            <TableRow>
                <TableCell scope="row"></TableCell>
                <TableCell scope="row">{city.name}</TableCell>
                <TableCell scope="row">
                    <Tooltip title="Edit City">
                        <IconButton>
                            <EditOutlinedIcon fontSize="big" />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
