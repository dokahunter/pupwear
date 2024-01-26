import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import productsService from "../../services/products-service.js"
import validation from "../../services/validation.js";
import { useContext } from "react";
import { ToastContext } from "../../services/toastContext.js";
import categoryService from "../../services/category-service.js";
import {app} from "../../firebase/firebaseConfig.js"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

export default function ModifyProduct() {
    const {id}= useParams();
    const [product, setProduct] = useState({
        id:"",
        name:"",
        price:"",
        description:"",
        categoryId: ""
    })
    const [categoryList, setCategoryList] = useState([])
    const navigate=useNavigate();
    const {showToast,setShowToast}  = useContext(ToastContext);
    const [formData,setFormData] = useState({product});

    useEffect( () => {
        productsService.getProduct(id)
        .then(json=> {
            setProduct({
            id: json.id,
            name: json.name,
            price: json.price,
            url:json.url,
            description: json.description,
            categoryId: json.categoryId
        })
            setFormData({
            id: json.id,
            name: json.name,
            price: json.price,
            url:json.url,
            description: json.description,
            categoryId: json.categoryId
        })

    })
        .catch(err => {
            setShowToast({
                show:true,
                message:`Hiba történt: ${err}`,
                type:"error"})
            navigate("/admin/termekek");
        })

        categoryService.getAllCategories()
        .then(json => setCategoryList(Object.values(json)))

    },[])




    return(
        <div className="container container bg-light bg-gradient fill p-3">
        <div className="row  text-center">
            <h2>Termék módosítása</h2>
        </div>
        <div className=" input-group row">
            <form>
                <div className="form-floating mt-2">
                    <input
                    defaultValue={formData.name}
                        type="text"
                        onChange={(e) => {
                            setFormData({...formData,name: e.target.value})
                        }}
                        className="form-control"
                        placeholder="Termék neve"
                        id="floatingName"
                    />
                    <label htmfor="floatingName">Termék neve: {product.name}</label>
                </div>
                <div className="form-floating mt-2">
                    <input
                        defaultValue={formData.price}
                        type="text"
                        onChange={(e) => setFormData({...formData,price: e.target.value})}
                        name="floatingPrice"
                        className="form-control "
                        placeholder="Termék ára"
                        id="floatingPrice"
                    />
                    <label htmlFor="floatingPrice">Termék ára: {product.price}</label>
                </div>
                <div className="mt-2 d-flex gap-2 no-wrap justify-content-center align-items-center ">
                    <label htmlFor="formFile" className="form-label m-0  flex-shrink-0">Kép módosítása:</label>
                    <input type="file" name="formFile" id="formFile" className="form-control" onChange={(e) => {
                        fileChange(e);
                    }} />
                </div>

                <div className="form-floating mt-2">
                    <textarea
                        defaultValue={formData.description}
                        onChange={(e) => setFormData({...formData,description: e.target.value})}
                        name="floatingDescription"
                        className="form-control "
                        placeholder="Termék leírása"
                        id="floatingDescription"
                    />
                    <label htmlFor="floatingDescription">Termék leírása: {product.description}</label>
                </div>

                <div className="form-floating mt-2">
                    <select name="category" className="form-select" id="floatingSelect" aria-label="Kategória"
                        defaultValue={formData.categoryId} onChange={(e) => categoryChange(e)}>
                        {categoryList.map((category, idx) => {
                        return (<option key={idx+1} defaultValue={category.id} selected={category.id === product.categoryId ? true : false}>{category.name}</option>)
                            })}
                    </select>
                    <label htmlFor="floatingSelect"> Termék kategória: {categoryList.map((category => {
                        if (category.id === product.categoryId) return category.name
                        }))}
                    </label>
                </div>
                <div className=" d-flex align-items-center justify-content-center flex-wrap">
                    <button onClick={modifyProductButton} className="btn btn-outline-secondary m-1">Módosítás</button>
                    <button onClick={cancelButton} className="btn btn-outline-danger m-1">Mégsem</button>
                </div>
            </form>
        </div>
    </div>
    )
    function modifyProductButton (e) {
        e.preventDefault();
        if (validation(formData.name, formData.price)) {
            
            productsService.updateProduct(id,formData) 
            .then(json => {
                setShowToast({
                    show:true,
                    message:`Sikeresen módosítva: ${json.name}`,
                    type:"success"
                })
                
                navigate("/admin/termekek");
            });
        }
    }
    
    function cancelButton () {
        navigate("/admin/termekek");
    }
    function fileChange(e) {
        fileToStorage(e.target.files[0])
    }
    function fileToStorage(file){
        const storage = getStorage(app)
        const fileRef = ref(storage, "images/" + file.name);
        uploadBytes(fileRef, file)
        .then((uploadResult) => {
            getDownloadURL(uploadResult?.ref)
            .then(resUrl => {
                setFormData({...formData,url: resUrl})
            })
            
        })
    }
    function categoryChange(e){
        categoryList.map( category => {
            if(category.name === e.target.value){
                setFormData({...formData, categoryId: category.id})
            }
            
        })
        
    }
    
    
    
    


}