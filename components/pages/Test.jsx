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
    }

]
function Test(){
    return (
        <div>
            <Title text="Test" />
            <Formbox title="Test Information" input={inputs} />
        </div>
    )
}

export default Test;