import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from './components/NavBar'
import './App.css'
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";

// Temporary hardcoded variables
const role = "admin";
const userId = "60abc5bdbde2d08e5c1721dd";

function App() {
    // Set API URL according to the role of the logged-in user
    const [userUrl, setUserUrl] = useState("");

    useEffect(() => {
        setUserUrl(`http://localhost:3000/api/v1/${role}s/${userId}`);
    }, [role]);

    // States
    const [collapsed, setCollapsed] = useState(false);
    const [search, setSearch] = useState("");
    const [fullscreen, setFullscreen] = useState(false);
    const [notifications, setNotifications] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [profilePic, setProfilePicture] = useState("");

    // Set state method wrappers
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
        <div className='App'>
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
                    firstName={firstName}
                    profilePic={profilePic}
                />

                {/* Main Content Area */}
                <MainContent userUrl={userUrl} collapsed={collapsed} />
            </Router>
        </div>
    )
}
export default App;