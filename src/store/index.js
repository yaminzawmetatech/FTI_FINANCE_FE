// third-party
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// project import
import reducers from "./reducers";

const middleware = [];
if (process.env.NODE_ENV !== "production") {
    middleware.push(logger);
}

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== "production",
});

const {dispatch} = store;

export {store, dispatch};
