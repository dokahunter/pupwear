import { useContext } from "react"
import { UserContext } from "../contexts/userContext"

export default function UserProfile() {

    const [user] = useContext(UserContext);

    return (
        <div className="container bg-light bg-gradient p-3 fill">
            {user &&
                <>
                    <div className="row text-center">
                        <h2>Profil</h2>
                    </div>
                    <div className="row pt-2">
                        <p className="text-start fw-bold" > <span className="fw-normal m-2"> Név:</span> {user.lastName + " " + user.firstName}</p>
                    </div>
                    <div className="row">
                        <p className="text-start fw-bold"> <span className="fw-normal m-2">Email cím:</span> {user.email}</p>
                    </div>
                </>
            }
        </div>
    )
}