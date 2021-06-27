import React, {useState} from "react";
import Tables from "../Tables";



const PaperReviews = ({baseUrl,userId,status}) => {

    // Columns for the table
    const columns = [
        {
            name: "Title",
            id: "paper",
            type: "link"
        },
        {
            name: "Author",
            id: "fullName",
            type: "fullName"
        },
        status.toLowerCase()==="pending" &&
        {
            name:"Actions",
            type: "approve"
        }
    ]

    // API URL
    const url = `${baseUrl}/researchers`;
    return (
        <div>
            <Tables
                url={url}
                title={`${status} Papers`}
                columns={columns}
                type={"paperReview"}
                reviewerId={userId}
                disableAdd
                status={status.toLowerCase()}
            />
        </div>

    )
}

export default PaperReviews;