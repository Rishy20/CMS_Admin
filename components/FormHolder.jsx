import React, {useState} from 'react';
import Title from './Title';
import Formbox from "./Formbox";

function FormHolder(props){

    return (
        <div>
            <Title text={props.title}/>
            <Formbox title={props.formTitle} input={props.inputs} buttons={props.buttons} names={props.names} callback={props.callback} url={props.url} method={props.method}/>
        </div>
    )
}

export default FormHolder;