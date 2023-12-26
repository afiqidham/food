import { Fragment, useContext, useState } from "react";
import "./App.css";
import itemsContext from "./store/items-context";
import User from "./components/users/User";
import Footer from "./components/footer/Footer";
import Admin from "./components/admin/Admin";

function App() {
  const itemsCtx = useContext(itemsContext);

  return(
    <Fragment>
      {itemsCtx.switchPage ? <User/> : <Admin/>}
      <Footer/>
    </Fragment>
  )
}

export default App;
