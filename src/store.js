import { createStore } from "redux";

let initialState = {
  loggedIn: false,
  items: [],
  cart: [],
  username: "",
  query: ""
};

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true, username: action.username };
  }

  if (action.type === "signup-success") {
    return { ...state, loggedIn: action.loggedIn };
  }

  if (action.type === "set-items") {
    return { ...state, items: action.items };
  }

  if (action.type === "log-out") {
    return { ...state, loggedIn: false };
  }
  if (action.type === "remove-item") {
    return { ...state, cart: action.cart };
  }

  if (action.type === "add-success") {
    return { ...state, cart: state.cart.concat(action.item) };
  }

  if (action.type === "search-bar") {
    return { ...state, query: action.query };
  }

  return state;
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
