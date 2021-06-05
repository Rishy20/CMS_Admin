import React, {useEffect, useState} from "react";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

const url = "http://localhost:3000/api/v1/generalsettings";

const columns=[
    {
        name:"Event Name",
        id:"ename",
        type:"text"
    },
    {
        name:"Description",
        id:"description",
        type:"text"
    },
    {
        name:"Venue",
        id:"venue",
        type:"text"
    },
    {
      name:"Event Type",
      id:"etype",
      type:"select"
    },
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
        name:"Status",
        id:"status",
        type:"select"
    }
]

//Inputs stored as an array so they can be mapped to Input component
const inputs=[
    {
        label:"Event Name",
        type:"text",
        name:"ename"
    },
    {
        label:"Description",
        type:"text",
        name:"description"
    },
    {
        label:"Venue",
        type:"text",
        name:"venue"
    },
    {
        label:"Event Type",
        type:"select",
        name:"etype",
        values:["Single Day","Multiple Days"]
    },
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
        label:"Status",
        type:"select",
        name:"status"
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
    ename:'',
    description:'',
    venue:'',
    etype:'',
    sdate:'',
    stime:'',
    edate:'',
    etime:'',
    status:'',
}

const GeneralSettings = () => {


    // State for the current product in edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/generalsettings");
    }

    return (
        <div>

            <Route exact path="/generalsettings">
                <Tables url={url} title={"General Settings"} columns={columns} type={"generalsettings"} setEditData={setEditData}/>
            </Route>
            {/*Add Path*/}
            <Route path="/generalsettings/add">
                <FormHolder
                    title={"Add General Settings"}
                    formTitle={"General Settings Information"}
                    inputs={inputs}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    url={url}
                    method={"POST"}
                />
            </Route>
            {/*Edit Path*/}
            <Route path="/generalsettings/edit">
                <FormHolder
                    title={"Edit General Settings"}
                    formTitle={"General Settings Information"}
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

export default GeneralSettings;