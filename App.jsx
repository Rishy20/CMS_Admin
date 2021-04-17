import React from 'react';
import Navbar from './components/Navbar'
import './App.css'
import Dashboard from "./components/pages/dashboard";
import Topbar from "./components/Topbar";

function App(){
return(
    <div className='App'>
        <Navbar/>
        <Topbar/>
        {/*Main Content Area*/}
        <div className='main'>
            <Dashboard/>
        </div>
    </div>
)
}
export default App;