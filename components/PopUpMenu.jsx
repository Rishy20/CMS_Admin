import React from "react";
import {Menu, withStyles} from "@material-ui/core";
import {ExitToApp, Person} from "@material-ui/icons";
import PopUpMenuItem from "./PopUpMenuItem";

// Pop up menu items list
const popUpMenuItems = [
    {text: "User Profile", icon: <Person />, path: "/account"},
    {text: "Logout", icon: <ExitToApp />, path: "/logout"}
]

// Custom popup menu component
const PopUpMenu = props => {
    const CustomMenu = withStyles({
        paper: {
            border: "1px solid lightgrey",
        },
    })(styles => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center", }}
            transformOrigin={{ vertical: "top", horizontal: "center", }}
            {...props}
            {...styles}
        />
    ));

    return (
        <CustomMenu>
            {popUpMenuItems.map(menuItem => (
                <PopUpMenuItem
                    key={menuItem.text}
                    text={menuItem.text}
                    icon={menuItem.icon}
                    path={menuItem.path}
                    onClick={props.onClose}
                />
            ))}
        </CustomMenu>
    )
}

export default PopUpMenu;