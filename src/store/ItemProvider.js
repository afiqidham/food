
import React, { useState } from "react";
import itemsContext from "./items-context";

const ItemProvider = (props) => {
  const [itemsData, setItemsData] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    // Add more initial items as needed
  ]);

  const [switchPage, setSwitchPage] = useState(true);

  const addNewItem = (item) => {
    setItemsData((prevItems) => [...prevItems, { id: Date.now(), ...item }]);
  };

  const removeItem = (id) => {
    setItemsData((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItem = (id, updatedItem) => {
    setItemsData((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const togglePage = () => {
    setSwitchPage((prevSwitchPage) => !prevSwitchPage);
  };

  const contextValue = {
    itemsData,
    switchPage,
    addNewItem,
    removeItem,
    updateItem,
    togglePage,
  };

  return (
    <itemsContext.Provider value={contextValue}>
      {props.children}
    </itemsContext.Provider>
  );
};

export default ItemProvider;
