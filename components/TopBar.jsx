import React, {useEffect, useState} from 'react'
import './styles/TopBar.css'
import {
    Avatar,
    Badge, Grid, IconButton, makeStyles
} from "@material-ui/core";
import {
    ArrowDropDown, Fullscreen, FullscreenExit,
    KeyboardArrowLeft, Menu, Notifications
} from "@material-ui/icons";
import PopUpMenu from "./PopUpMenu";
import {Link} from "react-router-dom";
import Notification from "./Notifications";

// Styles for Material UI components
const useStyles = makeStyles({
    iconButton: {
        padding: "8px",
        marginInline: "4px"
    },
    searchIcon: {
        padding: "4px",
        marginInline: "8px"
    },
    searchForm: {
        boxShadow: "none",
        borderRadius: "16px",
        backgroundColor: "#F8F8FB",
        marginInlineStart: "8px"
    },
    accountButton: {
        paddingInline: "4px",
        paddingBlock: "2px",
        marginInlineStart: "16px",
        marginInlineEnd: "8px",
        borderRadius: "32px"
    }
})

//Admin TopBar
const TopBar = props => {
    const styles = useStyles();

    // States
    const [accMenuOpen, setAccMenuOpen] = useState(false);
    const [accBtnAnchor, setAccBtnAnchor] = useState(null);
    const [notifyBtnLink, setNotifyBtnLink] = useState('');

    // Set state method wrappers
    const accMenuClose = () => setAccMenuOpen(false);
    const accMenuClick = event => {
        setAccBtnAnchor(event.currentTarget);
        setAccMenuOpen(!accMenuOpen);
    };

    // Set notification button link path
    useEffect(() => {
        if (props.role) {
            switch (props.role) {
                case "admin":
                case "editor":
                    setNotifyBtnLink('edits');
                    break;
                case "reviewer":
                    setNotifyBtnLink('reviews/pending');
            }
        }
    }, [props.role]);

    return (
        <div
            className={
                `topBar
                ${props.collapsed && "topBarExtended"}`
            }
        >
            {/* TopBar content (left) */}
            <Grid
                container alignItems="center"
                className="topBarGridLeft"
                justify="flex-start"
            >

                {/* NavBar collapse/extend button */}
                <Grid item>
                    <IconButton
                        className={styles.iconButton}
                        onClick={props.setCollapsed}
                    >
                        {props.collapsed ? <Menu/> : <KeyboardArrowLeft />}
                    </IconButton>
                </Grid>
            </Grid>

            {/* TopBar content (right) */}
            <Grid
                container alignItems="center"
                className="topBarGridRight"
                justify="flex-end"
            >

                {/* Fullscreen button */}
                <Grid item>
                    <IconButton
                        className={styles.iconButton}
                        onClick={props.setFullscreen}
                    >
                        {props.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                    </IconButton>
                </Grid>

                {/* Notifications button */}
                <Grid item>
                    <Notification userId={props.userId}/>

                    {/*<IconButton*/}
                    {/*    component={Link}*/}
                    {/*    to={notifyBtnLink}*/}
                    {/*    className={styles.iconButton}*/}
                    {/*>*/}
                    {/*    <Badge*/}
                    {/*        badgeContent={props.notifications}*/}
                    {/*        color="secondary"*/}
                    {/*    >*/}
                    {/*        <Notifications />*/}
                    {/*    </Badge>*/}
                    {/*</IconButton>*/}
                </Grid>

                {/* Account button */}
                <Grid item>
                    <IconButton
                        className={styles.accountButton}
                        onClick={accMenuClick}
                        disableRipple
                    >
                        <Avatar src={props.avatarSrc}>
                            {props.avatarTxt}
                        </Avatar>
                        <p className="firstName">{props.firstName}</p>
                        <ArrowDropDown />
                    </IconButton>

                    <PopUpMenu
                        anchorEl={accBtnAnchor}
                        open={accMenuOpen}
                        onClose={accMenuClose}
                        logout={props.logout}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
export default TopBar;