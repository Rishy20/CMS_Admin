import React from "react";
import {Link} from "react-router-dom";
import {Grid, List} from "@material-ui/core";
import {
    AccountCircle,
    CloudUpload,
    Dashboard,
    Edit,
    Event,
    InsertDriveFile,
    PersonAdd,
    RateReview
} from "@material-ui/icons";
import "./styles/NavBar.css"
import NavButton from "./NavButton";

// Navigation buttons list
const navButtons = [
    {text: "Dashboard", icon: <Dashboard />, path: "/"},
    {text: "Reviewers", icon: <RateReview />, path: "/reviewers"},
    {text: "Editors", icon: <Edit />, path: "/editors"},
    {text: "Registrations", icon: <PersonAdd />, path: "/registrations"},
    {text: "Templates", icon: <InsertDriveFile />, path: "/templates"},
    {text: "Submissions", icon: <CloudUpload />, path: "/submissions"},
    {text: "Agenda", icon: <Event />, path: "/agenda"},
    {text: "User Profile", icon: <AccountCircle />, path:"/account"}
]

//Admin NavBar
function NavBar(props){
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