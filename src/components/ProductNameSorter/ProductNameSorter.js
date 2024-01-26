import { useSearchParams } from "react-router-dom";
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa'

export default function ProductNameSorter(props) {
    const [searchParam, setSearchParam] = useSearchParams();
    const sortBy = searchParam.get("sortBy");
    let direction;

    if (sortBy === "name") {
        direction = searchParam.get("direction");
    }

    const icons = {
        asc: <FaSortUp />,
        desc: <FaSortDown />,
        none: <FaSort />
    }

    return (
        <>
            <span onClick={handleClick}> {props.name} {(direction && icons[direction]) || icons["none"]}</span>
        </>
    )

    function handleClick() {
        if (searchParam.get("sortBy") !== "name") {
            searchParam.set("sortBy", "name");
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