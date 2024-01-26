import { useNavigate, useSearchParams, Link } from "react-router-dom";
import productsService from "../../services/products-service";
import { useContext, useEffect, useState } from "react";
import sortProducts from "../../services/sortProducts";
import { CartContext } from "../../contexts/cartContext";
import Pager from "../Pager/Pager";
import pagerService from "../../services/pager-service";
import { UserContext } from "../../contexts/userContext";
import { ToastContext } from "../../services/toastContext";
import numberGrouper from "../../services/numberGrouper";
import "../ProductList/productlist.scss"
import noImage from "../../pictures/noImageAvailable.webp"

export default function ProductList() {

    const [products, setProducts] = useState([]);
    const [usp] = useSearchParams();
    const pagerData = pagerService(usp)
    const navigate = useNavigate();
  
    const [user] = useContext(UserContext);
    const { addToCart } = useContext(CartContext)

    const {showToast,setShowToast}  = useContext(ToastContext);

    useEffect(() => {
        productsService.getAllProducts()
            .then(json => {
                const originalProducts = (Object.values(json))
                const title = usp.get("title") !== null ? (usp.get("title").toLowerCase()) : null;
                const minimumPrice = usp.get("minimumPrice") || 0;
                const maximumPrice = usp.get("maximumPrice") || Number.MAX_SAFE_INTEGER;
                const category = usp.get("category");
                let titleFiltered;
                let categoryFiltered;

                if (title !== null && title !== "") {
                    titleFiltered = originalProducts.filter((product) => (
                        product.name.toLowerCase().includes(title)))
                } else titleFiltered = originalProducts;

                if (category === "uncategorized") {
                    categoryFiltered = titleFiltered.filter((product) => (
                        product.categoryId === "" || !product.categoryId
                    ))
                } else if (category !== null) {
                    categoryFiltered = titleFiltered.filter((product) => (
                        product.categoryId === category
                    ))
                } else categoryFiltered = titleFiltered;

                return (
                    categoryFiltered.filter((product) => (
                        Number(product.price) >= Number(minimumPrice) && Number(product.price) <= Number(maximumPrice)
                    ))
                )
            })
            .then(json => {
                const sortBy = usp.get("sortBy");
                const direction = usp.get("direction");
                setProducts(sortProducts(json, sortBy, direction))
            })
    }
        , [usp])

    return (
        <>
                <div className="row align-items-start">
                {products.slice(pagerData.startIdx, pagerData.endIdx).map((product, idx) => {
                    return (
                        <div key={idx} className="col-md-4">
                            <div className="card my-2" >
                                <img className="card-img-top" src={product.url ? product.url : noImage} style={{}}/>
                                <div className="card-body"  >
                                    <div className="card-text">
                                        <h5 className="card-title" ><Link className="productLink" to={`/termekek/${product.id}`}>{product.name}</Link></h5>
                                        <h6 className="card-subtitle" > Ár: {numberGrouper(product.price)} Ft</h6>
                                    </div>
                                    <div className="container btn-container">
                                    <button type="button" className="btn btn-primary card-btn" onClick={() => {
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
                        </div>
                    )
                })}
                </div>
            <Pager allProducts={products.length} itemsPerPage={pagerData.itemsPerPage}/>
        </>
    )
}