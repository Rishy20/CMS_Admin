import React from 'react';
import Navbar from './components/Navbar'
import './App.css'
import Dashboard from "./components/pages/dashboard";
import Topbar from "./components/Topbar";
import Test from "./components/pages/Test";
import AddReviewer from "./components/pages/AddReviewer";
import AllReviewer from "./components/pages/AllReviewer";

function App(){
return(
    <div className='App'>
        <Navbar />
        <Topbar />
        {/*Main Content Area*/}
        <div className='main'>
            <AllReviewer/>
        </div>
    </div>
)
}
export default App;