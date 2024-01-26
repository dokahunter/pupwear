
export default function sortOrders(orders, sortBy, direction) {
    let sortedOrders;

    if (sortBy == null) {
        return(
            orders
        )
    }
    
    if (sortBy === "date")  {
        sortedOrders = direction === "asc" ?
            orders.sort((a, b) => Number(a["timestamp"]) - Number(b["timestamp"]))
            :
            orders.sort((a, b) => Number(b["timestamp"]) - Number(a["timestamp"]))
    } else if (sortBy === "finalPrice") {
        sortedOrders = direction === "asc" ? 
        orders.sort((a, b) => Number(a["finalPrice"]) - Number(b["finalPrice"]))
        :
        orders.sort((a, b) => Number(b["finalPrice"]) - Number(a["finalPrice"]))
    } else {
        sortedOrders = orders
    }
    return(
        sortedOrders
    )
}