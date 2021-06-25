import React from "react";
import {Switch, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Agenda from "./pages/Agenda";
import Test from "./pages/Test";


import Reviewer from "./pages/Reviewer";

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
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Route path="/account">
                <UserProfile
                    baseUrl={props.baseUrl}
                    user={props.user}
                    setUser={props.setUser}
                    avatarSrc={props.avatarSrc}
                    avatarTxt={props.avatarTxt}
                />
            </Route>
            <Route exact path="/test">
                <Test />
            </Route>
            <Route exact path="/reviewers">
                <Reviewer/>
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
        </Switch>
    </div>
)

export default MainContent;