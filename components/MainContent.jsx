import React from "react";
import Dashboard from "./pages/Dashboard";

const MainContent = props => (
    <div
        className={
            `main
             ${props.collapsed && "mainExtended"}`
        }
    >
        <Dashboard/>
    </div>
)

export default MainContent;