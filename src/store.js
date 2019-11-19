import { createStore } from "redux";

let initialState = {
  loggedIn: false,
  items: []
};

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }

  if (action.type === "signup-success") {
    return { ...state, loggedIn: action.loggedIn };
  }

  if (action.type === "set-items") {
    return { ...state, items: action.items };
  }

  return state;
};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
