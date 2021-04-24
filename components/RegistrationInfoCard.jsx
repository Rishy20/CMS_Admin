import React, {useState} from "react";
import {Card, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import {ArgumentAxis, Chart, ValueAxis, SplineSeries
} from "@devexpress/dx-react-chart-material-ui";

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

const RegistrationInfoCard = () => {
    const styles = useStyles();

    // States
    const [chartData, setChartData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalRegistrations, setTotalRegistrations] = useState(0);

    return (
    <Card variant="outlined" style={{padding: "16px", height: "100%"}}>
        <Grid container alignItems="center" justify="center">
            <Grid item md="5">

                {/* Total Revenue */}
                <Container className={styles.container}>
                    <Typography
                        variant="h6"
                        align="center"
                        classes={{h6: styles.value}}
                    >
                        Rs. {totalRevenue}
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
                        {totalRegistrations}
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
            <Grid item md="7" justify="center">
                <Chart
                    data={chartData}
                    height={220}
                >
                    <ArgumentAxis />
                    <ValueAxis />
                    <SplineSeries
                        valueField="registrations"
                        argumentField="day"
                    />
                </Chart>
            </Grid>
        </Grid>
    </Card>
)
}

export default RegistrationInfoCard;