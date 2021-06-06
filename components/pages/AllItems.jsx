import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Tables from "../Tables";

const usersBasic = [
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
        name:"Phone",
        id:"contact",
        type:"text"
    }
];

const usersExtra = [
    {
        name:"Country",
        id:"country",
        type:"text"
    }
];

const regTypeSelect = ["attendees", "presenters", "researchers"];

const AllItems = ({type, baseUrl}) => {
    // Table states
    const [columns, setColumns] = useState([]);
    const [url, setUrl] = useState("");

    // Registration type state | used only if type is 'registrations'
    const [regType, setRegType] = useState("");
    // useLocation hook for getting registration type state
    const location = useLocation();

    // If type is 'registrations', set URL and other values according to registration type state
    useEffect(() => {
        if (type === "registrations") {
            if (location.state) {
                setRegType(location.state.regType);
                console.log(location.state.regType);
            } else {
                setRegType("attendees");
            }
        }
    }, [])

    // Set columns according to the type
    useEffect(() => {
        switch (type) {
            case "reviewers":
                setColumns(usersBasic);
                break;
            case "editors":
                setColumns(usersBasic);
                break;
            case "registrations":
                setColumns([...usersBasic, ...usersExtra]);
                break;
        }
    }, [type]);

    // Set URL according to base URL and item type
    useEffect(() => {
        // If type is 'registrations', Set URL according to registration type
        if (type === "registrations") {
            setUrl(`${baseUrl}/${regType}`);
        } else {
            setUrl(`${baseUrl}/${type}`);
        }
    }, [type, regType]);

    return (
        <>
            {type === "registrations" &&
                false
            }

            <Tables
                url={url}
                title={type}
                columns={columns}
                type={type}
                readOnly
                selector={type === "registrations"}
                selectValues={regTypeSelect}
                selectValue={regType}
                selectCallback={event => setRegType(event.target.value)}
            />
        </>
    );
}

export default AllItems;