// store.js or store.ts
"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import demographicsReducer from "./features/demographicsSlice"; // Adjust the path as necessary
import symptomsReducer from "./features/symptomsSlice";       // Adjust the path as necessary
import investigationReducer from "./features/investigationsSlice"; // Adjust the path as necessary

import logger from "redux-logger";

const rootReducer = combineReducers({
  
  demographics: demographicsReducer,
  symptoms: symptomsReducer,
  investigation: investigationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
