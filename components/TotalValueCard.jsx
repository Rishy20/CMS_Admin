import React from "react";
import {Link} from "react-router-dom";
import {Card, makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import "./TotalValueCard.css"

const useStyles = makeStyles({
    title: {
        fontSize: "1.2em",
        fontWeight: "bold",
        color: "white"
    },
    value: {
        fontSize: "3.5em",
        color: "white"
    }
});

const TotalValueCard = props => {
    const styles = useStyles();

    return (
        <Card
            variant="outlined"
            style={{height: "100%"}}
        >
            <Grid
                container
                component={Link}
                to={props.path}
                alignItems="center"
                className={`container ${props.styles}`}
                style={{textDecoration: "none"}}
            >
                <Grid item xs={7}>
                    <Typography
                        variant="h6"
                        classes={{h6: styles.title}}
                    >
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography
                        variant="h2"
                        align="right"
                        classes={{h2: styles.value}}
                    >
                        {props.value}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

export default TotalValueCard;