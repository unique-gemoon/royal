import React from "react";

export default function RadioButton({
  name,
  onChange,
  options = [],
  value = false,
  id = "",
  disabled,
  ...props
}) {
  return (
    <div className={props.className}>
      <div className="bloc-radios-button">
        {options.map((radio, key) => (
          <div className="radio-button-form" key={key}>
            <input
              type={"radio"}
              name={name}
              checked={radio.value == value}
              disabled={disabled}
              onChange={(e) => {
                if (e.target.checked) onChange(radio);
              }}
              id={`${radio.value}_${key}`}
            />
            <label htmlFor={`${radio.value}_${key}`}>{radio.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
