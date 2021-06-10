import React from "react";
import {Card, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import {ArgumentAxis, Chart, ValueAxis, SplineSeries} from "@devexpress/dx-react-chart-material-ui";
import {Animation} from "@devexpress/dx-react-chart";

// Styles for Material UI components
const useStyles = makeStyles({
    value: {
        fontSize: "1.6em",
    },
    title: {
        fontSize: "1.3em",
        marginTop: "-8px"
    },
    container: {
        marginBlock: "20px"
    }
})

const RegistrationInfoCard = props => {
    const styles = useStyles();

    return (
    <Card variant="outlined" style={{padding: "16px", height: "100%"}}>
        <Grid container alignItems="center" justify="center">
            <Grid item md={5}>

                {/* Total Revenue */}
                <Container className={styles.container}>
                    <Typography
                        variant="h6"
                        align="center"
                        classes={{h6: styles.value}}
                    >
                        Rs. {props.totalRevenue}
                    </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            color="textSecondary"
                            classes={{h6: styles.title}}
                        >
                            Total Revenue
                        </Typography>
                </Container>

                {/* Total Registrations */}
                <Container className={styles.container}>
                    <Typography
                        variant="h6"
                        align="center"
                        classes={{h6: styles.value}}
                    >
                        {props.totalRegistrations}
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        color="textSecondary"
                        classes={{h6: styles.title}}
                    >
                        Total Registrations
                    </Typography>
                </Container>
            </Grid>

            {/* Registrations Chart */}
            <Grid item md={7}>
                <Chart
                    data={props.chartData}
                    height={220}
                >
                    <ArgumentAxis />
                    <ValueAxis />

                    <SplineSeries
                        valueField="value"
                        argumentField="day"
                    />

                    <Animation />
                </Chart>
            </Grid>
        </Grid>
    </Card>
)
}

export default RegistrationInfoCard;