import React from "react";

export default function LoaderPage({ transparent = true, size }) {
  const getsize = () => {
    switch (size) {
      case "":
        return "";
      case "md":
        return "md";
      case "xs":
        return "xs";
      default:
        return "";
    }
  };
  return (
    <div
      className={`full-spinner ${
        !transparent ? "background-load" : ""
      } ${getsize()}`}
    >
      <div className="loadingio-spinner-ripple">
        <div className="ldio">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
