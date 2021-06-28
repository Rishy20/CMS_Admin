import React, {useEffect, useState} from "react";
import {Route, useHistory} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

const columns=[
    {
        name:"Date",
        id:"date",
        type:"text"
    },
    {
        name:"Start Time",
        id:"startTime",
        type:"text"
    },
    {
        name:"End Time",
        id:"endTime",
        type:"text"
    },
    {
        name:"Day",
        id:"dayNumber",
        type:"text"
    },
    {
        name:"Event Type",
        id:"type",
        type:"text"
    },
    {
        name:"Event Name",
        id:"name",
        type:"text"
    },
    {
        name:"Status",
        id:"status",
        type:"text",
        statusStyle: true
    },
    {
        name:"Actions",
        id:"action",
        type:"actions",
        disableEditOn: [
            {column: "status", value: "approved"},
            {column: "status", value: "rejected"}
        ]
    }
]

//Inputs stored as an array so they can be mapped to Input component
const inputs = [
    {
        label:"Day Number",
        type:"number",
        name:"dayNumber",
        disabled: true
    },
    {
        label:"Date",
        type:"date",
        name:"date",
        disabled: true
    },
    {
        label:"Start Time",
        type:"time",
        name:"startTime",
        disabled: true
    },
    {
        label:"End Time",
        type:"time",
        name:"endTime",
        disabled: true
    },
    {
        label:"Event Name",
        type:"text",
        name:"name",
        disabled: true
    },
    {
        label:"Event Type",
        type:"select",
        name:"type",
        values:["Research Proposal", "Workshop", "Keynote"],
        disabled: true
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
        type: "cancel",
    },
]

const Agenda = props => {
    // API URL
    const url = `${props.baseUrl}/events`;

    // State for the current product in edit
    const [editData, setEditData] = useState(null);

    // State for 'workshop' input field
    const [researcherInput, setResearcherInput] = useState({
        label:"Researcher",
        type:"select",
        name:"researcher",
        values:[],
        hidden: true,
        disabled: true,
    });

    // State for 'workshop' input field
    const [workshopInput, setWorkshopInput] = useState({
        label:"Workshop",
        type:"select",
        name:"workshop",
        values:[],
        hidden: true,
        disabled: true,
    });

    // State for 'workshop' input field
    const [keynoteInput, setKeynoteInput] = useState({
        label:"Keynote",
        type:"select",
        name:"keynote",
        values:[],
        hidden: true,
        disabled: true,
    });

    // Status input
    const status = {
        label:"Status",
            type:"select",
        name:"status",
        values: [
            {value: "pending", displayAs: "Pending"},
            {value: "approved", displayAs: "Approved"},
            {value: "rejected", displayAs: "Rejected"},
        ]
    }

    const history = useHistory();

    const toLink = () => {
        history.push("/events");
        reset();
    }

    // Get option values for selector input fields
    useEffect(() => {
        // Get approved researchers to assign as option values for researcher selector
        fetch(`${props.baseUrl}/researchers/approved`)
            .then(data => data.json())
            .then(data => setResearcherInput({
                ...researcherInput,
                // For each workshop, set workshop id as input value and workshop name as display value
                values: data.map(researcher => ({
                    value: researcher._id, displayAs: `${researcher.fname} ${researcher.lname}`
                }))
            }));

        // Get approved workshops to assign as option values for workshop selector
        fetch(`${props.baseUrl}/workshops/approved`)
            .then(data => data.json())
            .then(data => setWorkshopInput({
                ...workshopInput,
                // For each workshop, set workshop id as input value and workshop name as display value
                values: data.map(workshop => ({value: workshop._id, displayAs: workshop.workshopName}))
            }));

        // Get keynote speakers to assign as option values for keynote selector
        fetch(`${props.baseUrl}/keynotes`)
            .then(data => data.json())
            .then(data => setKeynoteInput({
                ...keynoteInput,
                // For each keynote, set keynote id as input value and keynote name as display value
                values: data.map(keynote => ({
                    value: keynote._id, displayAs: `${keynote.fname} ${keynote.lname}`
                }))
            }));
    }, []);

    // Handle displaying dynamic input fields according to selected event type
    const handleDynamicInputField = event => {
        const {name, value} = event.target;

        // Show 'researcher' input only if 'Research Proposal' is selected for 'Event Type'
        if (name === "type" && value === "Research Proposal") {
            setResearcherInput({...researcherInput, hidden: false});
        } else if (name === "type" && value !== "Research Proposal") {
            setResearcherInput({...researcherInput, hidden: true});
        }

        // Show 'workshop' input only if 'Workshop' is selected for 'Event Type'
        if (name === "type" && value === "Workshop") {
            setWorkshopInput({...workshopInput, hidden: false});
        } else if (name === "type" && value !== "Workshop") {
            setWorkshopInput({...workshopInput, hidden: true});
        }

        // Show 'keynote' input only if 'Keynote' is selected for 'Event Type'
        if (name === "type" && value === "Keynote") {
            setKeynoteInput({...keynoteInput, hidden: false});
        } else if (name === "type" && value !== "Keynote") {
            setKeynoteInput({...keynoteInput, hidden: true});
        }
    }

    // Handle displaying 'researcher', 'workshop' and 'keynote' input field according to selected 'editData'
    useEffect(() => {
        if (editData && editData.type === "Research Proposal") {
            setResearcherInput({...researcherInput, hidden: false});
        } else if (editData && editData.type === "Workshop") {
            setWorkshopInput({...workshopInput, hidden: false});
        } else if (editData && editData.type === "Keynote") {
            setKeynoteInput({...keynoteInput, hidden: false});
        }
    }, [editData]);

    // Reset values
    const reset = () => {
        setResearcherInput({...researcherInput, hidden: true});
        setWorkshopInput({...workshopInput, hidden: true});
        setKeynoteInput({...keynoteInput, hidden: true});
    }

    return (
        <div>

            <Route exact path="/events">
                <Tables
                    url={url}
                    title="Agenda"
                    columns={columns}
                    type="events"
                    setEditData={setEditData}
                    sortBy="date"
                    disableAdd
                />
            </Route>
            {/*Edit Path*/}
            <Route path="/events/edit">
                <FormHolder
                    title={"Edit Event"}
                    formTitle={"Event Information"}
                    inputs={[...inputs, researcherInput, workshopInput, keynoteInput, status]}
                    buttons={buttons}
                    names={editData}
                    callback={toLink}
                    onChangeCallback={handleDynamicInputField}
                    url={`${url}/${editData?editData._id:""}`}
                    method={"PUT"}
                />
            </Route>

        </div>

    )
}

export default Agenda;