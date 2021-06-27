import React, {useState} from "react";
import Tables from "../Tables";

// Columns for the table
const columns = [
    {
        name: "Workshop Name",
        id: "workshopName",
        type: "text"
    },
    {
        name: "Presenter",
        id: "presentersName",
        type: "text"
    },
    {
        name: "Proposal",
        id: "proposal",
        type: "link"
    },
    {
        name:"Actions",
        type: "approve"
    }

]

const WorkshopReviews = ({baseUrl,userId,status}) => {

// Columns for the table
    const columns = [
        {
            name: "Workshop Name",
            id: "workshopName",
            type: "text"
        },
        {
            name: "Presenter",
            id: "presentersName",
            type: "text"
        },
        {
            name: "Proposal",
            id: "proposal",
            type: "link"
        },
        status.toLowerCase()==="pending" &&
        {
            name:"Actions",
            type: "approve"
        }

    ]

    // API URL
    const url = `${baseUrl}/workshops`;
    return (
        <div>
            <Tables
                url={url}
                title={`${status} Workshops`}
                columns={columns}
                type={"workshopReview"}
                reviewerId={userId}
                disableAdd
                status={status.toLowerCase()}
            />
        </div>

    )
}

export default WorkshopReviews;