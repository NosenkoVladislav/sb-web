import { combineReducers, configureStore } from "@reduxjs/toolkit";

import wallet from "./wallet/wallet.redux";

const reducer = combineReducers({
  wallet
});

const store = configureStore({
  reducer,
  middleware: [],
})

export type RootState = ReturnType<typeof reducer>
export default store;