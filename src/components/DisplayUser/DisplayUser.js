import { useContext } from "react"
import { UserContext } from "../../contexts/userContext"
import { ToastContext } from "../../services/toastContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";
import { NavDropdown } from "react-bootstrap";

export default function DisplayUser() {

    const [user, setUser] = useContext(UserContext);
    const {showToast, setShowToast} = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();
    const {logOutCart} = useContext(CartContext);

    return (
        <>
            {user ? <>
                        <NavDropdown title={<span>{user.lastName} {user.firstName} {user.isAdmin ? "(admin)" : ""}</span>}>
                            <NavDropdown.Item className="dropdown-text" as={NavLink} to="/profil">Profil</NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-text" as={NavLink} to="/megrendelesek">Rendeléseim</NavDropdown.Item>
                            <NavDropdown.Item><button className="btn btn-danger" onClick={logout}>Kijelentkezés</button></NavDropdown.Item>
                        </NavDropdown>
                    </>
                    : 
                    <span>{"Nem vagy bejelentkezve"}</span>}
        </>
            
    )

    function logout() {
        setUser(null)
        localStorage.removeItem("refreshToken")
        setShowToast({
            show: true,
            message: "Sikeres kijelentkezés",
            type: "success"
        })
        logOutCart();
        if(location.pathname === "/profil" || location.pathname === "/megrendelesek" || location.pathname.includes("/admin")) {
            navigate("/")
        }
    }
}