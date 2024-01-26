import numberGrouper from "../../services/numberGrouper";
import ProductNameSorter from "../ProductNameSorter/ProductNameSorter";
import Table from "react-bootstrap/Table";

export default function AdminOrdersTable({orders}) {
    return (
      <Table responsive striped bordered hover>
          <thead>
          <tr className="text-center">
              <th><ProductNameSorter name="Vásárló neve"/></th>
              <th>Megrendelés ID</th>
              <th>Termékek</th>
              <th>Ár</th>
              <th>Mennyiség</th>
              <th>Megrendelés összege</th>
          </tr>
          </thead>
          <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
                <td>{order.fullName}</td>
                <td> {order.id}</td>
                <td>
                    <ul>
                        {Object.values(order.termekek).map((product) => (
                            <li key={product.id}>
                                {product.name}
                            </li>
                          )
                        )}
                    </ul>
                </td>
                <td className="text-end">
                    <ul>
                        {Object.values(order.termekek).map((product) => (
                            <li key={product.id}>
                                {numberGrouper(product.price) + " Ft"}
                            </li>
                          )
                        )}
                    </ul>
                </td>
                <td className="text-center">
                    <ul>
                        {Object.values(order.termekek).map((product) => (
                            <li key={product.id}>
                                {product.quantity}
                            </li>
                          )
                        )}
                    </ul>
                </td>
                <td className="text-end">
                    {numberGrouper(Object.values(order.termekek).reduce((sum, product) => (
                      sum + product.price * product.quantity
                    ), 0)) + " Ft"}
                </td>
            </tr>
          ))}
          </tbody>
      </Table>
    )
}
