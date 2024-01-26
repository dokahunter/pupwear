import { useEffect, useState } from "react";
import categoryService from "../../services/category-service";
import { Link } from "react-router-dom";

export default function AdminCategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryService.getAllCategories()
        .then(json => {
            setCategories(Object.values(json))
        })
    }, []);

    return (
        <div className="container bg-light bg-gradient p-3 fill" >
            <div className="row  text-center">
                <h2>Kategóriák</h2>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Kategória neve</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                {categories.map((category, idx) => {
                    return (
                        <tr key={idx}>
                            <td className="align-middle">{category.name}</td>
                            <td className="text-end w-3">
                                <div className="btn-group">
                                    <Link to={`/admin/kategoriak/${category.id}/modositas`} className="btn btn-outline-secondary">Módosítás</Link>
                                    <Link to={`/admin/kategoriak/${category.id}/torles`} className="btn btn-danger">Törlés</Link>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}