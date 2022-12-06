import { IconButton, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function TableAddChannels(props) {
    const { channels } = props;
    console.log(channels);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Channel</TableCell>
                        <TableCell align="center">Account</TableCell>
                        <TableCell align="center">Preference</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {channels.map((channel) => {
                        return (
                            <TableRow>
                                <TableCell align="center">{channel.channel}</TableCell>
                                <TableCell align="center">{channel.account}</TableCell>
                                <TableCell align="center">{channel.preference}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Delete Channel">
                                        <IconButton
                                            onClick={() => {
                                                handleClickOpen();
                                            }}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
