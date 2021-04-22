import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Grid} from "@material-ui/core";
import "./Navbar.css"
import NavButtons from "./NavButtons";

//Admin Navbar
function Navbar(props){
    return(
        <div
            className={
                `navbar 
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
export default Navbar;