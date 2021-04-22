import React, {useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from './components/NavBar'
import './App.css'
import Dashboard from "./components/pages/dashboard";
import TopBar from "./components/TopBar";

function App() {
    const [collapsed, setCollapsed] = useState(false);

    const onSetCollapsed = () => setCollapsed(!collapsed)

    return (
        <div className='App'>
            <Router>
                <NavBar collapsed={collapsed}/>
                <TopBar collapsed={collapsed} setCollapsed={onSetCollapsed}/>

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