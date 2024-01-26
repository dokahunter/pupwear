import orderService from "../../services/order-service";
import userService from "../../services/user-service";
import productsService from "../../services/products-service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pager from "../Pager/Pager";
import pagerService from "../../services/pager-service";
import DateSorter from "../DateSorter/DateSorter";
import sortOrders from "../../services/sortOrders";
import Table from 'react-bootstrap/Table';
import "../UserOrderList/userOrderList.css"
import bootstrap from 'bootstrap';
import numberGrouper from "../../services/numberGrouper";
import FinalPriceSorter from "../FinalPriceSorter/FinalPriceSorter";

export default function UserOrderList(props) {

    const [orderDatas, setOrderDatas] = useState([]);
    const [usp] = useSearchParams();
    const pagerData = pagerService(usp);
    const item = usp.get("item");

    useEffect(() => {
        orderService.getOrders()
            .then(json => {
                const allOrders = Object.values(json);
                const userOrders = allOrders.filter((orderData) => orderData.uid === props.user.id);
                const userOrdersWithProductNamesAndFinalPrice = userOrders.map(order => ({
                    ...order,
                    productsName: `${Object.values(order.termekek).map(items => items.name)}`,
                    finalPrice: Object.values(order.termekek).reduce((sum, product) => (
                        sum + product.price * product.quantity
                        ), 0)
                }))
                let filteredOrders;
                if(item) {
                    filteredOrders = userOrdersWithProductNamesAndFinalPrice.filter((order) => order.productsName.toLowerCase().includes(item.toLowerCase()))
                } else {
                    filteredOrders = userOrdersWithProductNamesAndFinalPrice;
                }
                const sortBy = usp.get("sortBy");
                const direction = usp.get("direction");
                if(!sortBy) setOrderDatas(filteredOrders)
                else setOrderDatas(sortOrders(filteredOrders, sortBy, direction))
        })
    }, [usp])

    return (
        <div>
            <p><strong>
            <FinalPriceSorter title={"Végösszeg"}/>
            <DateSorter title={"Dátum"}/>
            </strong></p>
            <div className="accordion" id="accordionExample">
                    {orderDatas.slice(pagerData.startIdx, pagerData.endIdx).map((order, idx) => {
                        return (
                            <div className="accordion-item" key={idx}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`} aria-expanded="false" aria-controls={`collapse${idx}`}>
                                    {Intl.DateTimeFormat('HU', { dateStyle: 'long', timeStyle: 'short'}).format(order.timestamp)}
                                    </button>
                                </h2>
                                <div id={`collapse${idx}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>Rendelésszám:</strong>
                                        <p>{order.id}</p>
                                        <strong>Rendelt termékek: </strong>
                                        <ul>
                                        {Object.values(order.termekek).map((prod, idx) => {
                                            return (
                                                <li key={idx}>
                                                    {prod.quantity} x {prod.name}
                                                </li>
                                            )
                                        })}
                                        </ul>
                                        <p>
                                        <strong>Rendelés leadás időpontja:</strong><br />
                                        {Intl.DateTimeFormat('HU', { dateStyle: 'long', timeStyle: 'medium', }).format(order.timestamp)}
                                        </p>
                                        <div>
                                            <strong>Rendelés végösszege:</strong>
                                            <p>{numberGrouper(order.finalPrice) + " Ft"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <Pager allProducts={orderDatas.length} itemsPerPage={pagerData.itemsPerPage} />
        </div>
    )
}