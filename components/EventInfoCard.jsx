import React, {useState} from "react";
import {Card, Container, makeStyles, Typography} from "@material-ui/core";
import "./EventInfoCard.css"
import EventInfoText from "./EventInfoText";

// Styles for Material UI components
const useStyles = makeStyles({
    title: {
        fontSize: "1.6em",
        color: "white",
        fontWeight: "bold",
        width: "100%",
        paddingBlockStart: "8px",
    },
    days: {
        fontWeight: "bold",
        marginBlockStart: "-12px"
    },
    toGo: {
        fontSize: "1.5em",
        alignItems: "center",
        fontWeight: "500",
        marginBlockStart: "-8px"
    },
    infoText: {
        marginBlockStart: "12px",
        marginBlockEnd: "8px"
    },
    container: {
        padding: 0
    }
});

const EventInfoCard = () => {
    const styles = useStyles();

    // States
    const [eventTitle, setEventTitle] = useState("");
    const [remainingDays, setRemainingDays] = useState(0);
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");

    return (
        <Card variant="outlined" style={{height: "100%"}}>
            <Container className={styles.container}>
                <Typography
                    variant="h1"
                    align="center"
                    classes={{h1: styles.title}}
                    className="eventTitle"
                >
                    {eventTitle}
                </Typography>
                <div className="background">
                </div>
            </Container>
            <Container className={styles.container}>
                <Typography
                    variant="h2"
                    align="center"
                    classes={{h2: styles.days}}
                >
                    {remainingDays}
                </Typography>
                <Typography
                    variant="h2"
                    align="center"
                    color="textSecondary"
                    classes={{h2: styles.toGo}}
                >
                    days to go
                </Typography>
            </Container>
            <Container className={`${styles.container} ${styles.infoText}`}>
                <EventInfoText label="Conference Date" data={date} />
                <EventInfoText label="Location" data={location} />
                <EventInfoText label="Time" data={time} />
            </Container>
        </Card>
    )
}

export default EventInfoCard;