import React, {useEffect, useState} from 'react';
import Title from '../Title';
import {Backdrop, CircularProgress, Grid} from "@material-ui/core";
import EventInfoCard from "../EventInfoCard";
import {DashboardDataRender} from "../DashboardDataRender";

// Editor Dashboard Page
const EditorDashboard = ({ baseUrl, role }) => {
    // Loading state
    const [loading, setLoading] = useState(true);

    // Event info state
    const [eventInfo, setEventInfo] = useState({
        title: "",
        location: "",
        date: "",
        time: "",
        remaining: 0
    });

    useEffect(() => {
        DashboardDataRender(baseUrl, role).then(data => {
            // Set event info
            setEventInfo({...data.eventInfo});
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
                justify="center"
            >
                {/* GENERAL INFO CARDS */}

                {/* Event Info Card */}
                <Grid item md={6} xs={12}>
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

export default EditorDashboard;