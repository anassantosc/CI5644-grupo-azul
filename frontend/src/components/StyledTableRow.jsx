
import {
    styled,
    TableRow
} from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '& > *': {
        borderBottom: 'unset',
        height: '50px',
        padding: "0px",
        textAlign: 'center'
    },
}));
