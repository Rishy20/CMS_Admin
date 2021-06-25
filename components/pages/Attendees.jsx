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
        name: "Ticket",
        id: "ticket",
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
        label: "First Name",
        type: "text",
        name: "fname"
    },
    {
        label: "Last Name",
        type: "text",
        name: "lname"
    },
    {
        label: "Email",
        type: "email",
        name: "email"
    },
    {
        label: "Phone",
        type: "tel",
        name: "contact"
    },
    {
        label: "Password",
        type: "password",
        name: "password"
    },
    {
        label: "City",
        type: "text",
        name: "city",
    },
    {
        label: "Country",
        type: "text",
        name: "country",
    },
    {
        label: "Ticket",
        type: "select",
        name: "ticket",
        values: ["Premium Pass", "Platinum Pass", "VIP Pass"]
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
    fname: "",
    lname: "",
    email: "",
    contact: "",
    password: "",
    city: "",
    country: "",
    ticket: "Premium Pass"
}

const Attendees = ({baseUrl}) => {
    // API URL
    const url = `${baseUrl}/attendees`;
    // State for the current attendee to edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/attendees");
    }

    return (
        <div>
            <Route exact path="/attendees">
                <Tables
                    url={url}
                    title={"Attendees"}
                    columns={columns}
                    type={"attendees"}
                    setEditData={setEditData}
                />
            </Route>

            {/*Add Path*/}
            <Route path="/attendees/add">
                <FormHolder
                    title={"Add Attendee"}
                    formTitle={"Attendee Information"}
                    inputs={inputs}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    url={url}
                    method={"POST"}
                />
            </Route>

            {/*Edit Path*/}
            <Route path="/attendees/edit">
                <FormHolder
                    title={"Edit Attendee"}
                    formTitle={"Attendee Information"}
                    inputs={inputs}
                    buttons={buttons}
                    names={editData}
                    callback={toLink}
                    url={`${url}/${editData ? editData._id : ""}`}
                    method={"PUT"}
                />
            </Route>
        </div>
    )
}

export default Attendees;