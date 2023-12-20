import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createRecordReducer, allRecordReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  record: createRecordReducer,
  allrecords: allRecordReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
