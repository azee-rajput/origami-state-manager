import { createStore } from "oopsies-state-master";

const initialStore = {
  user: {
    isLoggedIn: false,
  },
  cart: [],
  app: {},
  favorite: [],
};

const store = createStore(initialStore, "simple-oopsies-store");

export default store;
