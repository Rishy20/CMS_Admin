import React from "react";
import {Switch, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import AllItems from "./pages/AllItems";

const MainContent = props => (
    <div
        className={
            `main
             ${props.collapsed && "mainExtended"}`
        }
    >
        <Switch>
            {/* ADMIN-ONLY Routes */}

            {/* Reviewers */}
            <Route path="/reviewers">
                <AllItems baseUrl={props.baseUrl} type="reviewers" />
            </Route>

            {/* Editors */}
            <Route path="/editors">
                <AllItems baseUrl={props.baseUrl} type="editors" />
            </Route>

            {/* Registrations */}
            <Route path="/registrations">
                <AllItems baseUrl={props.baseUrl} type="registrations" />
            </Route>

            {/* COMMON Routes */}

            {/* User Profile */}
            <Route path="/account">
                <UserProfile
                    baseUrl={props.baseUrl}
                    baseUserUrl={props.baseUserUrl}
                    user={props.user}
                    setUser={props.setUser}
                    avatarSrc={props.avatarSrc}
                    avatarTxt={props.avatarTxt}
                />
            </Route>

            {/* Dashboard | DEFAULT Route */}
            <Route path="/">
                <Dashboard />
            </Route>
        </Switch>
    </div>
)

export default MainContent;