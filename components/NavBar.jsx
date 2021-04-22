import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Grid} from "@material-ui/core";
import "./NavBar.css"
import NavButtons from "./NavButtons";

//Admin NavBar
function NavBar(props){
    return(
        <div
            className={
                `navBar 
                ${props.collapsed ? "collapsed" : "extended"}`
            }
        >
            {/* Logo */}
            <Grid container justify="center">
                <Link
                    to='/'
                    className={
                        `logo 
                        ${props.collapsed ? "logoSmall" : "logoBig"}`
                    }
                >
                    CMS
                </Link>
            </Grid>

            {/* Navigation Buttons */}
            <NavButtons collapsed={props.collapsed} />
        </div>
    )
}
export default NavBar;