import React, {useEffect, useState} from 'react';
import Title from '../Title';
import {Backdrop, CircularProgress, Grid} from "@material-ui/core";
import EventInfoCard from "../EventInfoCard";
import TotalValueCard from "../TotalValueCard";
import {DashboardDataRender} from "../DashboardDataRender";

// Admin Dashboard Page
const ReviewerDashboard = ({ baseUrl, role, userId }) => {
    // Loading state
    const [loading, setLoading] = useState(true);

    // Total value states
    const [myReviews, setMyReviews] = useState(0);
    const [pendingReviews, setPendingReviews] = useState(0);
    const [approvedReviews, setApprovedReviews] = useState(0);
    const [rejectedReviews, setRejectedReviews] = useState(0);

    // Event info state
    const [eventInfo, setEventInfo] = useState({
        title: "",
        location: "",
        date: "",
        time: "",
        remaining: 0
    });

    useEffect(() => {
        userId && DashboardDataRender(baseUrl, role, userId).then(data => {
            // Set event info
            setEventInfo({...data.eventInfo});

            // Set total values
            setMyReviews(data.myReviews);
            setPendingReviews(data.pendingReviews);
            setApprovedReviews(data.approvedReviews);
            setRejectedReviews(data.rejectedReviews);

            setLoading(false);
        });
    }, [userId])

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
                {/* TOTAL VALUE CARDS */}

                <Grid container md={7} xs={12} direction="row" spacing={3} style={{padding: "12px"}}>
                    {/* My Reviews Card */}
                    <Grid item md={6} xs={12}>
                        <TotalValueCard
                            title="My Reviews"
                            value={myReviews}
                            styles="red"
                            path="/reviews/my"
                        />
                    </Grid>

                    {/* Total Pending Reviews Card */}
                    <Grid item md={6} xs={12}>
                        <TotalValueCard
                            title="Pending Reviews"
                            value={pendingReviews}
                            styles="orange"
                            path="/reviews/pending"
                        />
                    </Grid>

                    {/* Total Approved Reviews Card */}
                    <Grid item md={6} xs={12}>
                        <TotalValueCard
                            title="Approved Reviews"
                            value={approvedReviews}
                            styles="blue"
                            path="/reviews/my"
                        />
                    </Grid>

                    {/* Total Rejected Reviews Card */}
                    <Grid item md={6} xs={12}>
                        <TotalValueCard
                            title="Rejected Reviews"
                            value={rejectedReviews}
                            styles="green"
                            path="/reviews/my"
                        />
                    </Grid>
                </Grid>


                {/* GENERAL INFO CARDS */}

                {/* Event Info Card */}
                <Grid item md={5} xs={12}>
                    <EventInfoCard
                        title={eventInfo.title}
                        location={eventInfo.location}
                        date={eventInfo.date}
                        time={eventInfo.time}
                        remaining={eventInfo.remaining}
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

export default ReviewerDashboard;