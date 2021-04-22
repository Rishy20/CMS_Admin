import React from 'react'
import './Topbar.css'
import {Grid, IconButton} from "@material-ui/core";
import {KeyboardArrowLeft, Menu} from "@material-ui/icons";

//Admin Topbar
function Topbar(props){
    return(
        <div
            className={
                `topbar
                ${props.collapsed && "topbarExtended"}`
            }
        >
            <Grid container alignItems="center" className="topbarGrid">
                <IconButton onClick={props.setCollapsed}>
                    {props.collapsed ? <Menu/> : <KeyboardArrowLeft />}
                </IconButton>
            </Grid>
        </div>
    )
}
export default Topbar;