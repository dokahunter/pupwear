import AdminProductTable from "../components/AdminProductTable/AdminProductTable";
import Filter from "../components/Filter/Filter";

export default function AdminProducts() {
    return (
        <div className="container bg-light bg-gradient p-3">
            <div className="row text-center">
                <h2>Termékek</h2>
            </div>
            <div className=" row justify-content-center">
                <Filter type="item price category" />
            </div>
            <AdminProductTable />
        </div>
    )
}
