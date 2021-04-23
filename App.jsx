import React, {useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from './components/NavBar'
import './App.css'
import Dashboard from "./components/pages/dashboard";
import TopBar from "./components/TopBar";

function App() {
    // States
    const [collapsed, setCollapsed] = useState(false);
    const [search, setSearch] = useState("");
    const [fullscreen, setFullscreen] = useState(false);
    const [notifications] = useState(0);
    const [firstName] = useState("");

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
                />

                {/* Main Content Area */}
                <div
                    className={
                        `main
                        ${collapsed && "mainExtended"}`
                    }
                >
                    <Dashboard/>
                </div>
            </Router>
        </div>
    )
}
export default App;