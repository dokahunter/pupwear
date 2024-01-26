const API_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const API_KEY="AIzaSyB1ufXIFOcvfaHtj0f-y1OLUHqGu9C_l4M";
const API_URL_DATABASE = "https://csapat-10-default-rtdb.europe-west1.firebasedatabase.app/users"

function registration(email,password){
    return( fetch(`${API_URL+API_KEY}`,
        {
            method:"POST",
            headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
    }
    ).then(resp =>resp.json())
    )}

    function createUser(userID,userData){
        return(fetch(`${API_URL_DATABASE}/${userID}.json`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(resp => {
            if(resp.ok){
                return resp.json()
            }
            throw new Error('Hiba történt')
        })
        .then(json => {
            fetch(`${API_URL_DATABASE}/${userID}.json`,{
                method:'PATCH',
                headers:{
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    id:`${userID}`,
                    isAdmin: false
                })
            })
            .then(resp=> {
                if(resp.ok){
                    return resp.json()
                }
                throw new Error('Hiba történt')
            })
        })
        )}

    function signIn(email, password) {
    
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        .then(resp =>{
            if(resp.ok){
                return resp.json()
            }
            throw new Error('Hiba történt')
        })
    }

    function getUserDatas(){    
        return(
                fetch(`${API_URL_DATABASE}.json`)
                .then(res => {
                    if(res.ok){
                        return res.json()
                    }
                    throw new Error('Hiba történt')
                })
        )
    }
    function getUserByID(id){
        return(
            fetch(`${API_URL_DATABASE}/${id}.json`)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
        )
    }
    function getIDToken() {
        return(
            fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    "grant_type":"refresh_token",
                    "refresh_token": `${localStorage.getItem("refreshToken")}`
                })
            })
        )
    }

    export default{
        registration: registration,
        createUser: createUser,
        signIn: signIn,
        getUserDatas:getUserDatas,
        getUserByID: getUserByID,
        getIDToken: getIDToken
    }