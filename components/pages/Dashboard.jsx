import React, {useEffect, useState} from 'react';
import Title from '../Title';
import {Backdrop, CircularProgress, Grid} from "@material-ui/core";
import RegistrationInfoCard from "../RegistrationInfoCard"
import EventInfoCard from "../EventInfoCard";
import TotalValueCard from "../TotalValueCard";
import OverviewCard from "../OverviewCard";
import {DashboardDataRender} from "../DashboardDataRender";

//Admin Dashboard Page
const Dashboard = ({baseUrl}) => {
    // Loading state
    const [loading, setLoading] = useState(true);

    // Total value states
    const [pendingEdits, setPendingEdits] = useState(0);
    const [totalAttendees, setTotalAttendees] = useState(0);
    const [totalPresenters, setTotalPresenters] = useState(0);
    const [totalResearchers, setTotalResearchers] = useState(0);

    // Registration info state
    const [registrationInfo, setRegistrationInfo] = useState({
        totalRevenue: 0,
        totalRegistrations: 0,
        chartData: []
    })

    // Event info state
    const [eventInfo, setEventInfo] = useState({
        title: "",
        location: "",
        date: "",
        time: "",
        remaining: 0
    });

    // Overview card states
    const [submissionInfo, setSubmissionInfo] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
        chartData: []
    });
    const [reviewersInfo, setReviewersInfo] = useState({
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

    useEffect(() => {
        DashboardDataRender(baseUrl).then(data => {
            // Set registration info
            setRegistrationInfo({...data.registrationInfo});

            // Set event info
            setEventInfo({...data.eventInfo});

            // Set total values
            setPendingEdits(data.pendingEdits);
            setTotalAttendees(data.totalAttendees);
            setTotalPresenters(data.totalPresenters);
            setTotalResearchers(data.totalResearchers);

            // Set submissions info
            setSubmissionInfo(data.submissionsInfo);
            // Set reviewer info
            setReviewersInfo(data.reviewersInfo);
            // Set research proposals info
            setResearchPropInfo(data.researchPropInfo);
            // Set workshop proposals info
            setWorkshopPropInfo(data.workshopPropInfo);

            setLoading(false);
        });
    }, [])

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
                    <RegistrationInfoCard
                        totalRevenue={registrationInfo.totalRevenue}
                        totalRegistrations={registrationInfo.totalRegistrations}
                        chartData={registrationInfo.chartData}
                    />
                </Grid>

                {/* Event Info Card */}
                <Grid item md={4}>
                    <EventInfoCard
                        title={eventInfo.title}
                        location={eventInfo.location}
                        date={eventInfo.date}
                        time={eventInfo.time}
                        remaining={eventInfo.remaining}
                    />
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
                        path="/presenters"
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
                        data={submissionInfo}
                    />
                </Grid>
                <Grid item xs={6}>
                    <OverviewCard
                        title="Reviewers Overview"
                        data={reviewersInfo}
                    />
                </Grid>
                <Grid item xs={6}>
                    <OverviewCard
                        title="Research Proposals Overview"
                        data={researchPropInfo}
                    />
                </Grid>
                <Grid item xs={6}>
                    <OverviewCard
                        title="Workshop Proposals Overview"
                        data={workshopPropInfo}
                    />
                </Grid>
            </Grid>

            {/* Loading backdrop */}
            <Backdrop open={loading} style={{zIndex: 99}}>
                <CircularProgress style={{color: "#E2BC7F"}} />
            </Backdrop>
        </>
    )
}

export default Dashboard;