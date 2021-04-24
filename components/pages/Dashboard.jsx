import React, {useState} from 'react';
import Title from '../Title';
import {Grid} from "@material-ui/core";
import RegistrationInfoCard from "../RegistrationInfoCard"

//Admin Dashboard Page
const Dashboard = () => {
    const [totalRevenue, setTotalRevenue] = useState(100000);
    const [totalRegistrations, setTotalRegistrations] = useState(100);

    return (
        <>
            <div>
                <Title text="Dashboard"/>
            </div>

            <Grid container>
                <Grid item md={8}>
                    <RegistrationInfoCard
                        totalRevenue={totalRevenue}
                        totalRegistrations={totalRegistrations}
                    />
                </Grid>
                <Grid item md={4}>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard;