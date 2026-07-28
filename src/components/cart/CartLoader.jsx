import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadCartFromDB } from "../../redux/cart/cartActions";

const CartLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartFromDB());
  }, [dispatch]);

  return null;
};

export default CartLoader;