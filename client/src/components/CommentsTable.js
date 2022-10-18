import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import * as React from "react";

const CommentsTable = (props) => {
    return <TableContainer
        style={{
            height: '50vh'
        }}
        component={Paper}
    >
        <Table
            sx={{minWidth: 650}}
            aria-label="simple table"
        >
            <TableHead>
                <TableRow>
                    <TableCell>Текст комментария</TableCell>
                    <TableCell align="right">Процент токсичности</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.serverComments.map(props.callbackfn)}
            </TableBody>
        </Table>
    </TableContainer>;
}

export default CommentsTable
