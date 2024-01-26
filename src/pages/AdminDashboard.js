import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return(
        <div>
            <Link to="/admin/termekek">Termékek</Link>
            <Link to="/admin/termek-felvitel">Új termék</Link>
            <Link to="/admin/vasarlok">Vásárlók</Link>
            <Link to="/admin/megrendelesek">Megrendelések</Link>
            <Link to="/admin/uj-kategoria">Új kategória</Link>
            <Link to="/admin/kategoriak">Kategóriák</Link>
        </div>
    )
}