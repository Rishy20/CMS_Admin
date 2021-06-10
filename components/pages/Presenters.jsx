import React, {useState} from "react";
import {Route, useHistory} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

// Columns for the table
const columns = [
    {
        name: "Presenter's Name",
        id: "presentersName",
        type: "text"
    },
    {
        name: "Workshop Name",
        id: "workshopName",
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
        label: "Presenter's Name",
        type: "text",
        name: "presentersName"
    },
    {
        label: "Workshop Name",
        type: "text",
        name: "workshopName"
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
    presentersName: "",
    workshopName: "",
    email: "",
    contact: "",
    password: "",
    country: "",
    jobTitle: "",
    company: ""
}

const Presenters = ({baseUrl}) => {
    // API URL
    const url = `${baseUrl}/workshops`;
    // State for the current researcher to edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/presenters");
    }

    return (
        <div>
            <Route exact path="/presenters">
                <Tables
                    url={url}
                    title={"Presenters"}
                    columns={columns}
                    type={"presenters"}
                    setEditData={setEditData}
                />
            </Route>

            {/*Add Path*/}
            <Route path="/presenters/add">
                <FormHolder
                    title={"Add Presenter"}
                    formTitle={"Presenter Information"}
                    inputs={inputs}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    url={url}
                    method={"POST"}
                />
            </Route>

            {/*Edit Path*/}
            <Route path="/presenters/edit">
                <FormHolder
                    title={"Edit Presenter"}
                    formTitle={"Presenter Information"}
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

export default Presenters;