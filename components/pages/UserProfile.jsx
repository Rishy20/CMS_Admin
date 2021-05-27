import React, {useState} from "react";
import Title from "../Title";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Grid,
    makeStyles, Tab, Tabs,
    Typography
} from "@material-ui/core";
import TabPanel from "../TabPanel";
import PersonalInfo from "../PersonalInfo";

const useStyles = makeStyles({
    cardContainer: {
        padding: "16px",
        height: "100%",
        border: "0px",
        borderRadius: "16px"
    },
    profilePicLeft: {
        width: "2em",
        height: "2em",
        fontSize: "3em"
    },
    infoLabel: {
        fontWeight: "500",
        marginBlockEnd: "4px"
    },
    tabSelected: {
        color: "#E2BC7F",
    },
    tabIndicator: {
        backgroundColor: "#E2BC7F",
        width: "4px"
    }
})

const UserProfile = ({baseUrl, user, setUser, ...props}) => {
    const styles = useStyles();

    // Tab state
    const [tab, setTab] = useState(0);

    // Handle changing tab
    const changeTab = (event, tab) => setTab(tab);

    return (
        <>
            <div>
                <Title text="User Profile"/>
            </div>

            <Grid
                container
                spacing={3}
                xs={12}
            >

                {/* Info Section (left) */}
                <Grid item md={5}>
                    <Card
                        variant="outlined"
                        className={styles.cardContainer}
                    >

                        {/* Profile Picture, Name and Role */}
                        <CardHeader
                            avatar={
                                <Avatar
                                    src={props.avatarSrc}
                                    className={styles.profilePicLeft}
                                >
                                    {props.avatarTxt}
                                </Avatar>
                            }

                            title={`${user.fname} ${user.lname}`}
                            titleTypographyProps={{
                                variant: "h5",
                            }}

                            subheader={user.role}
                            subheaderTypographyProps={{
                                variant: "subtitle2",
                                style: {textTransform: "capitalize"}
                            }}
                        />

                        <CardContent>
                            {/* Email and Phone Number */}
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="body1"
                                        classes={{body1: styles.infoLabel}}
                                    >
                                        Email
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography
                                        color="textSecondary"
                                        align="right"
                                    >
                                        {user.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="body1"
                                        classes={{body1: styles.infoLabel}}
                                    >
                                        Phone
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography
                                        color="textSecondary"
                                        align="right"
                                    >
                                        {user.contact}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Tabs */}
                            <Tabs
                                value={tab}
                                onChange={changeTab}
                                orientation="vertical"
                                classes={{indicator: styles.tabIndicator}}
                                style={{marginBlockStart: "24px", marginInline: "24px"}}
                            >
                                <Tab
                                    label="Personal Information"
                                    classes={{selected: styles.tabSelected}}
                                    disableRipple
                                />
                                <Tab
                                    label="Account Information"
                                    classes={{selected: styles.tabSelected}}
                                    disableRipple
                                />
                                <Tab
                                    label="Change Password"
                                    classes={{selected: styles.tabSelected}}
                                    disableRipple
                                />
                            </Tabs>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item md={7}>
                    <Card
                        variant="outlined"
                        className={styles.cardContainer}
                    >
                        {/* Tab Switches */}
                        <TabPanel value={tab} index={0}>
                            <PersonalInfo
                                user={user}
                                setUser={setUser}
                                baseUrl={baseUrl}
                                avatarSrc={props.avatarSrc}
                                avatarTxt={props.avatarTxt}
                            />
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            Account Information
                        </TabPanel>
                        <TabPanel value={tab} index={2}>
                            Change Password
                        </TabPanel>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default UserProfile;