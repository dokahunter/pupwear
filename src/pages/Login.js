import { useContext, useState } from "react";
import EmailInput from "../components/EmailInput/EmailInput";
import PasswordInput from "../components/PasswordInput/PasswordInput";
import { UserContext } from "../contexts/userContext";
import  userService from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../services/toastContext";
import { NavLink } from "react-router-dom";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const {showToast,setShowToast}  = useContext(ToastContext);
    

    return (
        <>
        <div className=" mx-auto container text-center p-3 bg-light bg-gradient fill"> 
            <h1>Belépés</h1>
                <EmailInput value={email} getEmail={getEmail}/>
                <PasswordInput value={password} getPassword={getPassword}/>
            <div className ="row mx-auto p-2 col-md-6 container text-center gap-3">
                <button className="btn btn-outline-primary col" onClick={login}>Belépés</button>
                <NavLink to="/regisztracio">
                Ha még nincs fiókja, ide kattintva létrehozhat egyet.
                </NavLink>
            </div>
        </div>
        </>
    )

    function getEmail(email) {
        setEmail(email);
    }

    function getPassword(password) {
        setPassword(password)
    }

    function login() {
        userService.signIn(email, password)
        .then(authResp => {
            if(authResp.registered) {
                localStorage.setItem("refreshToken", `${authResp.refreshToken}`)
                userService.getUserByID(authResp.localId)
                .then(resp => setUser(resp))
                navigate("/")
                setShowToast({
                    show: true,
                    message: "Sikeres bejelentkezés",
                    type: "success"
                })
            }
        })
        .catch(err => {setShowToast({
            show: true,
            message: "Sikertelen bejelentkezés",
            type: "error"
        })})
    }
}