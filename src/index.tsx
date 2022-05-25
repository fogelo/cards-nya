import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from "react-router-dom";


const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <>
        <HashRouter>
            <App/>
        </HashRouter>
    </>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
