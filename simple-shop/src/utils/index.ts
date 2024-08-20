import store from "./store";

export const logout = () => {
  const { isLoggedIn } = store["user"].value;

  if (isLoggedIn) {
    store["user"].value = { isLoggedIn: false };
  }
};

export const login = () => {
  const { isLoggedIn } = store["user"].value;

  if (!isLoggedIn) {
    store["user"].value = { isLoggedIn: true };
    // const app = store["app"].value;
    // if (app?.redirect) {
    //   window.location.href = app?.redirect || "/profile";
    //   store["app"].value = {};
    // }
  }
};

export const register = () => {};
export const handleAddToFavorite = (productsId: string) => {
  const { isLoggedIn } = store["user"].value;
  if (!isLoggedIn) {
    const redirect =
      typeof window !== "undefined" ? window.location.href : "/profile";
    store["app"].value = { redirect };

    window.location.href = "/login";
  } else {
    const favoriteItems = store["favorite"].value;
    if (favoriteItems.includes(productsId)) {
      store["favorite"].value = favoriteItems.filter(
        (item: string) => item !== productsId
      );
    } else {
      store["favorite"].value = [...favoriteItems, productsId];
    }
  }
};
export const handleAddToCart = (productsId: string) => {
  const cartItems = store["cart"].value;
  if (cartItems.includes(productsId)) {
    store["cart"].value = cartItems.filter(
      (item: string) => item !== productsId
    );
  } else {
    store["cart"].value = [...cartItems, productsId];
  }
};

export const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  return data;
};

export const appSettings = () => {};
