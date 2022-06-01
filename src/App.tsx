import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import './App.css';
import {IAppStore, useAppDispatch} from "./s-1-main/m-2-bll/store";
import Main from "./s-1-main/m-1-ui/Main";
import {initializeAppTC} from "./s-1-main/m-2-bll/app-reducer";

// add context
const App: React.FC = () => {

    //react-REDUX
    const dispatch = useAppDispatch();
    const isAppInitialized = useSelector<IAppStore, boolean>(state => state.app.isAppInitialized)

    // хук эффекта
    useEffect(() => {
        dispatch(initializeAppTC(true))
    }, [])

    if (!isAppInitialized) {
        return <div>
            Please wait. APP IS LOADING...
        </div>
    }

    return (
        <div>
            <Main/>
        </div>
    );
};

export default App;
