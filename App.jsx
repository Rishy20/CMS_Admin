import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import NavBar from './components/NavBar'
import './App.css'
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";
import Auth from "./components/pages/Auth";
import checkLogin from "./components/CheckLogin";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const baseUrl = "https://icaf.site/api/v1";

function App() {
    // User login states
    const [role, setRole] = useState(checkLogin());
    const [userId, setUserId] = useState();

    // Base API URL for the logged-in user
    const [baseUserUrl, setBaseUserUrl] = useState("");

    // User account data states
    const [user, setUser] = useState({
        role: "",
        fname: " ",
        lname: " ",
        email: "",
        contact: "",
        avatar: ""
    });

    // Application-wide UI states
    const [collapsed, setCollapsed] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [notifications, setNotifications] = useState(0);
    // User data related app-wide UI states
    const [avatarSrc, setAvatarSrc] = useState("");
    const [avatarTxt, setAvatarTxt] = useState(" ");

    // Search state
    const [search, setSearch] = useState("");

    // Set userId and baseUserUrl if and when the user is logged in (when role is set)
    useEffect(() => {
        if (role) {
            setUserId(jwt_decode(Cookies.get("token")).id);
            setBaseUserUrl(`${baseUrl}/${role}s`);
        }
    }, [role]);

    // Fetch and set user data using the set API URL
    useEffect(() => {
        if (baseUserUrl && userId) {
            fetch(`${baseUserUrl}/${userId}`)
                .then(raw => raw.json())
                .then(data => setUser({role, ...data}))
                .catch(err => console.log(err));
        }
    }, [baseUserUrl, userId]);

    // Set user avatar src and fallback text
    useEffect(() => {
        setAvatarSrc(user.avatar && `${baseUserUrl}/image/${user.avatar}`);
        setAvatarTxt(`${user.fname[0]}${user.lname[0]}`);
    }, [user]);

    // setState method wrappers to be passed to child components
    const onSetCollapsed = () => setCollapsed(!collapsed);
    const onSetSearch = event => setSearch(event.target.value);

    // Toggle fullscreen
    const onSetFullscreen = () => {
        if (!fullscreen) {
            document.documentElement.requestFullscreen()
                .catch(err => console.error(err));
        } else {
            document.exitFullscreen()
                .catch(err => console.error(err));
        }
    }
    // On fullscreen change, set the state accordingly
    document.documentElement.onfullscreenchange = () => {
        document.fullscreenElement ?
            setFullscreen(true) : setFullscreen(false);
    }

    // Login callback function
    const loginCallback = () => {
        setRole(checkLogin());
    }

    // Logout function
    const logout = () => {
        // Remove the JWT token
        Cookies.remove("token");

        //Reset user related states
        setRole(false);
        setUserId("");
        setUser({role: "", fname: " ", lname: " ", email: "", contact: "", avatar: ""});
    }

    return (
        <div className="App">
            <Router>
                <Switch>
                    {/* Login/Register interface */}
                    <Route path="/auth">
                        {/* Redirect to dashboard if logged in */}
                        {role && <Redirect to="/" />}

                        <Auth baseUrl={baseUrl} loginCallback={loginCallback} />
                    </Route>

                    {/* Admin Panel interface | accessible only when logged in */}
                    <Route path="/">
                        {/* Redirect to Login/Register interface if not logged in */}
                        {!role && <Redirect to="/auth" />}

                        <NavBar role={role} collapsed={collapsed} />
                        <TopBar
                            collapsed={collapsed}
                            setCollapsed={onSetCollapsed}
                            search={search}
                            setSearch={onSetSearch}
                            fullscreen={fullscreen}
                            setFullscreen={onSetFullscreen}
                            logout={logout}
                            notifications={notifications}
                            avatarSrc={avatarSrc}
                            avatarTxt={avatarTxt}
                            firstName={user.fname}
                        />

                        {/* Main Content Area */}
                        <MainContent
                            collapsed={collapsed}
                            baseUrl={baseUrl}
                            baseUserUrl={baseUserUrl}
                            role={role}
                            user={user}
                            setUser={setUser}
                            avatarSrc={avatarSrc}
                            avatarTxt={avatarTxt}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
)
}
export default App;
