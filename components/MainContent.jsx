import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Agenda from "./pages/Agenda";
import GeneralSettings from "./pages/GeneralSettings";
import Tickets from "./pages/Tickets";
import Editors from "./pages/Editors";
import Attendees from "./pages/Attendees";
import Researchers from "./pages/Researchers";
import Edits from "./pages/Edits";
import Presenters from "./pages/Presenters";

const MainContent = ({role, ...props}) => (
    <div
        className={
            `main
             ${props.collapsed && "mainExtended"}`
        }
    >
        <Switch>
            {/* COMMON Routes */}

            {/* Dashboard */}
            <Route exact path="/">
                <Dashboard baseUrl={props.baseUrl} />
            </Route>

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


            {/* ADMIN-SPECIFIC Routes */}

            {/* Editors */}
            {role === "admin" &&
                <Route path="/editors">
                    <Editors baseUrl={props.baseUrl} />
                </Route>
            }

            {/* Attendees */}
            {role === "admin" &&
                <Route path="/attendees">
                    <Attendees baseUrl={props.baseUrl} />
                </Route>
            }

            {/* Researchers */}
            {role === "admin" &&
                <Route path="/researchers">
                    <Researchers baseUrl={props.baseUrl} />
                </Route>
            }

            {/* Presenters */}
            {role === "admin" &&
                <Route path="/presenters">
                    <Presenters baseUrl={props.baseUrl} />
                </Route>
            }

            {/* Edits */}
            {role === "admin" &&
                <Route path="/edits">
                    <Edits baseUrl={props.baseUrl} />
                </Route>
            }


            {/* EDITOR-SPECIFIC Routes */}

            {/* Agenda */}
            {role === "editor" &&
                <Route path="/events">
                    <Agenda baseUrl={props.baseUrl} />
                </Route>
            }

            {/* General Settings */}
            {role === "editor" &&
                <Route path="/edits">
                    <GeneralSettings baseUrl={props.baseUrl} />
                </Route>
            }

            {/* Tickets */}
            {role === "editor" &&
                <Route path="/tickets">
                    <Tickets />
                </Route>
            }


            {/* REVIEWER-SPECIFIC Routes */}


            {/* DEFAULT Route */}
            <Redirect to={role ? "/" : "/auth"} />
        </Switch>
    </div>
)

export default MainContent;