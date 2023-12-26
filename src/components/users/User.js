import Header from "../Layout/Header";
import CartProvider from "../../store/CartProvider";
import Cart from "../Cart/Cart";
import Meals from "../Meals/Meals";
import { useState } from "react";

const User = () => {
const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}

      <Header onShowCart={showCartHandler} onClose={hideCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default User;