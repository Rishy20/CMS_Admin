import React from 'react';
import Title from '../Title';
import {Grid} from "@material-ui/core";
import RegistrationInfoCard from "../RegistrationInfoCard"
import EventInfoCard from "../EventInfoCard";

//Admin Dashboard Page
const Dashboard = () => {
    return (
        <>
            <div>
                <Title text="Dashboard"/>
            </div>

            <Grid
                container
                spacing={2}
                xs={12}
                style={{paddingInlineEnd: "8px"}}
            >
                <Grid item md={8}>
                    <RegistrationInfoCard />
                </Grid>
                <Grid item md={4}>
                    <EventInfoCard />
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard;