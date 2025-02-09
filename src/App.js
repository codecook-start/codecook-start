import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/main.css";
import "./styles/font-awesome/css/font-awesome.css";
import "./styles/ionicons/css/ionicons.css";

import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import AuthRouter from "./components/AuthRouter";
import Admin from "./routes/admin/Admin";
import User from "./routes/user/User";
import CreateBlog from "./pages/createBlog";
import Context from "./hooks/context";
import UpdateBlog from "./pages/updateBlog";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <Context.Provider value={{ search, setSearch }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<AuthRouter role="admin" />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/*" element={<Admin />} />
          </Route>
          <Route element={<AuthRouter role="user" />}>
            <Route path="/user/*" element={<User />} />
            {/* <Route path="/user/create" element={<CreateBlog />} />
            <Route path="/user/update/:id" element={<UpdateBlog />} /> */}
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
};

export default App;
