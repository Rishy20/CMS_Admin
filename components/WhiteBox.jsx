import React, {useState} from 'react';
import Table from "./Table";

const styles ={
    backgroundColor: 'white',
    margin: '20px 20px 20px 0px',
    borderRadius: '10px',
    height: '100%',
    padding:'30px'
}

function WhiteBox() {

    return <div style={styles}>
            <Table/>
    </div>
}
export default WhiteBox;



