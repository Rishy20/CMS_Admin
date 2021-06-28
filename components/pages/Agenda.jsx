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
        name:"Time",
        id:"time",
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
        name:"Actions",
        id:"action",
        type:"actions"
    }
]

//Inputs stored as an array so they can be mapped to Input component
const inputs = [
    {
        label:"Day Number",
        type:"number",
        name:"dayNumber"
    },
    {
        label:"Date",
        type:"date",
        name:"date"
    },
    {
        label:"Time",
        type:"time",
        name:"time"
    },
    {
        label:"Event Name",
        type:"text",
        name:"name",
    },
    {
        label:"Event Type",
        type:"select",
        name:"type",
        values:["Research Proposal", "Workshop", "Keynote"]
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
//Input box names used in the form so that they can be sent to useForm hook to maintain the state
const names = {
    dayNumber: '',
    date: '',
    time: '',
    name: '',
    type: '',
    researcher: '',
    workshop: '',
}

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
            hidden: true
        });

    // State for 'workshop' input field
    const [workshopInput, setWorkshopInput] = useState({
            label:"Workshop",
            type:"select",
            name:"workshop",
            values:[],
            hidden: true
        });

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
    }, []);

    // Handle displaying 'workshop' input field
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
    }

    // Handle displaying 'researcher' and 'workshop' input field according to selected 'editData'
    useEffect(() => {
        if (editData && editData.type === "Research Proposal") {
            setResearcherInput({...researcherInput, hidden: false});
        } else if (editData && editData.type === "Workshop") {
            setWorkshopInput({...workshopInput, hidden: false});
        }
    }, [editData]);

    // Reset values
    const reset = () => {
        setResearcherInput({...researcherInput, hidden: true});
        setWorkshopInput({...workshopInput, hidden: true});
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
                    readOnly={props.role === "admin"}
                    disableAdd={props.role === "admin"}
                />
            </Route>
            {/*Add Path*/}
            <Route path="/events/add">
                <FormHolder
                    title={"Add Event"}
                    formTitle={"Event Information"}
                    inputs={[...inputs, researcherInput, workshopInput]}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    onChangeCallback={handleDynamicInputField}
                    url={url}
                    method={"POST"}
                />
            </Route>
            {/*Edit Path*/}
            <Route path="/events/edit">
                <FormHolder
                    title={"Edit Event"}
                    formTitle={"Event Information"}
                    inputs={[...inputs, researcherInput, workshopInput]}
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