import userService from "../../services/user-service"
import { useState,useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContext } from "../../services/toastContext";
import "./registration.css"
export default function Registration () {
    const [errorMsg,setErrorMsg] = useState("");
    const [lastNameError,setLastNameError] = useState("");
    const [firstNameError,setFirstNameError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const {showToast,setShowToast}  = useContext(ToastContext);
    const [valid,setValid] =useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        firstName:"",
        lastName:""
    })
    const [users,setUsers] = useState([]);
    return(
        <div className=" mx-auto container text-center p-3 bg-light bg-gradient fill">
            <h1>Új fiók létrehozása</h1>
            <div className=" container-sm"> 
                <form>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-floating has-validation">
                                <input 
                                name="lastName" 
                                type="text" 
                                placeholder="Vezetéknév" 
                                className={`form-control ${lastNameError && "is-invalid"}`}
                                id="floatingLastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                /> <span className="invalidMsg">{lastNameError}</span> <br/>
                                <label for="floatingLastName" >Vezetéknév</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating has-validation">
                                <input 
                                name="firstName" 
                                type="text" 
                                placeholder="Keresztnév"
                                className={`form-control ${firstNameError && "is-invalid"}`}
                                id="floatingFirstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                /> <span className="invalidMsg">{firstNameError}</span> <br />
                                <label for="floatingFirstName">Keresztnév</label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2"> 
                        <div className="col-md">
                            <div className="form-floating has-validation">
                                <input 
                                name="email" 
                                type="text" 
                                placeholder="Email cím"
                                className={`form-control ${errorMsg && "is-invalid"}`}
                                id="floatingEmail"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                /> <span className="invalidMsg">{errorMsg}</span> < br/>
                                <label for="floatingEmail">Email cím</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating has-validation">
                                <input 
                                name="password" 
                                type="password" 
                                placeholder="Jelszó" 
                                className={`form-control ${passwordError && "is-invalid"}`}
                                id="floatingPassword"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                /> <span className="invalidMsg">{passwordError}</span> <br />
                                <label for="floatingPassword">Jelszó</label>
                        </div>
                            </div>    
                        
                    </div>
                    <button 
                    type="button" 
                    className="btn btn-outline-primary"
                    onClick={registerButton}
                    >Regisztráció</button>
                </form>
            </div>
        </div>
    )

    function registerButton (e){
        setValid(true)
        setLastNameError("")
        setFirstNameError("")
        setPasswordError("")
        e.preventDefault();

        if(formData.lastName ==""){
             setLastNameError("A név nem lehet üres")
             setValid(false)
        }
        if(formData.firstName ==""){
             setFirstNameError("A név nem lehet üres")
             setValid(false)
        }
        if(formData.password ==""){
             setPasswordError("A jelszó nem lehet üres")
             setValid(false)
        }else if( formData.password.length<4){
            setPasswordError("A jelszónak legalább 4 karakternek kell lennie")
            setValid(false)
        }
        if(valid){
            userService.registration(formData.email, formData.password)
            .then(registerResp => {
               if(registerResp.error) {
                   console.log(registerResp)
                   setErrorMsg("Nem megfelelő email cím")
               }
               if(!registerResp.error) {
                   userService.createUser(registerResp.localId,formData)
                   .then(resp => { 
                       setShowToast({
                           show:true,
                           message:`Sikeres regisztráció!`,
                           type:"success"
                       })
                       console.log(resp);
                       navigate("/belepes");
                   })
               }
           
            })

        }
         }
            

}
