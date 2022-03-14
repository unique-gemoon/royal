import React from "react";
import {
    InputDef, GroupInput,
} from "../../assets/styles/componentStyle";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
    messageField,
    setMessageField = () => { },

    ...props
}) {
    console.log(messageField)
    return (
        <GroupInput className={error ? `form-error ${className}` : `${className}`}>

            <InputDef className={required ? "is-requered" : ""} type={type} id={id} name={name} label={label} variant="outlined" defaultValue={value} onChange={onChange} fullWidth />

            {errorMessage ? (
                <span className="error-message"><HighlightOffIcon onClick={() => setMessageField(error)} /> {errorMessage}</span>
            ) : null}
        </GroupInput>
    );
}
