import React from 'react';
import './index.css';
import SNSApp from "./App";
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./redux/store/redux-store";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <SNSApp/>
        </Provider>
    </React.StrictMode>
);
