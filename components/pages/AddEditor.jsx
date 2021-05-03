import React, {useState} from 'react';
import Title from '../Title';
import Formbox from "../FormBox";

//Inputs in the form
const inputs=[
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
        label:"Gender",
        type:"select",
        name:"gender",
        values:["Male","Female","Other"]
    },
    {
        label:"Age",
        type:"text",
        name:"age",
        maxLength:3
    },
    {
        label:"Address",
        type:"text",
        name:"address"
    },
    {
        label:"NIC",
        type:"text",
        name:"nic",
        maxLength: 12
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
    gender:'',
    email:'',
    contact:'',
    address:'',
    age:'',
    nic:'',
}
//Form Submit Url
const url = "http://localhost:3000/api/v1/editors";
function AddEditor(){
    const[isSubmitted,setIsSubmitted] = useState(false);

    function submitForm(){
        setIsSubmitted(true);
        // console.log("Form Submitted")
    }

    return (
        <div>
            <Title text="Editors"/>
            <Formbox title="Editor Information" input={inputs} buttons={buttons} names={names} callback={submitForm} url={url}/>
        </div>
    )
}

export default AddEditor;