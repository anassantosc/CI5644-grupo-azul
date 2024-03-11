import * as React from "react";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent, 
    TimelineOppositeContent,
    TimelineDot } from "@mui/lab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export default function TopMundial({ firstPlace, secondPlace, thirdPlace }) {
    return (
        <Timeline
            position="alternate"
            sx={{
                width: "100%",
            }}
        >
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                    Primer Lugar
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <AccountCircleIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                        {firstPlace.first}
                    </Typography>
                    <Typography>
                        Progreso: {firstPlace.second.toFixed(2)} %
                    </Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    variant="body2"
                    color="text.secondary"
                >
                    Segundo Lugar
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                        <AccountCircleIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                        {secondPlace.first}
                    </Typography>
                    <Typography>
                        Progreso: {secondPlace.second.toFixed(2)} %{" "}
                    </Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    variant="body2"
                    color="text.secondary"
                >
                    Tercer Lugar
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="outlined">
                        <AccountCircleIcon />
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                        {thirdPlace.first}
                    </Typography>
                    <Typography>
                        Progreso: {thirdPlace.second.toFixed(2)} %
                    </Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}

TopMundial.propTypes = {
    firstPlace: PropTypes.object,
    secondPlace: PropTypes.object,
    thirdPlace: PropTypes.object,
};
