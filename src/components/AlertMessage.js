import React from "react";
export default function AlertMessage(props) {
  return (
    <div
      className={`d-flex align-items-center p-2 ${props.alertMessage ? "mt-0" :"mt-2"}`}
      style={{
        border: "2px solid #fb9494",
        background: "#fddee494",
        borderRadius: "5px",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="currentColor"
        className="bi bi-info-circle text-danger"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
      <small
        className="form-text mt-0 ms-1 fw-semibold "
        style={{ color: "#dc3545" }}
      >
        { props.alertMessage ? props.alertMessage : `Please enter the ${props.validString} value for the above field`}
      </small>
    </div>
  );
}

