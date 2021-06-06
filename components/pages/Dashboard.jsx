import React, {useState} from 'react';
import Title from '../Title';
import {Grid} from "@material-ui/core";
import RegistrationInfoCard from "../RegistrationInfoCard"
import EventInfoCard from "../EventInfoCard";
import TotalValueCard from "../TotalValueCard";
import OverviewCard from "../OverviewCard";

//Admin Dashboard Page
const Dashboard = () => {
    // States
    const [pendingEdits, setPendingEdits] = useState(0);
    const [totalAttendees, setTotalAttendees] = useState(0);
    const [totalPresenters, setTotalPresenters] = useState(0);
    const [totalResearchers, setTotalResearchers] = useState(0);

    // Overview card states
    const [submissionInfo, setSubmissionInfo] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
        chartData: []
    });
    const [reviewersInfo, setReviewerInfo] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
        chartData: []
    });
    const [researchPropInfo, setResearchPropInfo] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
        chartData: []
    });
    const [workshopPropInfo, setWorkshopPropInfo] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
        chartData: []
    });

    return (
        <>
            <div>
                <Title text="Dashboard"/>
            </div>

            <Grid
                container
                spacing={3}
                xs={12}
            >

                {/* Registration Info Card */}
                <Grid item md={8}>
                    <RegistrationInfoCard />
                </Grid>

                {/* Event Info Card */}
                <Grid item md={4}>
                    <EventInfoCard />
                </Grid>

                {/* Total Pending Edits/Attendees etc. Cards */}
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
                        path="/attendees"
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
                        path="/researchers"
                    />
                </Grid>

                {/* Overview Cards */}
                <Grid item xs={6}>
                    <OverviewCard
                        title="Submissions Overview"
                        submissions={submissionInfo}
                    />
                </Grid>
                <Grid item xs={6}>
                    <OverviewCard
                        title="Reviewers Overview"
                        submissions={reviewersInfo}
                    />
                </Grid>
                <Grid item xs={6}>
                    <OverviewCard
                        title="Research Proposals Overview"
                        submissions={researchPropInfo}
                    />
                </Grid>
                <Grid item xs={6}>
                    <OverviewCard
                        title="Workshop Proposals Overview"
                        submissions={workshopPropInfo}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard;