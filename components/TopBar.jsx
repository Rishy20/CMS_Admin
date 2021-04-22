import React from 'react'
import './TopBar.css'
import {Grid, IconButton} from "@material-ui/core";
import {KeyboardArrowLeft, Menu} from "@material-ui/icons";

//Admin TopBar
function TopBar(props){
    return(
        <div
            className={
                `topBar
                ${props.collapsed && "topBarExtended"}`
            }
        >
            <Grid container alignItems="center" className="topBarGrid">
                <IconButton onClick={props.setCollapsed}>
                    {props.collapsed ? <Menu/> : <KeyboardArrowLeft />}
                </IconButton>
            </Grid>
        </div>
    )
}
export default TopBar;