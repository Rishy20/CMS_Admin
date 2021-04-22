import React from "react";
import {List} from "@material-ui/core";
import {CloudUpload, Dashboard, Edit, Event, InsertDriveFile, PersonAdd,
        RateReview} from "@material-ui/icons";
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
]

const NavButtons = (props) => (
    <List component="nav">
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
);

export default NavButtons;