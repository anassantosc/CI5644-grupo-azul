import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    Paper,
    Button,
    Typography,
    Box
} from "@mui/material";
import {useEffect, useState, useMemo} from "react";
import {StyledTableRow} from "./StyledTableRow";
import styles from './../../styles/TableSelector.module.css';
import {GetWishlist} from "../utils/fetchs/GetWishlist";
import {GetDuplicatedCards} from "../utils/fetchs/GetDuplicatedCards";
import CircularProgress from '@mui/material/CircularProgress';


const pageSize = 20;

export const TableSelector = ({onSelect, onClick, receive, offer = null}) => {
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleSelect = (number) => {
        onSelect(number);
        onClick();
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let temp;
                if (receive) {
                    const data = {
                        page,
                        id: offer?.id
                    };
                    temp = await GetWishlist(data);
                } else {
                    temp = await GetDuplicatedCards(page);
                }
                setRows(chunkArray(temp, 4));
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();
    }, [page, receive, offer]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };

    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Typography className={styles.title} variant="h6" gutterBottom>
                {receive ? 'Elija la carta a recibir' : 'Elija la carta a ofrecer'}
            </Typography>

            {isLoading && (
                <Box className={styles.loadingContainer}>
                    <CircularProgress/>
                    <Typography variant="body1" className={styles.loadingText}>Cargando...</Typography>
                </Box>
            )}

            {!isLoading && rows.length === 0 && page === 0 && (
                <Typography variant="h4" className={styles.statusMessage}>
                    {receive ?
                        (offer ? "No hay ninguna carta que le falte y que el usuario a contraofertar tenga duplicada" : "FELICIDADES ya completaste el álbum, no te falta ninguna carta")
                        :
                        "No tiene ninguna carta duplicada"
                    }
                </Typography>
            )}

            {!isLoading && (rows.length > 0 || page > 0) && (
                <Table>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <StyledTableRow key={rowIndex}>
                                {row.map((card, index) => (
                                    <TableCell key={index} sx={{
                                        border: 'none'
                                    }}>
                                        <Button onClick={() => handleSelect(card)} className={styles.cardButton}>
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
                                labelDisplayedRows={({from, to, count}) => `${from}-${to}`}
                                nextIconButtonProps={{
                                    disabled: rows.length < 5 || rows[4].length < 4 || page * pageSize + pageSize >= 640,
                                }}
                                className={styles.pagination}
                            />
                        </StyledTableRow>
                    </TableFooter>
                </Table>
            )}
        </TableContainer>
    );
};
