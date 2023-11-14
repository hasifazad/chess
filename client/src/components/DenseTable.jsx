import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function DenseTable({ data }) {
    console.log(data);
    return (
        <TableContainer sx={{ height: 390 }} >
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Piece</TableCell>
                        <TableCell align="center">From</TableCell>
                        <TableCell align="center">To</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            hover
                            key={index}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell align="center">{row.piece.toUpperCase()}</TableCell>
                            <TableCell align="center">{row.from}</TableCell>
                            <TableCell align="center">{row.to}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}