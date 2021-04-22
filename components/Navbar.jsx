import React from "react";
import {Grid} from "@material-ui/core";
import "./Navbar.css"
import NavButtons from "./NavButtons";

//Admin Navbar
function Navbar(){
    return(
        <div className="navbar">
            {/* Logo */}
            <Grid container justify="center">
                <h1 className="logo">CMS</h1>
            </Grid>

            {/* Navigation Buttons */}
            <NavButtons />
        </div>
    )
}
export default Navbar;