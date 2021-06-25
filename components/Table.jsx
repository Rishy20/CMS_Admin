import React, {useState} from 'react';
import './Table.css';
import TableRow from "./pages/TableRow";
function Table(){
    return <div>
        <table className={'table'}>
            <thead>

                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                   <TableRow fname ={'Charitha'} lname={'Attalage'} email={'charitha-Attalage@gmail.com'} contact={'0714218825'}/>
            </tbody>
        </table>
    </div>

}
export default Table;