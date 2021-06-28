import React, {useState} from "react";
import {Route, useHistory} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";
import KeynoteForm from "../KeynoteForm";

// Columns for the table
const columns = [
    {
        name: "First Name",
        id: "fname",
        type: "text"
    },
    {
        name: "Last Name",
        id: "lname",
        type: "text"
    },
    {
        name: "Job Title",
        id: "jobTitle",
        type: "text"
    },
    {
        name: "Company",
        id: "company",
        type: "text"
    },
    {
        name: "Country",
        id: "country",
        type: "text"
    },
    {
        name: "Actions",
        id: "action",
        type: "actions"
    }
]

const KeynoteSpeakers = ({baseUrl}) => {
    // API URL
    const url = `${baseUrl}/keynotes`;
    // State for the current keynote to edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/keynotes");
    }

    return (
        <div>
            <Route exact path="/keynotes">
                <Tables
                    url={url}
                    title={"Keynotes"}
                    columns={columns}
                    type={"keynotes"}
                    setEditData={setEditData}
                />
            </Route>

            {/*Add Path*/}
            <Route path="/keynotes/add">
                <KeynoteForm
                    url={url}
                    title="Add Keynote Speaker"
                    formTitle="Keynote Speaker Information"
                    callback={toLink}
                />
            </Route>

            {/*Edit Path*/}
            <Route path="/keynotes/edit">
                <KeynoteForm
                    url={url}
                    title="Edit Keynote Speaker"
                    formTitle="Keynote Speaker Information"
                    update
                    originData={editData}
                    callback={toLink}
                />
            </Route>
        </div>
    )
}

export default KeynoteSpeakers;