import React from "react";
import {List} from "@material-ui/core";
import {CloudUpload, Dashboard, Edit, Event, InsertDriveFile, PersonAdd,
        RateReview} from "@material-ui/icons";
import NavButton from "./NavButton";

// Navigation buttons list
const navButtons = [
    {text: "Dashboard", icon: <Dashboard />},
    {text: "Reviewers", icon: <RateReview />},
    {text: "Editors", icon: <Edit />},
    {text: "Registrations", icon: <PersonAdd />},
    {text: "Templates", icon: <InsertDriveFile />},
    {text: "Submissions", icon: <CloudUpload />},
    {text: "Agenda", icon: <Event />},
]

const NavButtons = () => (
    <List component="nav">
        {navButtons.map(navButton => (
            <NavButton
                key={navButton.text}
                text={navButton.text}
                icon={navButton.icon}
            />
        ))}
    </List>
);

export default NavButtons;