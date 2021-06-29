import React, {useState} from "react";
import {Route, useHistory} from "react-router-dom";
import Tables from "../Tables";
import SponsorForm from "../SponsorForm";

// Columns for the table
const columns = [
    {
        name: "Sponsor Name",
        id: "name",
        type: "text"
    },
    {
        name: "Actions",
        id: "action",
        type: "actions"
    }
]

const Sponsors = ({baseUrl}) => {
    // API URL
    const url = `${baseUrl}/sponsors`;
    // State for the current sponsor to edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/sponsors");
    }

    return (
        <div>
            <Route exact path="/sponsors">
                <Tables
                    url={url}
                    title={"Sponsors"}
                    columns={columns}
                    type={"sponsors"}
                    setEditData={setEditData}
                />
            </Route>

            {/*Add Path*/}
            <Route path="/sponsors/add">
                <SponsorForm
                    url={url}
                    title="Add Sponsor"
                    formTitle="Sponsor Information"
                    callback={toLink}
                />
            </Route>

            {/*Edit Path*/}
            <Route path="/sponsors/edit">
                <SponsorForm
                    url={url}
                    title="Edit Sponsor"
                    formTitle="Sponsor Information"
                    update
                    originData={editData}
                    callback={toLink}
                />
            </Route>
        </div>
    )
}

export default Sponsors;