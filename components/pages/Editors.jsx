import React, {useEffect, useState} from "react";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";

const url = "http://localhost:3000/api/v1/editors";

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
        name:"Gender",
        id:"gender",
        type:"select"
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
        name:"First Name",
        id:"fname",
        type:"text"
    },
    {
        name:"First Name",
        id:"fname",
        type:"text"
    },
    {
        name:"First Name",
        id:"fname",
        type:"text"
    },

]