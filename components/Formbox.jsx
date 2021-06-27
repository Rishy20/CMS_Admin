import React from "react";
import './styles/FormBox.css'
import Form from "./Form";


//Formbox in admin menu
function Formbox(props){
    const inputs= props.input;
    const names = props.names;
    const callback = props.callback;
    const buttons = props.buttons;
    const url = props.url;
    const method = props.method;
    const adminUserUpdate = props.adminUserUpdate;

    return(

        <div className='formbox'>
            <div className="form-top">
                <h3 className="form-title">{props.title}</h3>
                <span className="top-btn">
                    {/*<Button btnStyle="btn-save" name="Save Changes" onclick={handleSubmit} />*/}
                    {/*<Button name="Cancel" btnStyle="btn-cancel"/>*/}
                </span>
            </div>

            <div className="form-body">
                <Form
                    inputs={inputs}
                    names={names}
                    callback={callback}
                    btns={buttons}
                    btnstyle="top"
                    url={url}
                    method={method}
                    adminUserUpdate={adminUserUpdate}
                />
            </div>
        </div>
    )
}
export default Formbox;