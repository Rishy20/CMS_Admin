import React, {useState} from 'react';
import Title from '../Title';
import {Grid} from "@material-ui/core";
import RegistrationInfoCard from "../RegistrationInfoCard"
import EventInfoCard from "../EventInfoCard";
import TotalValueCard from "../TotalValueCard";

//Admin Dashboard Page
const Dashboard = () => {
    // States
    const [pendingEdits, setPendingEdits] = useState(0);
    const [totalAttendees, setTotalAttendees] = useState(0);
    const [totalPresenters, setTotalPresenters] = useState(0);
    const [totalResearchers, setTotalResearchers] = useState(0);

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
                <Grid item md={3}>
                    <TotalValueCard
                        title="Pending Edit Approvals"
                        value={pendingEdits}
                        styles="pendingEdits"
                        path="/edits"
                    />
                </Grid>
                <Grid item md={3}>
                    <TotalValueCard
                        title="Total Attendees"
                        value={totalAttendees}
                        styles="totalAttendees"
                        path="/registrations"
                    />
                </Grid>
                <Grid item md={3}>
                    <TotalValueCard
                        title="Total Presenters"
                        value={totalPresenters}
                        styles="totalPresenters"
                        path="/registrations"
                    />
                </Grid>
                <Grid item md={3}>
                    <TotalValueCard
                        title="Total Researchers"
                        value={totalResearchers}
                        styles="totalResearchers"
                        path="/registrations"
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard;