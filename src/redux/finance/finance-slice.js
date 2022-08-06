import { createSlice } from '@reduxjs/toolkit';
import financeOperations from './finance-operations';

const initialState = {
  categories: null,
  data: null,
  error: null,
  loading: false,
  totalBalance: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  extraReducers: {
    [financeOperations.totalBalance.fulfilled](state, { payload }) {
      state.totalBalance = payload.totalBalance;
    },

    [financeOperations.transactions.fulfilled](state, { payload }) {
      state.data = payload;
    },
  },
});

export default financeSlice.reducer;
