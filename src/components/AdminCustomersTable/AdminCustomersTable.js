import { useEffect, useState } from "react";
import userService from "../../services/user-service"
import sortProducts from "../../services/sortProducts";
import { useSearchParams } from "react-router-dom";
import pagerService from "../../services/pager-service";
import Pager from "../Pager/Pager";
import ProductNameSorter from "../ProductNameSorter/ProductNameSorter";

export default function AdminCustomersTable({children}) {
    const [displayUsers,setDisplayUsers] = useState([])
    const [usp] = useSearchParams();
    const [filter,setFilter] = useState("");
    const pagerData = pagerService(usp)
    
    useEffect( () => {
        
        userService.getUserDatas()
        .then(json => {
            const direction = usp.get("direction");
            usp.get("title") !==null ?
            setFilter(usp.get("title").toLowerCase())
            :
            setFilter(null)
            
            if(direction !== null) {
                setDisplayUsers(sortProducts(Object.values(json),"lastName",direction));
            }else{
                setDisplayUsers(Object.values(json))
            }
        })
    },[usp])

    const displayArr = (filter === null) ? 
        displayUsers : 
        (displayUsers.filter(user => user.firstName.toLowerCase().includes(filter) || user.lastName.toLowerCase().includes(filter)));
    
    return(
        <>
            <table className="table table-hover">
                <thead>
                    <tr> 
                        <th><ProductNameSorter name="Név"/></th>
                        <th>E-mail cím</th>
                        <th>Azonosító</th>
                        <th>Admin</th>
                    </tr> 
                </thead>
                <tbody>
                    {displayArr.slice(pagerData[0], pagerData[1]).map((user,idx) => {
                        return( 
                            <tr key={idx}>
                                <td>{user.lastName + " " + user.firstName}</td>
                                <td>{user.email}</td>
                                <td>{user.id}</td>
                                <td>{user.isAdmin? "Igen" : "Nem"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pager allProducts={displayArr.length} itemsPerPage={pagerData[2]}/>
        </>
    )
};