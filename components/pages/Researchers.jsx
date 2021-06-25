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
        name: "Company",
        id: "company",
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
        label: "Country",
        type: "text",
        name: "country",
    },
    {
        label: "Job Title",
        type: "text",
        name: "jobTitle",
    },
    {
        label: "Company",
        type: "text",
        name: "company",
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
    country: "",
    jobTitle: "",
    company: ""
}

const Researchers = ({baseUrl}) => {
    // API URL
    const url = `${baseUrl}/researchers`;
    // State for the current researcher to edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/researchers");
    }

    return (
        <div>
            <Route exact path="/researchers">
                <Tables
                    url={url}
                    title={"Researchers"}
                    columns={columns}
                    type={"researchers"}
                    setEditData={setEditData}
                />
            </Route>

            {/*Add Path*/}
            <Route path="/researchers/add">
                <FormHolder
                    title={"Add Researcher"}
                    formTitle={"Researcher Information"}
                    inputs={inputs}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    url={url}
                    method={"POST"}
                />
            </Route>

            {/*Edit Path*/}
            <Route path="/researchers/edit">
                <FormHolder
                    title={"Edit Researcher"}
                    formTitle={"Researcher Information"}
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

export default Researchers;