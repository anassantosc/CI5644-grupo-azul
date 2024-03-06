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
import styles from './../../styles/TableSelector.module.css';

const pageSize = 20;

export const TableSelector = ({ onSelect, onClick, receive, offer = null }) => {
    const [page, setPage] = useState(0);
    const [cards, setCards] = useState([]);

    const handleSelect = (number) => {
        onSelect(number);
        onClick();
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        if (receive) {
            const Data = {
                page: page,
                username: offer?.username
            };
            setCards(GetWishlist(Data))
        } else {
            setCards(GetDuplicatedCards(Data))
        }
    }, [page, receive]);

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

    const rows = chunkArray(cards, 4);

    return (
        <TableContainer component={Paper} className={styles.tableContainer} >
            <Typography className={styles.title} variant="h6" gutterBottom >
                {receive ? 'Elija la carta a recibir' : 'Elija la carta a ofrecer'}
            </Typography>
            <Table>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <StyledTableRow key={rowIndex}>
                            {row.map((card, index) => (
                                <TableCell key={index}>
                                    <Button onClick={() => handleSelect(card)} className={styles.cardButton} >
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
                            className={styles.pagination}
                        />
                    </StyledTableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};