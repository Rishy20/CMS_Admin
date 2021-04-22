import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from './components/Navbar'
import './App.css'
import Dashboard from "./components/pages/dashboard";
import Topbar from "./components/Topbar";
import Test from "./components/pages/Test";

function App(){
return(
    <div className='App'>
        <Router>
            <Navbar/>
            <Topbar/>
            {/*Main Content Area*/}
            <div className='main'>
                <Dashboard/>
            </div>
        </Router>
    </div>
)
}
export default App;