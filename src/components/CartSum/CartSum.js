import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

export default function CartSum() {
    const {cart } = useContext(CartContext);
    let sum = 0;
    Object.values(cart).forEach((quantity) => sum = sum + quantity);
    
    return sum;
}