import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";

import CartLoader from "./components/cart/CartLoader";

import { Users } from "./data/Users";

import {
  getUsers,
  addUser,
} from "./database/userService";

function App() {
  useEffect(() => {
    const initializeUsers = async () => {
      const users = await getUsers();

      if (users.length === 0) {
        await addUser(Users[0]);
      }
    };

    initializeUsers();
  }, []);

  return (
    <BrowserRouter>
      {/* Load cart */}
      <CartLoader />

      {/* User Routes */}
      <UserRoute />

      {/* Admin Routes */}
      <AdminRoute />
    </BrowserRouter>
  );
}

export default App;