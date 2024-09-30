import { createStore } from "origami-state-manager";

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
