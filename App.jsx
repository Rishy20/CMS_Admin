import React, {useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from './components/Navbar'
import './App.css'
import Dashboard from "./components/pages/dashboard";
import Topbar from "./components/Topbar";

function App() {
    const [collapsed, setCollapsed] = useState(false);

    const onSetCollapsed = () => setCollapsed(!collapsed)

    return (
        <div className='App'>
            <Router>
                <Navbar collapsed={collapsed}/>
                <Topbar collapsed={collapsed} setCollapsed={onSetCollapsed}/>

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