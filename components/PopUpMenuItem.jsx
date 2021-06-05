import React from "react";
import {NavLink} from "react-router-dom";
import {ListItemIcon, ListItemText, MenuItem} from "@material-ui/core";

const PopUpMenuItem = React.forwardRef((props, ref) => (
    <MenuItem
        ref={ref}
        component={NavLink}
        to={props.path}
        onClick={props.customAction ? props.customAction : props.onClose}
        divider={props.divider}
    >
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
    </MenuItem>
));

export default PopUpMenuItem;