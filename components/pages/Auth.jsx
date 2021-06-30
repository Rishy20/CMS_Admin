import React, {useState} from "react";
import {Card, Grid, makeStyles, Tab, Tabs} from "@material-ui/core";
import TabPanel from "../TabPanel";
import Login from "../Login";
import Register from "../Register";
import FeedbackMsg from "../FeedbackMsg";
import "../styles/Auth.css";

const useStyles = makeStyles({
    cardContainer: {
        padding: "0 24px 24px 24px",
        borderRadius: "16px",
        marginInline: "104px 24px",
        background: "rgb(255,255,255,0.85)"
    },
    tabIndicator: {
        backgroundColor: "#E2BC7F",
    }
})

const Auth = props => {
    const styles = useStyles();

    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");

    // Selected tab state
    const [tab, setTab] = useState(0);

    // Handle changing Login/Register tabs
    const changeTab = (event, tab) => setTab(tab);

    // Callback method to be executed after registration is completed
    const registerCallback = () => {
        setTab(0);
    }

    return (
        <Grid
            container
            alignItems="center"
            justify="flex-end"
            className="authGrid"
        >
            <Grid item md={5} xs={12}>
                <Card className={styles.cardContainer}>
                    {/* Tabs */}
                    <Tabs
                        centered
                        value={tab}
                        onChange={changeTab}
                        classes={{indicator: styles.tabIndicator}}
                    >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {/* Content */}
                    <TabPanel value={tab} index={0}>
                        <Login
                            baseUrl={props.baseUrl}
                            loginCallback={props.loginCallback}
                            setSubmitError={setSubmitError}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Register
                            baseUrl={props.baseUrl}
                            registerCallback={registerCallback}
                            setFeedback={{setSubmitSuccess, setSubmitError}}
                        />
                    </TabPanel>

                    {/* Logo */}
                    <div className="logo logoAuth">CMS</div>
                </Card>
            </Grid>

            {/* Submit success message */}
            <FeedbackMsg msg={submitSuccess} onClose={() => setSubmitSuccess("")} />
            {/* Submit error message */}
            <FeedbackMsg error msg={submitError} onClose={() => setSubmitError("")} />
        </Grid>
    );
}

export default Auth;