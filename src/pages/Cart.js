import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartList from "../components/CartList/CartList";
import { CartContext } from "../contexts/cartContext";
import orderService from "../services/order-service";
import { UserContext } from "../contexts/userContext";
import { ToastContext } from "../services/toastContext";
import dogWithCart from "../pictures/dog-with-cart.png";
import {Col, Container, Image, Row } from "react-bootstrap";

export default function Cart() {
    const {cart, emptyCart} = useContext(CartContext)
    const [user] = useContext(UserContext)
    const navigate = useNavigate()
    const {showToast,setShowToast}  = useContext(ToastContext);

    return (
        <div className="container bg-light bg-gradient p-3">
            {Object.keys(cart).length === 0 ?
            <div>
                <h2 className="text-center">A kosár üres</h2>
                <div className="text-center">
                <Image src={dogWithCart} className="img-fluid" alt="empty cart"></Image>
                </div>
            </div>
                :
                <div className="container bg-light bg-gradient p-3">
                    <h2>A kosár tartalma:</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="d-none d-sm-table-cell"/>
                                <th>Termék neve</th>
                                <th className="text-end">Termék ára</th>
                                <th className="text-end">Mennyiség</th>
                                <th className="text-end d-none d-md-table-cell">Összesen</th>
                                <th />
                            </tr>
                        </thead>
                            <CartList />
                    </table>
                    <div className="text-end d-grid px-4">
                    <button className="btn btn-primary" onClick={() => orderService.sendOrder(cart, user).then(() => {
                        emptyCart()
                        setShowToast({
                            show:true,
                            message:`A megrendelés elküldve`,
                            type:"success"})
                        })}>Megrendelem</button>
                        </div>
                </div>
            }
        </div>
    )
}