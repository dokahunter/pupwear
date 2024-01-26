import { useEffect, useState } from "react";

export default function PasswordInput(props) {
    const [password, setPassword] = useState("");

    useEffect(() => {
        props.getPassword(password)
    }, [password])

    return(
        <div className="col-md-6 mx-auto p-2"> 
            <div className="form-floating mb-1"> 
                <input type="password" value={password} onChange={typePassword}
                className="form-control" id="floatingPassword" placeholder="Password"
                ></input>
                <label htmlFor="floatingPassword">Password</label>
            </div>
        </div>
    )

    function typePassword(e) {
        setPassword(e.target.value)
    }
}