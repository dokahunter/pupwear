import DropDownSorter from "../components/DropDownSorter/DropDownSorter"
import Filter from "../components/Filter/Filter"
import ProductList from "../components/ProductList/ProductList"

export default function Products() {
    return (
        <div className="container bg-light bg-gradient p-3">
            <div className="row text-center">
                <h2>Termékek</h2>
            </div>

            <div className="row align-items-start">
                <div className="col-md-2">
                    <div className="my-2">
                        <DropDownSorter />
                    </div>
                    <div>
                        <Filter type="title price category" />
                    </div>
                </div>
                <div className="col-md-10">
                    <ProductList />
                </div>

            </div>
        </div>
    )
}