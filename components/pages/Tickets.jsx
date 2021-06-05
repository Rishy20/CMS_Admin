import React, {useState} from 'react';
import Title from '../Title';
import Formbox from "../Formbox";
import {Route, useHistory} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

const url = "http://localhost:3000/api/v1/tickets";

const columns=[
    {
        name:"Name",
        id:"name",
        type:"text"
    },
    {
        name:"Price",
        id:"price",
        type:"number"
    },
    {
        name:"Description",
        id:"description",
        type:"text"
    },
    {
        name:"Quantity",
        id:"qty",
        type:"number"
    }
]

const inputs=[
    {
        label:"Name",
        type:"text",
        name:"type",
    },
    {
        label:"Price",
        type:"number",
        name:"price",
    },
    {
        label:"Description",
        type:"text",
        name:"description",
    },
    {
        label:"Quantity",
        type:"number",
        name:"qty",
    }
]
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
const names={
    name:'',
    description:'',
    price:'',
    qty:'',
}
const Tickets = () => {


    // State for the current product in edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/tickets");
    }

    return (
        <div>

            <Route exact path="/tickets">
                <Tables url={url} title={"All Tickets"} columns={columns} type={"tickets"} setEditData={setEditData}/>
            </Route>
            {/*Add Path*/}
            <Route path="/tickets/add">
                <FormHolder
                    title={"Add Ticket"}
                    formTitle={"Ticket Information"}
                    inputs={inputs}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    url={url}
                    method={"POST"}
                />
            </Route>
            {/*Edit Path*/}
            <Route path="/tickets/edit">
                <FormHolder
                    title={"Edit Tickets"}
                    formTitle={"Ticket Information"}
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

export default Tickets;