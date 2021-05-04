import React from 'react';
import Navbar from './components/Navbar'
import './App.css'
import Dashboard from "./components/pages/dashboard";
import Topbar from "./components/Topbar";
import Test from "./components/pages/Test";
import AddEditor from "./components/pages/AddEditor"
import CreateEvent from "./components/pages/CreateEvent";
import Tickets from "./components/pages/Tickets"

function App(){
return(
    <div className='App'>
        <Navbar />
        <Topbar />
        {/*Main Content Area*/}
        <div className='main'>
            {/*<Dashboard/>*/}
           {/*<AddEditor/>*/}
           {/* <CreateEvent/>*/}
           <Tickets/>
        </div>
    </div>
)
}
export default App;