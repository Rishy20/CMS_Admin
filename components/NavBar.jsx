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
    RateReview, Settings
} from "@material-ui/icons";
import "./styles/NavBar.css"
import NavButton from "./NavButton";

// Navigation buttons list
const navButtons = [
    {text: "Dashboard", icon: <Dashboard />, path: "/", auth: "all"},
    {text: "Reviewers", icon: <RateReview />, path: "/reviewers", auth: "admin"},
    {text: "Editors", icon: <Edit />, path:"/editors", auth: "admin"},
    {text: "Attendees", icon: <PersonAdd />, path: "/attendees", auth: "admin"},
    {text: "Researchers", icon: <LocalLibrary />, path: "/researchers", auth: "admin"},
    {text: "Presenters", icon: <PresentToAll />, path: "/presenters", auth: "admin"},
    {text: "Edits", icon: <Settings />, path: "/edits", auth: "admin"},
    {text: "Agenda", icon: <Event />, path: "/agenda", auth: "admin"},
    {text: "Agenda", icon: <Event />, path:"/events", auth: "editor"},
    {text: "General Info", icon: <Settings />, path:"/edits", auth: "editor"},
    {text: "Tickets", icon: <ConfirmationNumber />, path:"/tickets", auth: "editor"},
    {text: "User Profile", icon: <AccountCircle />, path:"/account", auth: "all"},
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
                    (navButton.auth === props.role || navButton.auth === "all") &&
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