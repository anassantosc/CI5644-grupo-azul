import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    Paper,
    Button,
    Typography
} from "@mui/material";
import { useState, useMemo } from "react";
import { StyledTableRow } from "./StyledTableRow";


const pageSize = 20;

export const TableSelector = ({ onSelect, onClick, receive, cards }) => {
    const [page, setPage] = useState(0);
    const startIndex = page * pageSize;
    const visibleOptions = useMemo(() => cards.slice(startIndex, startIndex + pageSize), [cards, page]);

    const handleSelect = (number) => {
        onSelect(number);
        onClick();
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const chunkArray = useMemo(
        () => (arr, chunkSize) => {
            const chunks = [];
            for (let i = 0; i < arr.length; i += chunkSize) {
                chunks.push(arr.slice(i, i + chunkSize));
            }
            return chunks;
        },
        []
    );

    const rows = chunkArray(visibleOptions, 4);

    return (
        <TableContainer component={Paper} style={{ backgroundColor: '#581E3D' }} >
            <Typography variant="h6" gutterBottom style={{ margin: '10px', textAlign: 'center', color: 'white' }}>
                {receive ? 'Elija la carta a recibir' : 'Elija la carta a ofrecer'}
            </Typography>
            <Table>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <StyledTableRow key={rowIndex}>
                            {row.map((card, index) => (
                                <TableCell key={index}>
                                    <Button onClick={() => handleSelect(card)} style={{ color: 'white' }}>
                                        Carta {card}
                                    </Button>
                                </TableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <StyledTableRow>
                        <TablePagination
                            count={-1}
                            page={page}
                            rowsPerPage={pageSize}
                            rowsPerPageOptions={[20]}
                            onPageChange={handleChangePage}
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to}`}
                            nextIconButtonProps={{
                                disabled: visibleOptions.length < pageSize,
                            }}
                            style={{ color: '#ffffff' }}
                        />
                    </StyledTableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};