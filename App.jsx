import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from './components/NavBar'
import './App.css'
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";

// Temporary hardcoded variables
const role = "admin";
const userId = "60ae297b90bb0400045cfd36";

function App() {
    // Base API URL for the logged-in user
    const [baseUrl, setBaseUrl] = useState("");

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

    // Set API URL according to the role of the logged-in user and their user ID
    useEffect(() => {
        setBaseUrl(`https://icaf.site/api/v1/${role}s/`);
    }, [role]);

    // Fetch and set user data using the set API URL
    useEffect(() => {
        fetch(baseUrl + userId)
            .then(raw => raw.json())
            .then(data => setUser({role, ...data}))
            .catch(err => console.log(err));
    }, [baseUrl]);

    // Set user avatar src and fallback text
    useEffect(() => {
        setAvatarSrc(`${baseUrl}image/${user.avatar}`);
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

    return (
        <div className="App">
            <Router>
                <NavBar collapsed={collapsed}/>
                <TopBar
                    collapsed={collapsed}
                    setCollapsed={onSetCollapsed}
                    search={search}
                    setSearch={onSetSearch}
                    fullscreen={fullscreen}
                    setFullscreen={onSetFullscreen}
                    notifications={notifications}
                    avatarSrc={avatarSrc}
                    avatarTxt={avatarTxt}
                    firstName={user.fname}
                />

                {/* Main Content Area */}
                <MainContent
                    collapsed={collapsed}
                    baseUrl={baseUrl}
                    user={user}
                    setUser={setUser}
                    avatarSrc={avatarSrc}
                    avatarTxt={avatarTxt}
                />
            </Router>
        </div>
    )
}
export default App;