import React, {useEffect, useState} from "react";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

const url = "http://localhost:3000/api/v1/researchers";

const columns=[
    {
        name:"First Name",
        id:"fname",
        type:"text"
    },
    {
        name:"Last Name",
        id:"lname",
        type:"text"
    },
    {
        name:"Gender",
        id:"gender",
        type:"text"
    },
    {
        name:"Email",
        id:"email",
        type:"text"
    },
    {
        name:"Actions",
        id:"action",
        type:"actions"
    }
]


//Inputs stored as an array so they can be mapped to Input component
const inputs=[
    {
        label:"First Name",
        type:"text",
        name:"fname"
    },
    {
        label:"Last Name",
        type:"text",
        name:"lname"
    },
    {
        label:"Email",
        type:"email",
        name:"email"
    },
    {
        label:"Contact",
        type:"tel",
        name:"contact"
    },
    {
        label:"Gender",
        type:"select",
        name:"gender",
        values:["Male","Female","Other"]
    },
    {
        label:"Age",
        type:"text",
        name:"age",
        maxLength:3
    },
    {
        label:"Address",
        type:"text",
        name:"address"
    },
    {
        label:"NIC",
        type:"text",
        name:"nic",
        maxLength: 12
    },
]
//Buttons to be displayed in the form
const buttons = [
    {
        name:"Save ",
        style:"btn-save",
        type:"Submit"
    },
    {
        name:"Cancel",
        style:"btn-cancel",
    },
]
//Input box names used in the form so that they can be sent to useForm hook to maintain the state
const names={
    fname:'',
    lname:'',
    gender:'',
    email:'',
    contact:'',
    address:'',
    age:'',
    nic:'',
}



const Test = () => {


    // State for the current product in edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/test");
    }

    return (
        <div>

                <Route exact path="/test">
                    <Tables url={url} title={"All Researchers"} columns={columns} type={"test"} setEditData={setEditData}/>
                </Route>
                {/*Add Path*/}
                <Route path="/test/add">
                    <FormHolder
                        title={"Add Test"}
                        formTitle={"Test Information"}
                        inputs={inputs}
                        buttons={buttons}
                        names={names}
                        callback={toLink}
                        url={url}
                        method={"POST"}
                    />
                </Route>
                {/*Edit Path*/}
                <Route path="/test/edit">
                    <FormHolder
                        title={"Edit Test"}
                        formTitle={"Test Information"}
                        inputs={inputs}
                        buttons={buttons}
                        names={editData}
                        callback={toLink}
                        url={`${url}/${editData?editData._id:""}`}
                        method={"PUT"}
                    />
                </Route>

        </div>

    )
}

export default Test;