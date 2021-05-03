import React, {useState} from 'react';
import Title from '../Title';
import Formbox from "../Formbox";

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
        label:"Conducted by",
        type:"text",
        name:"conductor"
    },
    {
        label:"Venue",
        type:"text",
        name:"venue"
    },
    {
        label:"Start Time",
        type:"time",
        name:"start",
    },

    {
        label:"End Time",
        type:"time",
        name:"end",
    },
    {
        label:"Status",
        type:"select",
        name:"status",
        values:["Pending", "approved"]
    }
    // {
    //     label:"Pending",
    //     type:"radio",
    //     name:"pending"
    // },
    // {
    //     label:"Approved",
    //     type:"radio",
    //     name:"pending"
    // }

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
    ename:'',
    description:'',
    conductor:'',
    venue:'',
    start:'',
    end:'',
    status:'',
}

const url = "http://localhost:3000/api/v1/researchers";
function CreateEvent(){
    const[isSubmitted,setIsSubmitted] = useState(false);

    function submitForm(){
        setIsSubmitted(true);
        console.log("Form Submitted")
    }

    return (
        <div>
            <Title text="Create an Event"/>
            <Formbox title="Event Information" input={inputs} buttons={buttons} names={names} callback={submitForm} url={url}/>
        </div>
    )
}

export default CreateEvent;