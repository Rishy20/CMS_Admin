import React, {useEffect, useState} from "react";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

const url = "http://localhost:3000/api/v1/workshops";

const columns=[
    {
        name:"Start Date",
        id:"sdate",
        type:"date"
    },
    {
        name:"Start Time",
        id:"stime",
        type:"time"
    },
    {
        name:"End Date",
        id:"edate",
        type:"date"
    },
    {
        name:"End Time",
        id:"etime",
        type:"time"
    },
    {
        name:"Event Type",
        id:"type",
        type:"select"
    },
    {
        name:"Event",
        id:"event",
        type:"select"
    },

]

//Inputs stored as an array so they can be mapped to Input component
const inputs=[

    {
        label:"Start Date",
        type:"date",
        name:"sdate"
    },
    {
        label:"Start Time",
        type:"time",
        name:"stime"
    },
    {
        label:"End Date",
        type:"date",
        name:"edate"
    },
    {
        label:"End Time",
        type:"time",
        name:"etime"
    },
    {
        label:"Event Type",
        type:"select",
        name:"type",
        values:["Research paper submission","Workshop"]
    },
    {
        label:"Event",
        type:"select",
        name:"event"
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
    },
]
//Input box names used in the form so that they can be sent to useForm hook to maintain the state
const names={
    sdate:'',
    stime:'',
    edate:'',
    etime:'',
    type:'',
    event:'',
}

const Agenda = () => {


    // State for the current product in edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/Agenda");
    }

    return (
        <div>

            <Route exact path="/Agenda">
                <Tables url={url} title={"Agenda"} columns={columns} type={"Agenda"} setEditData={setEditData}/>
            </Route>
            {/*Add Path*/}
            <Route path="/Agenda/add">
                <FormHolder
                    title={"Add Agenda"}
                    formTitle={"Agenda Information"}
                    inputs={inputs}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    url={url}
                    method={"POST"}
                />
            </Route>
            {/*Edit Path*/}
            <Route path="/Agenda/edit">
                <FormHolder
                    title={"Edit Agenda"}
                    formTitle={"Agenda Information"}
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

export default Agenda;