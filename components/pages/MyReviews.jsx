import React, {useState} from "react";
import {makeStyles, Tab, Tabs} from "@material-ui/core";
import TabPanel from "../TabPanel";
import PaperReviews from "./PaperReviews";
import WorkshopReviews from "./WorkshopReviews";

const useStyles = makeStyles({

    tabSelected: {
        color: "var(--blue)",
    },
    tabIndicator: {
        backgroundColor: "#E2BC7F",
        width: "4px"
    },

})
const classes={
    styleTab:{
        backgroundColor:"white",
        padding:"20px 25px",

    },
    tabLabel:{
        fontWeight:600,
        fontSize:17
    }
}
export default function MyReviews({baseUrl,userId}){

    const styles = useStyles();
    // API URL
    const url = `${baseUrl}/researchers`;
    // Tab state
    const [tab, setTab] = useState(0);

    // Handle changing tab
    const changeTab = (event, tab) => setTab(tab);
    return (
        <div>
            {/* Tabs */}
            <Tabs
                value={tab}
                onChange={changeTab}
                orientation="Horizontal"
                classes={{indicator: styles.tabIndicator}}
                style={{marginRight:30}}
                centered
                fullWidth={false}
            >
                <Tab
                    label= {<span style={classes.tabLabel}>Approved Papers</span>}
                    classes={{selected: styles.tabSelected}}
                    style={classes.styleTab}
                    disableRipple
                />
                <Tab
                    label= {<span style={classes.tabLabel}>Approved Workshops</span>}
                    classes={{selected: styles.tabSelected}}
                    style={classes.styleTab}
                    disableRipple
                />
                <Tab
                    label= {<span style={classes.tabLabel}>Rejected Papers</span>}
                    classes={{selected: styles.tabSelected}}
                    style={classes.styleTab}
                    disableRipple
                />
                <Tab
                    label= {<span style={classes.tabLabel}>Rejected Workshops</span>}
                    classes={{selected: styles.tabSelected}}
                    style={classes.styleTab}
                    disableRipple
                />
            </Tabs>
            <TabPanel value={tab} index={0}>
                <PaperReviews baseUrl={baseUrl} userId={userId} status={"Approved"}/>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <WorkshopReviews baseUrl={baseUrl} userId={userId} status={"Approved"}/>
            </TabPanel>
            <TabPanel value={tab} index={2}>
                <PaperReviews baseUrl={baseUrl} userId={userId} status={"Rejected"}/>
            </TabPanel>
            <TabPanel value={tab} index={3}>
                <WorkshopReviews baseUrl={baseUrl} userId={userId} status={"Rejected"}/>
            </TabPanel>

        </div>

    )
}