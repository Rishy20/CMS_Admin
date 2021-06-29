import React, {useState} from "react";
import {Route, useHistory} from "react-router-dom";
import Tables from "../Tables";
import TrackForm from "../TrackForm";

// Columns for the table
const columns = [
    {
        name: "Track Name",
        id: "name",
        type: "text"
    },
    {
        name: "Actions",
        id: "action",
        type: "actions"
    }
]

const Tracks = ({baseUrl}) => {
    // API URL
    const url = `${baseUrl}/tracks`;
    // State for the current track to edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/tracks");
    }

    return (
        <div>
            <Route exact path="/tracks">
                <Tables
                    url={url}
                    title={"Tracks"}
                    columns={columns}
                    type={"tracks"}
                    setEditData={setEditData}
                />
            </Route>

            {/*Add Path*/}
            <Route path="/tracks/add">
                <TrackForm
                    url={url}
                    title="Add Track"
                    formTitle="Track Information"
                    callback={toLink}
                />
            </Route>

            {/*Edit Path*/}
            <Route path="/tracks/edit">
                <TrackForm
                    url={url}
                    title="Edit Track"
                    formTitle="Track Information"
                    update
                    originData={editData}
                    callback={toLink}
                />
            </Route>
        </div>
    )
}

export default Tracks;