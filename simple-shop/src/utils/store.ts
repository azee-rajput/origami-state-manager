import { createStore } from "../osm";

const initialStore = {
  user: {
    isLoggedIn: false,
  },
  cart: [],
  app: {},
  favorite: [],
};

const store = createStore(initialStore, "simple-origami-store");

export default store;
