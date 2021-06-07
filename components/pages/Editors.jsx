import React, {useState} from "react";
import {Route, useHistory} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

// Columns for the table
const columns = [
    {
        name: "First Name",
        id: "fname",
        type: "text"
    },
    {
        name: "Last Name",
        id: "lname",
        type: "text"
    },
    {
        name: "Email",
        id: "email",
        type: "text"
    },
    {
        name: "Phone",
        id: "contact",
        type: "text"
    },
    {
        name: "Status",
        id: "status",
        type: "text"
    },
    {
        name: "Actions",
        id: "action",
        type: "actions"
    }
]

// Inputs stored as an array so they can be mapped to Input component
    const inputs = [
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
            label:"Phone",
            type:"tel",
            name:"contact"
        },
        {
            label:"Password",
            type:"password",
            name:"password"
        },
        {
            label:"Status",
            type:"select",
            name:"status",
            values: [
                {value: "pending", displayAs: "Pending"},
                {value: "active", displayAs: "Active"},
                {value: "suspended", displayAs: "Suspended"}
            ]
        }
]

// Buttons to be displayed in the form
    const buttons = [
        {
            name:"Save ",
            style:"btn-save",
            type:"submit"
        },
        {
            name:"Cancel",
            style:"btn-cancel",
            type:"cancel"
        }
    ]

// Input box names used in the form so that they can be sent to useForm hook to maintain the state
const names = {
    fname: '',
    lname: '',
    email: '',
    contact: '',
    password: '',
    status: 'pending'
}

const Editors = ({baseUrl}) => {
    // API URL
    const url = `${baseUrl}/editors`;
    // State for the current editor to edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/editors");
    }

    return (
        <div>
            <Route exact path="/editors">
                <Tables
                    url={url}
                    title={"Editors"}
                    columns={columns}
                    type={"editors"}
                    setEditData={setEditData}
                />
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
                    url={`${url}/${editData ? editData._id : ""}`}
                    method={"PUT"}
                    adminUserUpdate
                />
            </Route>
        </div>
    )
}

export default Editors;