import React from "react";
import {Switch, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import AllItems from "./pages/AllItems";
import Agenda from "./pages/Agenda";
import Test from "./pages/Test";
import GeneralSettings from "./pages/GeneralSettings";
import Tickets from "./pages/Tickets";
import Editors from "./pages/Editors";

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
            <Route exact path="/test">
                <Test />
            </Route>
            <Route exact path="/editors">
                <Editors/>
            </Route>
            <Route exact path="/agenda">
                <Agenda />
            </Route>
            <Route exact path="/generalsettings">
                <GeneralSettings />
            </Route>
            <Route exact path="/Tickets">
                <Tickets />
            </Route>

            {/* Dashboard | DEFAULT Route */}
            <Route path="/">
                <Dashboard />
            </Route>
        </Switch>
    </div>
)

export default MainContent;