import React from "react";
import {Card, Container, makeStyles, Typography} from "@material-ui/core";
import "./styles/EventInfoCard.css"
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

const EventInfoCard = props => {
    const styles = useStyles();

    return (
        <Card variant="outlined" style={{height: "100%"}}>
            <Container className={styles.container}>
                <Typography
                    variant="h1"
                    align="center"
                    classes={{h1: styles.title}}
                    className="eventTitle"
                >
                    {props.title}
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
                    {props.remaining}
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
                <EventInfoText label="Location" data={props.location} />
                <EventInfoText label="Date" data={props.date} />
                <EventInfoText label="Time" data={props.time} />
            </Container>
        </Card>
    )
}

export default EventInfoCard;