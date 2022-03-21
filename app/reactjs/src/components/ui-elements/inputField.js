import React from "react";
import {
    InputDef, GroupInput,
} from "../../assets/styles/componentStyle";

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

export default function InputField({
    label,
    name,
    onChange,
    onKeyDown = () => { },
    value = "",
    type,
    id,
    subtitle = "",
    className = "",
    required,
    error = false,
    errorMessage = "",
    state,
    setState = () =>{},
    ...props
}) {
    return (
        <GroupInput className={error ? `form-error ${className}` : `${className}`}>

            <InputDef className={required ? "is-requered" : ""} type={type} id={id} name={name} label={label} variant="outlined" defaultValue={value} onChange={onChange} fullWidth />

            {errorMessage ? (
                <div className="error-message"><AddCircleOutlinedIcon onClick={() => setState({...state, errorMessage: "", error: false})} /> <span>{errorMessage}</span></div>
            ) : null}
        </GroupInput>
    );
}
