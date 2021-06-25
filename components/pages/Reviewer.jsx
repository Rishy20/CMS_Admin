import React, {useEffect, useState} from "react";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

const url = "https://icaf-deploy.herokuapp.com/api/v1/reviewers";

const columns=[
    {
        name:"First Name",
        id:"fname",
        type:"text"
    },
    {
        name:"Last Name",
        id:"lname",
        type:"text"
    },

    {
        name:"Email",
        id:"email",
        type:"text"
    },
    {
        name:"Contact",
        id:"contact",
        type:"text"
    },
    {
        name:"Actions",
        id:"action",
        type:"actions"
    }
]


//Inputs stored as an array so they can be mapped to Input component
const inputsAdd=[
    {
        label:"First Name",
        type:"text",
        name:"fname"
    },
    {
        label:"Last Name",
        type:"text",
        name:"lname"
    },
    {
        label:"Email",
        type:"email",
        name:"email"
    },
    {
        label:"Contact",
        type:"tel",
        name:"contact"
    },


    {
        label:"Password",
        type:"password",
        name:"password",

    },
    {
        label:"Confirm Password",
        type:"password",
        name:"confirmPassword",

    },
    {
        label:"Country",
        type:"select",
        name:"country",
        values:["Sri Lanaka","India","USA"]

    },

]
const inputsEdit=[
    {
        label:"First Name",
        type:"text",
        name:"fname"
    },
    {
        label:"Last Name",
        type:"text",
        name:"lname"
    },
    {
        label:"Email",
        type:"email",
        name:"email"
    },
    {
        label:"Contact",
        type:"tel",
        name:"contact"
    },

    {
        label:"Country",
        type:"select",
        name:"country",
        values:["Sri Lanaka","India","USA"]

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
    },
]
//Input box names used in the form so that they can be sent to useForm hook to maintain the state
const names={
    fname:'',
    lname:'',
    email:'',
    contact:'',
    password:'',
    country:'',
    confirmPassword:'',

}



const Reviewer = () => {


    // State for the current product in edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/reviewers");
    }

    return (
        <div>

            <Route exact path="/reviewers">
                <Tables url={url} title={"All Reviewers"} columns={columns} type={"reviewers"} setEditData={setEditData}/>
            </Route>
            {/*Add Path*/}
            <Route path="/reviewers/add">
                <FormHolder
                    title={"Add Reviewer"}
                    formTitle={"Reviewer Information"}
                    inputs={inputsAdd}
                    buttons={buttons}
                    names={names}
                    callback={toLink}
                    url={url}
                    method={"POST"}
                />
            </Route>
            {/*Edit Path*/}
            <Route path="/reviewers/edit">
                <FormHolder
                    title={"Edit Reviewer"}
                    formTitle={"Reviewer Information"}
                    inputs={inputsEdit}
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

export default Reviewer;