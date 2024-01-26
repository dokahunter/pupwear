import { useState, useEffect } from "react";
import "./emailInput.css"

export default function EmailInput(props) {
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [email, setEmail] = useState("");

    useEffect(() => {
        props.getEmail(email)
    }, [email])

    return (
        <div className="col-md-6 mx-auto p-2">
            <div className=" form-floating mb-1 has-validation"> 
                <input type="email" value={email} onChange={typeEmail} onBlur={validateEmail}
                className= {`form-control ${invalidEmail && "is-invalid"}`} placeholder="name@example.com"
                id="floatingInput"
                ></input>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            {invalidEmail && <div id="invalid-email-message">Az e-mail cím nem megfelelő</div>}                    
        </div>
    )

    function typeEmail(e) {
        setEmail(e.target.value)
    }

    function validateEmail() {
        if (!/\S+@\S+\.\S+/.test(email)) {
            setInvalidEmail(true)
        } else {
            setInvalidEmail(false)
        }
    }



}