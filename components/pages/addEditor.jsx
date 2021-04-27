import React from 'react';
import Title from '../Title';
import Formbox from "../FormBox";

//Inputs in the form
const inputs=[
    {
        label:"First Name",
        type:"text",
        placeholder:"Enter your first name",
        id:"fname"
    },
    {
        label:"Last Name",
        type:"text",
        placeholder:"Enter your last name",
        id:"lname"
    },
    {
        label:"Gender",
        type:"radio",
        value:"Male",
        id:"gender"
    },
    {
        label:"Email",
        type:"email",
        placeholder:"Enter your Email",
        id:"email"
    },
    {
        label:"Password",
        type:"password",
        placeholder:"Enter your Password",
        id:"password"
    },
    {
        label:"Contact Number",
        type:"text",
        placeholder:"Enter your Contact Number",
        id:"contact"
    },
    {
        label:"City",
        type:"text",
        placeholder:"Enter your city",
        id:"city"
    }

]

function addEditor(){
    return (
        <div>
            <Title text="Editor" />
            <Formbox title="Add Editor" input={inputs} />
        </div>
    )
}

export default addEditor;