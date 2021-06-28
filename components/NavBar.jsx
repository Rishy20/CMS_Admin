import React from "react";
import {Link} from "react-router-dom";
import {Grid, List} from "@material-ui/core";
import {
    AccountCircle,
    ConfirmationNumber,
    Dashboard,
    Edit,
    Event,
    LocalLibrary,
    PersonAdd, PresentToAll,
    RateReview, Settings, CheckCircle, RecordVoiceOver, InsertDriveFile
} from "@material-ui/icons";
import "./styles/NavBar.css"
import NavButton from "./NavButton";

// Navigation buttons list
const navButtons = [
    {text: "Dashboard", icon: <Dashboard />, path: "/", auth: ["admin", "editor", "reviewer"]},
    {text: "Reviewers", icon: <RateReview />, path: "/reviewers", auth: ["admin"]},
    {text: "Editors", icon: <Edit />, path:"/editors", auth: ["admin"]},
    {text: "Attendees", icon: <PersonAdd />, path: "/attendees", auth: ["admin"]},
    {text: "Researchers", icon: <LocalLibrary />, path: "/researchers", auth: ["admin"]},
    {text: "Presenters", icon: <PresentToAll />, path: "/presenters", auth: ["admin"]},
    {text: "Speakers", icon: <RecordVoiceOver />, path: "/keynotes", auth: ["admin"]},
    {text: "Edits", icon: <Settings />, path: "/edits", auth: ["admin"]},
    {text: "Agenda", icon: <Event />, path:"/events", auth: ["admin", "editor"]},
    {text: "General Info", icon: <Settings />, path:"/edits", auth: ["editor"]},
    {text: "Templates", icon: <InsertDriveFile />, path:"/templates", auth: ["editor"]},
    {text: "Tickets", icon: <ConfirmationNumber />, path:"/tickets", auth: ["editor"]},
    {text: "Pending ", icon: <RateReview />, path: "/reviews/pending", auth: ["reviewer"]},
    {text: "My Reviews", icon: <CheckCircle />, path: "/reviews/my", auth: ["reviewer"]},
    {text: "User Profile", icon: <AccountCircle />, path:"/account", auth: ["admin", "editor", "reviewer"]},
]

//Admin NavBar
const NavBar = props => {
    return(
        <div
            className={
                `navBar 
                ${props.collapsed ? "collapsed" : "extended"}`
            }
        >
            {/* Logo */}
            <Grid container justify="center">
                <Link
                    to='/'
                    className={
                        `logo 
                        ${props.collapsed ? "logoSmall" : "logoBig"}`
                    }
                >
                    CMS
                </Link>
            </Grid>

            {/* Navigation Buttons */}
            <List component="nav">
                {/* Render each navigation button in the list with props */}
                {navButtons.map(navButton => (
                    // Only render NavButtons which are allowed for the user type
                    navButton.auth.includes(props.role) &&
                        <NavButton
                            key={navButton.text}
                            text={navButton.text}
                            icon={navButton.icon}
                            path={navButton.path}
                            collapsed={props.collapsed}
                        />
                ))}
            </List>
        </div>
    )
}
export default NavBar;