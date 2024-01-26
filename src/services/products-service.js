
const API_URL= "https://csapat-10-default-rtdb.europe-west1.firebasedatabase.app/termekek"


function createProduct(product) {
    return(
        fetch(`${API_URL}.json`,{
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(res=> {
            if(res.ok){
                return res.json()
            }
            throw new Error('Hiba történt')
        })
        .then(json => {
            fetch(`${API_URL}/${json.name}.json`,{
                method:'PATCH',
                headers:{
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    id:`${json.name}`
                })
            })
            })
        )   
    }

    function getAllProducts() {
        return(
            fetch(`${API_URL}.json`)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
        )
    }

    function getProduct(id){
        return(
            fetch(`${API_URL}/${id}.json`)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
        )
    }

    function updateProduct(id,product){
        return(
            fetch(`${API_URL}/${id}.json`,{
                method: 'PATCH',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
        )
    }

    function deleteProduct(id,successCallback) {
        return(
            fetch(`${API_URL}/${id}.json`, {
                method: 'Delete'
            })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
            .catch(error => {
                
            })
            .then(json => successCallback(json))
        )
    }
    



export default{
    createProduct: createProduct,
    getAllProducts: getAllProducts,
    getProduct: getProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}