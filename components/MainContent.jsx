import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import Agenda from "./pages/Agenda";
import Reviewer from "./pages/Reviewer";
import GeneralSettings from "./pages/GeneralSettings";
import Tickets from "./pages/Tickets";
import Editors from "./pages/Editors";
import Attendees from "./pages/Attendees";
import Researchers from "./pages/Researchers";
import Edits from "./pages/Edits";
import Presenters from "./pages/Presenters";
import EditorDashboard from "./pages/EditorDashboard";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import PendingReviews from "./pages/PendingReviews";
import MyReviews from "./pages/MyReviews";
import KeynoteSpeakers from "./pages/KeynoteSpeakers";
import Templates from "./pages/Templates";

// Container for main application views
const MainContent = ({role, ...props}) => (
    <div
        className={
            `main
             ${props.collapsed && "mainExtended"}`
        }
    >
        <Switch>
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

            {/* ADMIN-SPECIFIC Routes */}

            {/* Dashboard */}
            { role === "admin" &&
                <Route exact path="/">
                    <AdminDashboard baseUrl={props.baseUrl} role={role} />
                </Route>
            }

            {/* Editors */}
            {role === "admin" &&
                <Route path="/editors">
                    <Editors baseUrl={props.baseUrl} />
                </Route>
            }

            {role === "admin" &&
                <Route path="/reviewers">
                    <Reviewer baseUrl={props.baseUrl} />
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

            {/* Keynote Speakers */}
            {role === "admin" &&
                <Route path="/keynotes">
                    <KeynoteSpeakers baseUrl={props.baseUrl} />
                </Route>
            }

            {/* Edits */}
            {role === "admin" &&
                <Route path="/edits">
                    <Edits baseUrl={props.baseUrl} />
                </Route>
            }


            {/* EDITOR-SPECIFIC Routes */}

            {/* Dashboard */}
            { role === "editor" &&
                <Route exact path="/">
                    <EditorDashboard baseUrl={props.baseUrl} role={role} />
                </Route>
            }

            {/* Agenda */}
            { (role === "editor" || role === "admin") &&
                <Route path="/events">
                    <Agenda baseUrl={props.baseUrl} role={role} />
                </Route>
            }

            {/* General Settings */}
            {role === "editor" &&
                <Route path="/edits">
                    <GeneralSettings baseUrl={props.baseUrl} userId={props.user._id} />
                </Route>
            }

            {/* Templates */}
            {role === "editor" &&
                <Route path="/templates">
                    <Templates baseUrl={props.baseUrl} />
                </Route>
            }
            }

            {/* Tickets */}
            {role === "editor" &&
                <Route path="/tickets">
                    <Tickets baseUrl={props.baseUrl} />
                </Route>
            }


            {/* REVIEWER-SPECIFIC Routes */}

            {/* Dashboard */}
            { role === "reviewer" &&
                <Route exact path="/">
                    <ReviewerDashboard baseUrl={props.baseUrl} role={role} userId={props.user._id} />
                </Route>
            }

            {/* Pending Reviews */}
            {role === "reviewer" &&
                <Route path="/reviews/pending">
                    <PendingReviews baseUrl={props.baseUrl} role={role} userId={props.user._id} />
                </Route>
            }

            {/* My Reviews */}
            {role === "reviewer" &&
                <Route path="/reviews/my">
                    <MyReviews baseUrl={props.baseUrl} role={role} userId={props.user._id} />
                </Route>
            }


            {/* DEFAULT Route */}
            <Redirect to={role ? "/" : "/auth"} />

        </Switch>
    </div>
)

export default MainContent;