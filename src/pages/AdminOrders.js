import AdminOrdersTable from "../components/AdminOrders/AdminOrdersTable"
import Filter from "../components/Filter/Filter"
import Pager from "../components/Pager/Pager";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import pagerService from "../services/pager-service";
import orderService from "../services/order-service";
import userService from "../services/user-service";
import Container from "react-bootstrap/Container";

export default function AdminOrders() {
  const [orderDatas, setOrderDatas] = useState([]);
  const [usp] = useSearchParams();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { startIdx, endIdx, itemsPerPage } = pagerService(usp);
  const name = usp.get("title")
  const item = usp.get("item")
  const sortBy = usp.get("sortBy")
  const direction = usp.get("direction")

  useEffect(() => {
    orderService.getOrders()
      .then(respOrders => {
        userService.getUserDatas()
          .then(userObj => {
            const orders = Object.values(respOrders);
            setOrderDatas(
              orders.map((order) => ({
                ...order,
                fullName: `${userObj[order.uid].lastName} ${userObj[order.uid].firstName}`,
                productsName: `${Object.values(order.termekek).map(items => items.name)}`
              }))
            );
          });
      });
  }, [])

  useEffect(() => {
    if (name && item) {
      setFilteredOrders(orderDatas.filter((order) => (order.fullName.toLowerCase().includes(name.toLowerCase())) && 
                                                      order.productsName.toLowerCase().includes(item.toLowerCase())))
    } else if (name) {
      setFilteredOrders(orderDatas.filter((order) => order.fullName.toLowerCase().includes(name.toLowerCase())))
    } else if (item) {
      setFilteredOrders(orderDatas.filter((order) => order.productsName.toLowerCase().includes(item.toLowerCase())))
    } else {
      setFilteredOrders(orderDatas)
    }
  }, [name, orderDatas, item]);

  useEffect(() => {
    if (sortBy === 'name') {
      if (direction === 'asc') setFilteredOrders([...filteredOrders].sort((a, b) => a.fullName.localeCompare(b.fullName)));
      if (direction === 'desc') setFilteredOrders([...filteredOrders].sort((a, b) => b.fullName.localeCompare(a.fullName)));
    }
  }, [direction, sortBy, filteredOrders])

  return (
    <Container className="bg-light bg-gradient fill p-3" >
      <div className="row text-center">
        <h2>Megrendelések</h2>
      </div>
      <Filter type="title item" />
      <AdminOrdersTable orders={filteredOrders.slice(startIdx, endIdx)} />
      <Pager
        allProducts={filteredOrders.length}
        itemsPerPage={itemsPerPage}
      />
    </Container>
  )
}
