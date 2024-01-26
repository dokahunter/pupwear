import React from "react";
import { Link } from "react-router-dom";

const MailTo = ({ mailto, label }) => {
    return (
        <Link
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
        >
            {label}
        </Link>
    );
};

export default MailTo;