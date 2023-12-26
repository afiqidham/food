// Cart.jsx
import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import OrderDelivered from "./OrderDelivered";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [showOrder, setShowOrder] = useState(false);

  const totalAmount = `RM${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const generateOrderId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000); // You can adjust the range as needed
    return `${timestamp}-${random}`;
  };

  const orderHandler = () => {
    const orderData = {
      orderId: generateOrderId(),
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
    };

    // Retrieve existing orders from local storage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Add the new order to the existing orders
    const updatedOrders = [...existingOrders, orderData];

    // Store the updated orders in local storage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Clear the items in the cart
    cartCtx.clearall();

    setShowOrder(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {!showOrder ? (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </>
      ) : (
        <OrderDelivered onClose={props.onClose} />
      )}
    </Modal>
  );
};

export default Cart;
