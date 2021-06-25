import React, {useState} from 'react';


function TableRow(props){

    return <tr>
        <td>{props.fname}</td>
        <td>{props.lname}</td>
        <td>{props.email}</td>
        <td>{props.contact}</td>
    </tr>
}
export default TableRow