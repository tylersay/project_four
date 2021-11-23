import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Button, Nav, NavItem, NavLink } from "reactstrap";
import LoginModal from "./LoginModal"
import { useNavigate , Link} from "react-router-dom";

const Mainheader = (props) => {

  let navigate = useNavigate();
  
  function handleClick() {
    navigate("/login");
  }


  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsAuth(true);
    }
  }, []);
  

  // const handleNavbarBrand = e => {
  //   e.preventDefault();
  // }

  return (
    <>
    <Navbar color="primary" dark expand="md" light>
      <NavbarBrand to="/">Stonks</NavbarBrand>
      
      {isAuth === true ? (
        <>
          <Nav className="me-auto" navbar>
            <NavItem>
              
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavItem>
            </Nav>
            <Nav className="ml-auto" >
          <Button color="primary" href="/logout">
            Logout
          </Button>
          </Nav>
        </>
      ) : (
        <>
        <Nav className="ml-auto" >
          <Button className="justify-content-end" color="primary" onClick={handleClick}>
        
            Login
          </Button>
          
          {/* <Button className="justify-content-end" color="primary" href="/login">
            Signup
          </Button> */}
          </Nav>
        </>
      )}
     
     
    </Navbar>
    <LoginModal/>
    </>
  );
};

export default Mainheader;
