import store from "./store";

export const logout = () => {
  const { isLoggedIn } = store["user"].getValue();

  if (isLoggedIn) {
    store["user"].setValue({ isLoggedIn: false });
  }
};

export const login = () => {
  const { isLoggedIn } = store["user"].getValue();

  if (!isLoggedIn) {
    store["user"].setValue({ isLoggedIn: true });
    const app = store["app"].getValue();
    if (app?.redirect) {
      window.location.href = app?.redirect || "/profile";
      store["app"].setValue({});
    }
  }
};

export const register = () => {};
export const handleAddToFavorite = (productsId: string) => {
  const { isLoggedIn } = store["user"].getValue();
  if (!isLoggedIn) {
    const redirect =
      typeof window !== "undefined" ? window.location.href : "/profile";
    store["app"].setValue({ redirect });

    window.location.href = "/login";
  } else {
    const favoriteItems = store["favorite"].getValue();
    if (favoriteItems.includes(productsId)) {
      store["favorite"].setValue(
        favoriteItems.filter((item: string) => item !== productsId)
      );
    } else {
      store["favorite"].setValue([...favoriteItems, productsId]);
    }
  }
};
export const handleAddToCart = (productsId: string) => {
  const cartItems = store["cart"].getValue();
  if (cartItems.includes(productsId)) {
    store["cart"].setValue(
      cartItems.filter((item: string) => item !== productsId)
    );
  } else {
    store["cart"].setValue([...cartItems, productsId]);
  }
};

export const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  return data;
};

export const appSettings = () => {};
