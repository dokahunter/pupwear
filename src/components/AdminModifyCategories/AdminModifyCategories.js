import { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../services/category-service";
import { ToastContext } from "../../services/toastContext";

export default function AdminModifyCategories() {
    const {id} = useParams();
    const [originalName, setOriginalName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const { showToast, setShowToast } = useContext(ToastContext);

    const navigate = useNavigate();

    useEffect(() => {
        categoryService.getCategory(id)
        .then(json => setOriginalName(json.name))
    }, [])

    return (
        <div className="container container bg-light bg-gradient fill p-3">
            <div className="row  text-center">
                <h2>Kategória módosítása</h2>
            </div>
            <form>
                <div className="row  text-center">
                    <p>Kategória eredeti neve: {originalName}</p>
                </div>
                <div className="form-floating mt-2">
                    <input value={categoryName} 
                    type="text"
                    onChange={(e) => setCategoryName(e.target.value)}
                    name="floatingName" className="form-control " placeholder="Kategória új neve" id="floatingName"/>
                    <label htmlFor="folatingName">Kategória új neve</label>
                </div>
                <div className=" d-flex align-items-center justify-content-center">
                    <button onClick={modifyProduct} className="btn btn-outline-secondary m-1">Módosítás</button>
                </div>
            </form>
        </div>
    )

    function modifyProduct(e) {
        e.preventDefault();
        categoryService.updateCategory(id, categoryName)
        .then(json => {
            setShowToast({
                show:true,
                message:`Sikeresen módosítva: ${json.name}`,
                type:"success"
            })
            navigate("/admin/kategoriak");
        });
    }
}