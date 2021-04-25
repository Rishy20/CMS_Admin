import React from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    all: {
        paddingBlock: "2px",
        paddingInline: "16px",
        fontWeight: "bold"
    }
})

const EventInfoText = props => {
    const styles = useStyles();

    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Typography
                        align="left"
                        className={styles.all}
                    >
                        {props.label}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        align="right"
                        color="textSecondary"
                        className={styles.all}
                    >
                        {props.data}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default EventInfoText