import React from 'react';
import {Provider} from "react-redux";
import './App.css';
import store from "./s-1-main/m-2-bll/store";
import Main from "./s-1-main/m-1-ui/Main";

// add context
const App: React.FC = () => {
    return (
        <div className="App">
                <Provider store={store}>
                    <Main/>
                </Provider>
        </div>
    );
};

export default App;
