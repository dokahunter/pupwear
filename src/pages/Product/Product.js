import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsService from "../../services/products-service";
import { ToastContext } from "../../services/toastContext";
import "./product.scss"
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

export default function Product() {
    const {id} = useParams();
    const [product, setProduct] = useState({
        id:"",
        name:"",
        price:"",
        description:"",
        categoryId: ""
    });

    const {showToast, setShowToast} = useContext(ToastContext);
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        productsService.getProduct(id)
        .then(json => {
            setProduct({
                id: json.id,
                name: json.name,
                price: json.price,
                description: json.description,
                categoryId: json.categoryId,
                url: json.url,
            })
        })
        .catch(err => {
            setShowToast({
                show: true,
                message: `Hiba történt: ${err}`,
                type: "error"
            })
            navigate("/termekek")
        })
    }, [])

    return (
        <div className="container bg-light bg-gradient fill p-3">
            <div className="row">
            <div className="col-sm">
                <img className={"product-page-img"} src={product.url}/>
            </div>
            <div className="col-sm">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Ár: {product.price} Ft</p>
                <button type="button" className="btn btn-primary" onClick={() => {
                        if(user) {
                            addToCart(product.id)
                            setShowToast({
                                show: true,
                                message: "A termék kosárba került",
                                type: "success"
                            })
                        } else navigate("/belepes")
                    }}>
                    Kosárba
                </button>
            </div>
            </div>
        </div>
    )
}