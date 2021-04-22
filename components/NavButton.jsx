import React from "react";
import {ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";

// Make styles for ListItemIcon and ListItemText
const useStyles = makeStyles({
    iconRoot: {
        paddingInlineStart: 20,
        paddingInlineEnd: 20,
        color: 'white'
    },
    textPrimary: {
        fontWeight: 'bold'
    }
})

const NavButton = (props) => {
    const styles = useStyles();

    return (
        <ListItem button>
            <ListItemIcon
                classes={{root: styles.iconRoot}}>{props.icon}
            </ListItemIcon>
            <ListItemText
                classes={{primary: styles.textPrimary}}
                primary={props.text}
            />
        </ListItem>
    )
};

export default NavButton;