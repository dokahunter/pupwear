import AdminCustomersTable from "../components/AdminCustomersTable/AdminCustomersTable"
import Filter from "../components/Filter/Filter";
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter";

export default function AdminCustomers() {
    return (
        <div className="container bg-light bg-gradient fill p-3" >
            <div className="row text-center">
            <h2>Vásárlók</h2>
            </div>
            <Filter type="title"/>
            <AdminCustomersTable>
                
            </AdminCustomersTable>
        </div>
    )
}