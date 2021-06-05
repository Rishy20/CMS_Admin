import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
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
        {/* COMMON Routes */}
        <Switch>
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

            {/* Dashboard */}
            <Route exact path="/">
                <Dashboard />
            </Route>
        </Switch>


        {/* ADMIN-ONLY Routes */}
        {props.role === "admin" &&
            <Switch>
                {/* Reviewers */}
                <Route path="/reviewers">
                    <AllItems baseUrl={props.baseUrl} type="reviewers" />
                </Route>

                {/* Editors */}
                <Route path="/editors">
                    <Editors />
                </Route>

                {/* Registrations */}
                <Route path="/registrations">
                    <AllItems baseUrl={props.baseUrl} type="registrations" />
                </Route>
            </Switch>
        }


        {/* EDITOR-SPECIFIC Routes */}
        {props.role === "editor" &&
            <Switch>
                <Route exact path="/test">
                    <Test />
                </Route>

                {/* Agenda */}
                <Route path="/agenda">
                    <Agenda />
                </Route>

                {/* General Settings */}
                <Route path="/generalsettings">
                    <GeneralSettings />
                </Route>

                {/* Tickets */}
                <Route path="/tickets">
                    <Tickets />
                </Route>
            </Switch>
        }


        {/* REVIEWER-SPECIFIC Routes */}
        {props.role === "reviewer" &&
            null
        }


        {/* DEFAULT Route */}
        <Switch>
            <Route path="/">
                <Redirect to="/" />
            </Route>
        </Switch>
    </div>
)

export default MainContent;