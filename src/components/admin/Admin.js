
import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Admin;
