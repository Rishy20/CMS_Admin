import React, {useState} from 'react';
import Title from '../Title';
import {Grid} from "@material-ui/core";
import RegistrationInfoCard from "../RegistrationInfoCard"

//Admin Dashboard Page
const Dashboard = () => {
    return (
        <>
            <div>
                <Title text="Dashboard"/>
            </div>

            <Grid container>
                <Grid item md={8}>
                    <RegistrationInfoCard />
                </Grid>
                <Grid item md={4}>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard;