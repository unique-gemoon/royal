import React from "react";
import {
    InputDef, GroupInput, } from "../../assets/styles/componentStyle";

export default function InputField({
    label,
    name,
    onChange,
    onKeyDown = () => { },
    value= "",
    type,
    id,
    subtitle = "",
    className = "",
    required,
    error = false,
    errorMessage = "",
    ...props
}) {
    return (
        <GroupInput className={error ? `form-error ${className}` : `${className}`}>

            <InputDef className='input-soundage' type={type} id={id} name={name} label={label} variant="outlined" defaultValue={value}  onChange={onChange} fullWidth />
                    
            {errorMessage ? (
                <span className="error-message">{errorMessage}</span>
            ) : null}
        </GroupInput>
    );
}
