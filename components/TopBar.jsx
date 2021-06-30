import React, {useEffect, useState} from 'react'
import './styles/TopBar.css'
import {
    Avatar,
    Badge, Grid, IconButton, makeStyles
} from "@material-ui/core";
import {
    ArrowDropDown, Fullscreen, FullscreenExit,
    KeyboardArrowLeft, Menu
} from "@material-ui/icons";
import PopUpMenu from "./PopUpMenu";
import Notifications from "./Notifications";

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

    // Set state method wrappers
    const accMenuClose = () => setAccMenuOpen(false);
    const accMenuClick = event => {
        setAccBtnAnchor(event.currentTarget);
        setAccMenuOpen(!accMenuOpen);
    };

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
                    <Notifications userId={props.userId}/>
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