export default function sortProducts(products, sortBy, direction) {
    let sortedProducts;
    if (sortBy == null) {
        return(
            products
        )
    }
    
    if (sortBy === "price") {
        sortedProducts = direction === "asc" ?
            products.sort((a, b) => Number(a[sortBy]) - Number(b[sortBy]))
            :
            products.sort((a, b) => Number(b[sortBy]) - Number(a[sortBy]))
    } else if (sortBy === "name" || sortBy === "lastName") {
        sortedProducts = direction === "asc" ? 
        products.sort((a, b) => (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) ? 1 : -1)
        :
        products.sort((a, b) => (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) ? -1 : 1)
    } else {
        sortedProducts = products
    }
    return(
        sortedProducts
    )
}