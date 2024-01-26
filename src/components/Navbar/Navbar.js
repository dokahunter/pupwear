import { useContext } from "react";
import { NavLink } from "react-router-dom";
 import { UserContext } from "../../contexts/userContext";
 import CartSum from "../CartSum/CartSum";
 import DisplayUser from "../DisplayUser/DisplayUser"
 import { Navbar as BootstrapNavbar, Container, Nav, Badge } from "react-bootstrap";
 import "../Navbar/navbar.scss"
 import { Cart } from 'react-bootstrap-icons';
 import logo from '../../pictures/pupwear.png'


 export default function Navbar() {

     const [user] = useContext(UserContext);
     return (
         <BootstrapNavbar sticky="top" expand="md" className="my-0">
             <Container>
                 <Nav.Link as={NavLink} to="/"><img src={logo} style={{ position: "relative", overflow: "auto", width: "10rem", }}></img></Nav.Link>
                 <BootstrapNavbar.Toggle />
                 <BootstrapNavbar.Collapse >
                     <Nav className="me-auto">
                         <Nav.Link as={NavLink} to="/termekek"><span className="align-bottom">Termékek</span></Nav.Link>
                         {user !== null && user.isAdmin ? <Nav.Link as={NavLink} to="/admin/termekek">Admin</Nav.Link> : ""}
                     </Nav>
                     <Nav>
                         <Nav.Link as={NavLink} to="/kosar" className="btn btn-outlined-primary btn-lg text-start">
                             <Cart size="1.3rem"/>
                             <Badge bg="danger"><CartSum /></Badge> 
                         </Nav.Link>
                         {user ? <DisplayUser /> : ""}
                         {user ? "" : <Nav.Link as={NavLink} to="/belepes">Belépés</Nav.Link>}
                     </Nav>
                 </BootstrapNavbar.Collapse>
             </Container>
         </BootstrapNavbar>
     )
}