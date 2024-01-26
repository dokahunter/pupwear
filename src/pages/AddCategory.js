import { useState, useContext } from "react";
import categoryService from "../services/category-service";
import { ToastContext } from "../services/toastContext";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {

    const [categoryName, setCategoryName] = useState("");
    const { showToast, setShowToast } = useContext(ToastContext);
    const navigate=useNavigate();


    return (
        <div className="container bg-light bg-gradient p-3 fill">
            <div className="row  text-center">
                <h2>Kategória létrehozása</h2>
            </div>
            <form onSubmit={submitHandler}>
                <div className="form-floating mt-2">
                    <input type="text" onChange={handleCategoryChange} value={categoryName} name="floatingName" className="form-control " placeholder="Kategória neve" id="floatingName"/>
                    <label htmlFor="folatingName">Kategória neve</label>
                </div>
                <div className=" d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn btn-outline-secondary m-1" >Kategória létrehozása</button>
                </div>
            </form>
        </div>
    )

    function handleCategoryChange(e) {
        setCategoryName(e.target.value)
    }

    function submitHandler(e) {
        e.preventDefault()
        categoryService.createCategory({
            name: categoryName
        })
        .then(json => {
            setShowToast({
                show: true,
                message: `Sikeres kategóriafelvitel`,
                type: "success"
            })
            navigate("/admin/kategoriak")
    })

        setCategoryName("")
    }
}