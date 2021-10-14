import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  balance: null
};

const wallet = createSlice( {
  name: "wallet",
  initialState,
  reducers: {
    resetStore: () => initialState,
    setAddress: ( state, action: PayloadAction<any> ) => {
      state.address = action.payload;
    },
    setUserBalance: ( state, action: PayloadAction<any> ) => {
      state.balance = action.payload;
    }
  }
} );

export const { resetStore, setAddress, setUserBalance } = wallet.actions;

export default wallet.reducer