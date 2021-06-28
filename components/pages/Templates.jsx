import React, {useState} from "react";
import {Route, useHistory} from "react-router-dom";
import Tables from "../Tables";
import FormHolder from "../FormHolder";
import TemplateForm from "../TemplateForm";

// Columns for the table
const columns = [
    {
        name: "Template Name",
        id: "name",
        type: "text"
    },
    {
        name: "Actions",
        id: "action",
        type: "actions"
    }
]

const Templates = ({baseUrl}) => {
    // API URL
    const url = `${baseUrl}/templates`;
    // State for the current template to edit
    const [editData, setEditData] = useState(null);

    const history = useHistory();

    const toLink = () => {
        history.push("/templates");
    }

    return (
        <div>
            <Route exact path="/templates">
                <Tables
                    url={url}
                    title={"Templates"}
                    columns={columns}
                    type={"templates"}
                    setEditData={setEditData}
                />
            </Route>

            {/*Add Path*/}
            <Route path="/templates/add">
                <TemplateForm
                    url={url}
                    title="Add Template"
                    formTitle="Template Information"
                    callback={toLink}
                />
            </Route>

            {/*Edit Path*/}
            <Route path="/templates/edit">
                <TemplateForm
                    url={url}
                    title="Edit Template"
                    formTitle="Template Information"
                    update
                    originData={editData}
                    callback={toLink}
                />
            </Route>
        </div>
    )
}

export default Templates;