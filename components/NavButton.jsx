import React from "react";
import {NavLink} from "react-router-dom";
import {ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import "./NavButton.css"

// Make styles for ListItemIcon and ListItemText
const useStyles = makeStyles({
    iconRoot: {
        paddingInlineStart: 20,
        paddingInlineEnd: 20,
        color: "white"
    },
    textPrimary: {
        fontWeight: "bold",
        color: "white"
    }
})

const NavButton = (props) => {
    const styles = useStyles();

    return (
        <ListItem
            button
            component={NavLink}  // Make ListItem component act as a NavLink
            to={props.path}  // Pass the link path
            exact
            activeClassName="selected"  // Classname when the link is active
        >
            <ListItemIcon classes={{root: styles.iconRoot}}>
                {props.icon}
            </ListItemIcon>
            <ListItemText
                classes={{primary: styles.textPrimary}}
                primary={props.text}
            />
        </ListItem>
    )
};

export default NavButton;