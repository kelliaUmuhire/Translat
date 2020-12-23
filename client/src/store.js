import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./store/reducers/authReducer";
import bookReducer from "./store/reducers/bookReducer";

const initialState = {};
const middleware = [thunk];

const allReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducer);

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
// export const store = createStore(
//   allReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
export const persistor = persistStore(store);
// export default store;
