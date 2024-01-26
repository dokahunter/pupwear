import { useState, useContext, useEffect } from "react";
import productsService from "../services/products-service";
import { ToastContext } from "../services/toastContext"
import { app } from "../firebase/firebaseConfig"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import categoryService from "../services/category-service";
import { useNavigate} from "react-router-dom"

export default function AddProduct() {
    const { showToast, setShowToast } = useContext(ToastContext);
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [textarea, setTextArea] = useState("")
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [category, setCategory] = useState("")
    const [categoryList, setCategoryList] = useState([])

    const navigate=useNavigate();

    const [valid,setValid] = useState(true)
    const [titleError,setTitleError] = useState(false)
    const [priceError,setPriceError] = useState(false)
    const [textareaError,setTextareaError] = useState(false)
    const [categoryError,setCategoryError] = useState(false)
    useEffect(() => {
        categoryService.getAllCategories()
            .then(json => setCategoryList(Object.values(json)))
    }, [])

    return (
        <div className="container bg-light bg-gradient fill p-3" >
            <div className="row  text-center">
                <h2>Új termék létrehozása</h2>
            </div>
            <div className="row">
                <form>
                    <div className="form-floating mt-2 has-validation ">
                        <input type="text" onChange={handleTitleChange} value={title} className={`form-control ${ titleError ? " is-invalid" : ""}`} placeholder="Termék neve" id="prouctName" />
                        <label htmlFor="productName">Termék neve</label>
                        <div className="invalid-feedback">A név nem lehet üres.</div>
                    </div>
                    <div className="form-floating mt-2 has-validation">
                        <input type="number" onChange={handlePriceChange} value={price} name="floatingPrice" className={ priceError ? "form-control is-invalid" : "form-control"} placeholder="Termék ára" id="floatingPrice" />
                        <div className="invalid-feedback">A termék árának nagyobbnak kell lennie, mint 0.</div>
                        <label htmlFor="floatingPrice">Termék ára</label>
                    </div>
                    <div className="form-floating mt-2 has-validation">
                        <textarea onChange={handleTextAreaChange} value={textarea} name="floatingTextArea" className={ textareaError ? "form-control is-invalid" : "form-control"} placeholder="Termék leírása" id="floatingTeaxctArea" />
                        <div className="invalid-feedback">A leírás nem lehet üres.</div>
                        <label htmlFor="floatingTextArea">Termék leírása</label>
                    </div>
                    <div className="mt-2 d-flex gap-2 no-wrap justify-content-center align-items-center ">
                        <label htmlFor="formFile" className="form-label m-0  flex-shrink-0">Kép feltöltése:</label>
                        <input type="file" name="formFile" id="formFile" className="form-control" onChange={fileChange} />
                    </div>
                    <div className="form-floating mt-2 has-validation">
                        <select defaultValue={""} onChange={handleCategoryChange} className={`form-select ${categoryError ? " is-invalid" : ""}`} id="floatingSelect" aria-label="Kategória" >
                            <option key={0} defaultValue value={""}>---</option>
                            {categoryList.map((category, idx) => {
                                return (<option key={idx + 1} value={category.id}>{category.name}</option>)
                            })}
                        </select>
                        <label htmlFor="floatingSelect">Kategória</label>
                        <div className="invalid-feedback">Válasszon kategóriát!</div>
                    </div>
                    <div className=" d-flex align-items-center justify-content-center flex-wrap">
                        <button className="btn btn-outline-secondary m-1" onClick={handlerSubmit}>Termék létrehozása</button>
                    </div>
                </form>
            </div>
        </div>
    )

    function handleTitleChange(e) {
        let value = e.target.value;
        setTitle(value)
    }
    function handlePriceChange(e) {
        let value = e.target.value;
        setPrice(value)
    }
    function handleTextAreaChange(e) {
        let value = e.target.value;
        setTextArea(value)
    }
    function fileChange(e) {
        setFile(e.target.files[0])
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value)
    }

    
    
    
    function handlerSubmit(e) {
        e.preventDefault()
        
        title =="" ? setTitleError(true) : setTitleError(false);
        price > 0 ?  setPriceError(false) : setPriceError(true);
        textarea =="" ? setTextareaError(true) : setTextareaError(false);
        category =="" ? setCategoryError(true) : setCategoryError(false);

        if(titleError || priceError || textareaError || categoryError) setValid(false);

            if(valid){
            const storage = getStorage(app)
            const fileRef = ref(storage, "images/" + file.name);
            uploadBytes(fileRef, file)
                .then((uploadResult) => {
                    getDownloadURL(uploadResult?.ref)
                        .then(url => {
                            productsService.createProduct({
                                name: title,
                                price: price,
                                description: textarea,
                                url: url,
                                categoryId: category
                            })
                                .then(res => {
                                        setShowToast({
                                            show: true,
                                            message: `Sikeres termékfelvitel`,
                                            type: "success"
                                        })
                                        navigate("/admin/termekek");
                                })
                                .catch(err => {
                                    setShowToast({
                                        show: true,
                                        message: `Hiba történt: ${err}`,
                                        type: "error"
                                    })
                                })
                        })
                })
    
    
            setTitle("");
            setPrice("");
            setTextArea("");
            setFile(null);
            setCategory("");
    
        }

    }

}