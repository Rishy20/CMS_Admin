import React from "react";
import {Menu} from "@material-ui/core";
import {ExitToApp, Person} from "@material-ui/icons";
import PopUpMenuItem from "./PopUpMenuItem";
import "./styles/PopUpMenu.css"

// Custom popup menu component
const PopUpMenu = props => {
    // Pop up menu items list
    const popUpMenuItems = [
        {text: "User Profile", icon: <Person />, path: "/account", divider: true},
        {text: "Logout", icon: <ExitToApp />, path: "/auth", customAction: props.logout}
    ]

    return (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.onClose}
            keepMounted
            classes={{paper: "popUpMenu"}}
        >
            {popUpMenuItems.map(menuItem => (
                <PopUpMenuItem
                    key={menuItem.text}
                    text={menuItem.text}
                    icon={menuItem.icon}
                    path={menuItem.path}
                    customAction={menuItem.customAction}
                    divider={menuItem.divider}
                    onClose={props.onClose}
                />
            ))}
        </Menu>
    )
}

export default PopUpMenu;