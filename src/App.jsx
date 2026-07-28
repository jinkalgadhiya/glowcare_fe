import { BrowserRouter } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";

import CartLoader from "./components/cart/CartLoader";

function App() {
  return (
    <BrowserRouter>
      <CartLoader />

      <UserRoute />
      <AdminRoute />
    </BrowserRouter>
  );
}

export default App;