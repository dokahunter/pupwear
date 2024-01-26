import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [user] = useContext(UserContext)
    const [cart, setCart] = useState({});
    useEffect(() => {
        if (user?.cart) {
            setCart(user.cart)
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            uploadCart(user, cart)
        }
    }, [user, cart]);

    function addToCart(productID) {
        if (!user) return
        let newCart = { ...cart, [productID]: (cart[productID] + 1) || 1 };
        setCart(newCart);
        uploadCart(user, newCart)
    }

    function deleteFromCart(productID) {
        let newCart = {...cart};
        delete newCart[productID];

        setCart(newCart);
        uploadCart(user, newCart);
    }

    function emptyCart() {
        setCart({});
        if (user) uploadCart(user, {})
    }

    function logOutCart() {
        setCart({})
    }

    function uploadCart(user, cart) {
        const API_URL = "https://csapat-10-default-rtdb.europe-west1.firebasedatabase.app/users"

        fetch(`${API_URL}/${user.id}/cart.json`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cart)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, deleteFromCart, emptyCart, logOutCart }}>
            {children}
        </CartContext.Provider>
    )
}