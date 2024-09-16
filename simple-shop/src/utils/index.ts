import { stateValue } from "../osm";
import store from "./store";

export const logout = () => {
  const { isLoggedIn } = stateValue("user", store);

  if (isLoggedIn) {
    stateValue("user", store, () => ({ isLoggedIn: false }));
  }
};

export const login = () => {
  const isLoggedIn = stateValue("user.isLoggedIn", store);

  if (!isLoggedIn) {
    const redirect = stateValue("app", store)?.redirect;
    if (redirect) {
      stateValue("app", store, () => ({}));
      window.location.href = redirect;
    }
    stateValue("user.isLoggedIn", store, () => true);
  }
};

export const register = () => {};
export const handleAddToFavorite = (productsId: string) => {
  const isLoggedIn = stateValue("user.isLoggedIn", store);
  if (!isLoggedIn) {
    const redirect =
      typeof window !== "undefined" ? window.location.href : "/profile";
    stateValue("app", store, () => ({ redirect }));

    window.location.href = "/login";
  } else {
    stateValue("favorite", store, (favoriteItems) =>
      favoriteItems.includes(productsId)
        ? favoriteItems.filter((item: string) => item !== productsId)
        : [...favoriteItems, productsId]
    );
  }
};

export const handleAddToCart = (productsId: string) => {
  console.log(stateValue("cart", store));
  stateValue("cart", store, (cartItems) => {
    console.log("cartItems", typeof cartItems);
    return cartItems.includes(productsId)
      ? cartItems.filter((item: string) => item !== productsId)
      : [...cartItems, productsId];
  });
};

export const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  return data;
};

export const appSettings = () => {};
