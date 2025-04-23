import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '../ReduxSlice/CompanyNameSlice';

const mainStore = configureStore({
  reducer: {
    company: companyReducer
  }
});

export default mainStore;
