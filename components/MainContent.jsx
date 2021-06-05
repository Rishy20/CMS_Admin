import React from "react";
import {Switch, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Test from "./pages/Test";

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
                    baseUserUrl={props.baseUserUrl}
                    user={props.user}
                    setUser={props.setUser}
                    avatarSrc={props.avatarSrc}
                    avatarTxt={props.avatarTxt}
                />
            </Route>
            <Test />
        </Switch>
    </div>
)

export default MainContent;