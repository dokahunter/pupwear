import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "./services/toastContext";
import Toast from "./components/Toast/Toast";
import userService from "./services/user-service";
import { UserContext } from "./contexts/userContext";
import Footer from "./components/Footer/Footer";

export default function Layout() {
    const [showToast,setShowToast] = useState({
        show: false,
        message:"",
        type:""
    });

    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        if (localStorage.getItem("refreshToken")) {
            userService.getIDToken()
            .then(resp => resp.json())
            .then(json => userService.getUserByID(json.user_id))
            .then(user => setUser(user))
        } else setUser(null)
      }, [])

    return(
        <div className="d-flex flex-column vh-100 main-style">
            <ToastContext.Provider value={{showToast: showToast, setShowToast: setShowToast}}>
                <nav><Navbar /></nav>
                <main className="flex-grow-1">
                        <Outlet />
                        <Toast />
                </main>
            </ToastContext.Provider>
            <Footer />
        </div>
    )
}