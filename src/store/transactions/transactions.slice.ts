import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Category from '../../types/category';
import Transaction from '../../types/transaction';

export const transactionsAdapter = createEntityAdapter<Transaction>({
  selectId: transaction => transaction.id
});

export const categoriesAdapter = createEntityAdapter<Category>({
  selectId: category => category.id
});

const transactionslice = createSlice({
  name: 'transactions',
  initialState: transactionsAdapter.getInitialState({
    categories: categoriesAdapter.getInitialState({
      defaultCategoryId: ''
    })
  }),
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      categoriesAdapter.addOne(state.categories, action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      const { defaultCategoryId } = state.categories;
      // do not remove default category
      if (categoryId !== defaultCategoryId) {
        // delete category with categoryId
        categoriesAdapter.removeOne(state.categories, categoryId);
      }
    },
  }
});

export default transactionslice;
