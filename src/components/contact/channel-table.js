import { IconButton, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getChannelOption, getPreferenceOption } from "./constants";

export default function ChannelTable(props) {
    const { channels, deleteChannel } = props;

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
                                <TableCell align="center">
                                    {getChannelOption(channel.channel).label}
                                </TableCell>
                                <TableCell align="center">{channel.account}</TableCell>
                                <TableCell align="center">
                                    {getPreferenceOption(channel.preference).label}
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Delete Channel">
                                        <IconButton
                                            onClick={() => {
                                                deleteChannel(channel._id);
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
