import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productsService from "../../services/products-service";
import { useContext } from "react";
import { ToastContext } from "../../services/toastContext.js";

export default function AdminDeleteProduct() {
    const {showToast, setShowToast} = useContext(ToastContext);
    const [product,setProduct] = useState({});
    let {id} = useParams();
    const navigate= useNavigate()

    useEffect( () =>{
        productsService.getProduct(id)
        .then(json => setProduct({
            id: json.id,
            name: json.name,
            price: json.price
        }))
        .catch(err => {
            setShowToast({
                show:true,
                message:`Hiba történt:${err} `,
                type:"error"
            });
            
            navigate("/admin/termekek");
        })
    },[])
    

    
    return(
        <div className="container container bg-light bg-gradient p-3 fill">
            <div className="row  text-center">
                <h2>Biztosan törli a terméket?</h2>
                <p className="fw-bold">{product.name}</p>
            </div>
            <div className=" d-flex align-items-center justify-content-center flex-wrap">
                <button onClick={deleteButtonHandler} className="btn btn-outline-danger m-1">Törlés</button>
                <button onClick={cancelButtonHandler} className="btn btn-outline-secondary m-1">Mégsem</button>        
            </div>
        </div>
    )

    function deleteButtonHandler(){
        productsService.deleteProduct(id, successCallback);
    }
    function successCallback(){
        setShowToast({
            show:true,
            message:"Sikeres törlés",
            type:"success"
        });
        navigate("/admin/termekek")
    }
    function cancelButtonHandler(){
        navigate("/admin/termekek")
    }
    
    
}