import React, {useState} from "react";
import {Route, useHistory} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

const columnsSettings = [
    {
        name:"Conference Name",
        id:"conferenceName",
        type:"text"
    },
    {
        name:"Abbreviation",
        id:"abbrevation",
        type:"text"
    },
    {
        name:"Short Description",
        id:"shortDescription",
        type:"text"
    },
    {
        name:"Description",
        id:"description",
        type:"text"
    },
    {
        name:"Location",
        id:"location",
        type:"text"
    },
    {
        name:"Start Date",
        id:"startDate",
        type:"text"
    },
    {
        name:"Start Time",
        id:"startTime",
        type:"text"
    },
    {
        name:"End Date",
        id:"endDate",
        type:"text"
    },
    {
        name:"End Time",
        id:"endTime",
        type:"text"
    },
    {
        name:"Paper Submission Amount",
        id:"paperSubmissionAmount",
        type:"text"
    },
];

const columnsEdits = [
    {
        name: "Editor",
        id: "userName",
        type: "text",
    },
    {
        name: "Edit Item",
        id: "editItem",
        type: "text",
        prettify: true
    },
    {
        name: "New Value",
        id: "newValue",
        type: "text"
    },
    {
        name: "Description",
        id: "description",
        type: "text"
    },
    {
        name: "Status",
        id: "status",
        type: "text",
        statusStyle: true
    },
    {
        name: "Actions",
        id: "action",
        type: "actions",
        disableEditOn: [
            {column: "status", value: "approved"},
            {column: "status", value: "rejected"}
        ]
    }
];

//Inputs stored as an array so they can be mapped to Input component
const inputs = [
    {
        label:"Edit Item",
        type:"select",
        name:"editItem",
        values: [
            {value: "conferenceName", displayAs: "Conference Name"},
            {value: "abbrevation", displayAs: "Abbreviation"},
            {value: "shortDescription", displayAs: "Short Description"},
            {value: "description", displayAs: "Description"},
            {value: "location", displayAs: "Location"},
            {value: "startDate", displayAs: "Start Date"},
            {value: "startTime", displayAs: "Start Time"},
            {value: "endDate", displayAs: "End Date"},
            {value: "endTime", displayAs: "End Time"},
            {value: "paperSubmissionAmount", displayAs: "Paper Submission Amount"},
        ],
        disabled: true
    },
    {
        label:"Description",
        type:"text",
        name:"description",
        disabled: true
    },
    {
        label:"New Value",
        type:"textarea",
        name:"newValue",
        disabled: true
    },
    {
        label:"Status",
        type:"select",
        name:"status",
        values: [
            {value: "pending", displayAs: "Pending"},
            {value: "approved", displayAs: "Approved"},
            {value: "rejected", displayAs: "Rejected"},
        ]
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
        type: "cancel"
    },
];

const Edits = ({baseUrl}) => {
    // API URLs
    const url = `${baseUrl}/edits`;
    const infoUrl = `${baseUrl}/info`;
    // State for the current edit to modify
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/edits");
    }

    return (
        <div>
            <Route exact path="/edits">
                <Tables
                    url={url} title={"Edits"}
                    columns={columnsEdits}
                    type={"edits"}
                    setEditData={setEditData}
                    disableAdd
                />
                <Tables
                    url={infoUrl} title={"Event Info"}
                    columns={columnsSettings}
                    type={"event-info"}
                    disableAdd
                />
            </Route>

            {/*Edit Path*/}
            <Route path="/edits/edit">
                <FormHolder
                    title={"Manage Edit"}
                    formTitle={"Edits Information"}
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

export default Edits;