import React from "react";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import {Route} from "react-router-dom"
import Reviewer from "./pages/Reviewer";

const MainContent = props => (
    <div
        className={
            `main
             ${props.collapsed && "mainExtended"}`
        }
    >
        <Route exact path={"/"}>
            <Dashboard/>
        </Route>

        <Reviewer/>
    </div>
)

export default MainContent;