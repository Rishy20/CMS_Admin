import React from "react";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import {Route} from "react-router-dom"

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

        <Test/>
    </div>
)

export default MainContent;