import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import categoryService from "../../services/category-service";
import "./filter.css"
const initFilter = {
    title: "",
    minimumPrice: "",
    maximumPrice: "",
    category: "",
    item: "",
    itemsPerPage: "",
};

export default function Filter(props) {

    const [usp, setUsp] = useSearchParams();
    const [filter, setFilter] = useState(initFilter);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        categoryService.getAllCategories()
        .then(json => setCategoryList(Object.values(json)))
    })

    const handleChange = (e) => {
            setFilter((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
    };

    const search = (e) => {
        e.preventDefault();
        let o = Object.fromEntries(Object.entries(filter).filter(([_, v]) => v != ""));
        setUsp(o);
    };

    const reset = () => {
        setFilter(initFilter);
        let o = Object.fromEntries(Object.entries(filter).filter(([_, v]) => v != ""));
        setUsp(o);
    }


        return (
            <form onSubmit={search}>
                {props.type.includes("title") ? (
                <div className="input-group justify-content-center">
                    <input type="text" className="form-control " name="title" id="example-search-input" placeholder="Név" value={filter.title} onChange={handleChange} aria-describedby="button-addon2" aria-label="Keresés név alapján"/>
                        <span className="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </span>
                </div>) : ""}
                {props.type.includes("item") ? (
                    <div className="input-group">
                        <input type="text" className="form-control " name="item" id="example-search-input" placeholder="Termék" value={filter.item} onChange={handleChange} aria-describedby="button-addon2" aria-label="Keresés termék alapján"/>
                    </div>) : ""}
                {props.type.includes("price") ? (
                <>
                <div className="d-flex flex-wrap justify-content-between gap-2 mt-2" >
                    <div className="form-floating flex-fill ">
                        <input type="number" name="minimumPrice" min={0} value={filter.minimumPrice} onChange={handleChange} className="form-control " placeholder="Minimum ár" id="floatingMinPrice"/>
                        <label htmlFor="floatingMinPrice">Minimum ár</label>
                    </div>
                    <div className=" form-floating flex-fill">
                        <input type="number" name="maximumPrice" min={0} value={filter.maximumPrice} onChange={handleChange} className="form-control" placeholder="Maximum ár" id="floatingMaxPrice"/>
                        <label htmlFor="floatingMaxPrice">Maximum ár</label>
                    </div>
                </div>
                </>) : ""}
                {props.type.includes("category") ? (
                <div className="form-floating mt-2 justify-content-center">
                    <select name="category" value={filter.category} onChange={handleChange} className="form-select" id="floatingSelectCat" aria-label="Kategória">
                        <option key={-1} value={""}>Összes</option>
                        <option key={0} value={"uncategorized"}>besorolatlan</option>
                        {categoryList.map((category, idx) => {
                            return (
                                <option key={idx+1} value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="floatingSelectCat">Kategória</label>
                </div>) : ""}
                <div className="form-floating mt-2 justify-content-center">
                    <select name="itemsPerPage" value={filter.itemsPerPage} onChange={handleChange} className="form-select" id="floatingSelectIt" aria-label="Termékek száma">
                        <option key={-1} value={""}>--</option>
                        <option key={0} value={6}>6</option>
                        <option key={1} value={9}>9</option>
                        <option key={2} value={12}>12</option>
                    </select>
                    <label htmlFor="floatingSelectIt">Termékek oldalanként</label>
                </div>
                
                <div className=" d-flex justify-content-center flex-wrap gap-1 mt-2 mb-2">
                    <button className="btn btn-outline-secondary flex-start flex-fill" type="submit">Szűrés</button>
                    <button className="btn btn-outline-secondary flex-end flex-fill" onClick={reset}>Szűrő törlése</button>
                </div>
            </form>
        )
    }