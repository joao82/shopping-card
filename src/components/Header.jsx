import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";

export default function Header() {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        {/* Logo */}
        <Navbar.Brand>
          <Link className="nav__left" to="/">
            Shopping Cart
          </Link>
        </Navbar.Brand>

        {/* Search Bar */}
        <Navbar.Text className="nav__middle">
          <FormControl
            style={{ width: 500 }}
            type="search"
            placeholder="Search a product..."
            className="m-auto"
            aria-label="Search"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>

        {/* Cart Dropdown */}
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart
                color="white"
                fontSize="25px"
                className="shop_icon"
              />
              <Badge bg="secondary">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu className="cart__wrapper" style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <div style={{ textAlign: "right" }}>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod._id}>
                      <img
                        src={require(`../assets/images/${prod.image}`)}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>$ {prod.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <hr />
                  <div className="cart_items">
                    <span className="">Subtotal ({cart.length}) items</span>
                    <span style={{ fontWeight: 700, fontSize: 20 }}>
                      Total: $ {total}
                    </span>
                  </div>
                  <br />
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </div>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
