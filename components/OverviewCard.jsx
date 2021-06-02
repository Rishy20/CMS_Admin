import React from "react";
import {Card, CardContent, CardHeader, makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ArgumentAxis, Chart, BarSeries, ValueAxis} from "@devexpress/dx-react-chart-material-ui";
import {Animation} from "@devexpress/dx-react-chart";
import "./styles/OverviewCard.css"

const useStyles = makeStyles({
    cardTitle: {
        fontSize: "1.3em",
    },
    total: {
        fontSize: "3.5em",
        fontWeight: "bold",
    },
    submitted: {
        fontSize: "1em",
        color: "darkgrey",
        marginBlockStart: "-8px"
    },
    subValues: {
        fontSize: "1.5em",
        fontWeight: "bold",
        marginBlockStart: "2px"
    },
    subLabels: {
        fontSize: "0.8em",
        color: "darkgrey",
        marginBlockStart: "-4px",
        marginBlockEnd: "2px"
    }
})

const OverviewCard = props => {
    const styles = useStyles();

    return (
        <Card variant="outlined" style={{height: "100%"}}>

            {/* Overview Title */}
            <CardHeader
                title={props.title}
                titleTypographyProps={{
                    color: "textSecondary",
                    className: styles.cardTitle
                }}
            />
            <hr className="underline" />

            <CardContent>
                {/* Total Value */}
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <Typography
                            variant="h3"
                            align="center"
                            color="textSecondary"
                            classes={{h3: styles.total}}
                        >
                            {props.submissions.total}
                        </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            classes={{h6: styles.submitted}}
                        >
                            Submitted
                        </Typography>
                    </Grid>

                    {/* Chart */}
                    <Grid item xs={8}>
                        <Chart
                            data={props.submissions.chartData}
                            height={180}
                        >
                            <ArgumentAxis />
                            <ValueAxis />

                            <BarSeries
                                valueField="value"
                                argumentField="day"
                            />

                            <Animation />
                        </Chart>
                    </Grid>

                    {/* Pending, Approved and Rejected numbers */}
                    <Grid item xs={12}>
                        <Grid
                            container
                            style={{paddingInline: "8px", marginBlockStart: "8px"}}
                        >
                            <Grid item xs={4}>
                                <Card raised square>
                                    <Typography
                                        variant="h3"
                                        align="center"
                                        color="textSecondary"
                                        classes={{h3: styles.subValues}}
                                    >
                                        {props.submissions.pending}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        classes={{h6: styles.subLabels}}
                                    >
                                        Pending
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card raised square>
                                    <Typography
                                        variant="h3"
                                        align="center"
                                        color="textSecondary"
                                        classes={{h3: styles.subValues}}
                                    >
                                        {props.submissions.accepted}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        classes={{h6: styles.subLabels}}
                                    >
                                        Accepted
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card raised square>
                                    <Typography
                                        variant="h3"
                                        align="center"
                                        color="textSecondary"
                                        classes={{h3: styles.subValues}}
                                    >
                                        {props.submissions.rejected}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        classes={{h6: styles.subLabels}}
                                    >
                                        Rejected
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default OverviewCard;