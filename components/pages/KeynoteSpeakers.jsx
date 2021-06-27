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
        name: "Job Title",
        id: "jobTitle",
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
        label: "Job Title",
        type: "text",
        name: "jobTitle"
    },
    {
        label: "Company",
        type: "text",
        name: "company"
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
        label: "Bio",
        type: "textarea",
        name: "bio",
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
    jobTitle: "",
    company: "",
    password: "",
    country: "",
    bio: "",
}

const KeynoteSpeakers = ({baseUrl}) => {
    // API URL
    const url = `${baseUrl}/keynotes`;
    // State for the current keynote to edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/keynotes");
    }

    return (
        <div>
            <Route exact path="/keynotes">
                <Tables
                    url={url}
                    title={"Keynote Speakers"}
                    columns={columns}
                    type={"keynotes"}
                    setEditData={setEditData}
                />
            </Route>

            {/*Add Path*/}
            <Route path="/keynotes/add">
                <FormHolder
                    title={"Add Keynote Speaker"}
                    formTitle={"Keynote Speaker Information"}
                    inputs={inputs}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    url={url}
                    method={"POST"}
                />
            </Route>

            {/*Edit Path*/}
            <Route path="/keynotes/edit">
                <FormHolder
                    title={"Edit Keynote Speaker"}
                    formTitle={"Keynote Speaker Information"}
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

export default KeynoteSpeakers;