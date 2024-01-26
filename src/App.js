import logo from './logo.svg';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Products from './pages/Products';
import Home from './pages/Home/Home';
import Admin from './pages/Admin';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import DeleteProduct from './pages/DeleteProduct';
import ModifyProduct from './pages/ModifyProduct';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import UserRegistration from './pages/UserRegistration';
import { useState } from 'react';
import { UserContext } from './contexts/userContext'
import Cart from './pages/Cart';
import { CartProvider } from './contexts/cartContext';
import UserProfile from './pages/UserProfile';
import AdminCustomers from './pages/AdminCustomers';
import AdminOrders from './pages/AdminOrders';
import UserOrders from './pages/UserOrders';
import AddCategory from './pages/AddCategory';
import AdminCategories from './pages/AdminCategories';
import AdminModifyCategories from './components/AdminModifyCategories/AdminModifyCategories';
import AdminDeleteCategory from './components/AdminDeleteCategory.js/AdminDeleteCategory';
import Product from './pages/Product/Product';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/termekek",
        element: <Products />
      },
      {
        path: "/termekek/:id",
        element: <Product />
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/belepes",
        element: <Login />
      },
      {
        path: "/profil",
        element: <UserProfile />
      },
      {
        path: "/regisztracio",
        element: <UserRegistration />
      },
      {
        path: "/kosar",
        element: <Cart />
      },
      {
        path: "/megrendelesek",
        element: <UserOrders />
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />
          },
          {
            path: "/admin/termekek",
            element: <AdminProducts />
          },
          {
            path: "/admin/termek-felvitel",
            element: <AddProduct />
          },
          {
            path:"/admin/vasarlok",
            element:<AdminCustomers />
          },
          {
            path:"/admin/megrendelesek",
            element:<AdminOrders />
          },
          {
            path: "/admin/termekek/:id/torles",
            element: <DeleteProduct />
          },
          {
            path: "/admin/termekek/:id/modositas",
            element: <ModifyProduct />
          },
          {
            path:"/admin/uj-kategoria",
            element: <AddCategory />
          },
          {
            path:"/admin/kategoriak",
            element: <AdminCategories />
          },
          {
            path: "/admin/kategoriak/:id/modositas",
            element: <AdminModifyCategories />
          },
          {
            path: "/admin/kategoriak/:id/torles",
            element: <AdminDeleteCategory />
          }
        ]
      }
    ]
  }
])

function App() {

  const [user, setUser] = useState(null);

  



  return (
    <UserContext.Provider value={[user, setUser]}>
    <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
      </UserContext.Provider>
  );
}

export default App;
