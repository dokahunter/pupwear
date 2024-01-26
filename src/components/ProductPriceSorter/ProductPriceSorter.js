import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export default function ProductPriceSorter() {
    const [searchParam, setSearchParam] = useSearchParams();
    const sortBy = searchParam.get("sortBy");
    let direction;

    if (sortBy === "price") {
        direction = searchParam.get("direction");
    }

    const icons = {
        asc: <FaSortUp />,
        desc: <FaSortDown />,
        none: <FaSort />
    }

    return (
        <>
            <span onClick={handleClick}>Termék ára {(direction && icons[direction]) || icons["none"]}</span>
        </>
    )

    function handleClick() {
        if (searchParam.get("sortBy") !== "price") {
            searchParam.set("sortBy", "price");
            searchParam.set("direction", "asc")

        } else if (searchParam.get("direction") === "asc") {
            searchParam.set("direction", "desc")

        } else if (searchParam.get("direction") === "desc") {
            searchParam.delete("sortBy");
            searchParam.delete("direction");

        } else {
            searchParam.set("direction", "asc")
        }

        setSearchParam(searchParam)
    }

}