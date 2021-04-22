import React from "react";
import {Link} from "react-router-dom";
import {Grid} from "@material-ui/core";
import "./Navbar.css"
import NavButtons from "./NavButtons";

//Admin Navbar
function Navbar(){
    return(
        <div className="navbar">
            {/* Logo */}
            <Grid container justify="center">
                <Link to='/' className="logo">CMS</Link>
            </Grid>

            {/* Navigation Buttons */}
            <NavButtons />
        </div>
    )
}
export default Navbar;