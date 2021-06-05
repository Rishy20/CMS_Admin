import React, {useEffect, useState} from "react";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

const url = "http://localhost:3000/api/v1/editors";

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
        type:"select"
    },
    {
        name:"Email",
        id:"email",
        type:"text"
    },
    {
        name:"Contact",
        id:"contact",
        type:"text"
    },
    {
        name:"Country",
        id:"country",
        type:"text"
    },

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
            label:"Gender",
            type:"select",
            name:"gender"
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
            label:"Country",
            type:"text",
            name:"country"
        }

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
        }
        ]
//Input box names used in the form so that they can be sent to useForm hook to maintain the state
const names= {
    fname: '',
    lname: '',
    gender: '',
    email: '',
    contact: '',
    country:'',
}

const Editors = () => {


    // State for the current product in edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/editors");
    }

    return (
        <div>

            <Route exact path="/editors">
                <Tables url={url} title={"All Editors"} columns={columns} type={"editors"} setEditData={setEditData}/>
            </Route>
            {/*Add Path*/}
            <Route path="/editors/add">
                <FormHolder
                    title={"Add Editor"}
                    formTitle={"Editor Information"}
                    inputs={inputs}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    url={url}
                    method={"POST"}
                />
            </Route>
            {/*Edit Path*/}
            <Route path="/editors/edit">
                <FormHolder
                    title={"Edit Editor"}
                    formTitle={"Editor Information"}
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

export default Editors;