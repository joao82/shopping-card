import { Badge, Card } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

export default function Product({ prod }) {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="productCard__wrapper">
      <Card>
        <Card.Img
          variant="top"
          src={require(`../assets/images/${prod.image}`)}
          alt={prod.name}
          className="productCard__img"
        />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle
            className="ProductCard__info"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            <span className="ProductCard__price">$ {prod.price}</span>
            {prod.fastDelivery ? (
              <Badge bg="success">Fast Delivery</Badge>
            ) : (
              <Badge bg="secondary">4 days delivery</Badge>
            )}
          </Card.Subtitle>
          <div className="ProductCard__rating">
            <Rating rating={prod.rating} />
            <span className="ProductCard__stock">
              Stock: {prod.countInStock}
            </span>
          </div>
          {cart.some((p) => p._id === prod._id) ? (
            <button
              className="ProductCard__button danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="ProductCard__button"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.countInStock}
            >
              {!prod.countInStock ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
