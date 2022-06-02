import React, {useCallback, useState} from 'react';
import {Navigate} from "react-router-dom";
import { PROFILE_PATH} from "../../../../s-1-main/m-1-ui/Routing";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {LoginThunk} from "../s-2-bll/b-2-redux/signIn-reducer";

interface ISignInProps {

}

const SignIn: React.FC<ISignInProps> = () => {

    // react-REDUX
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<IAppStore, boolean>(state => state.signIn.isLoggedIn)


    // const userData = useSelector(state => state)


    // хуки
    const [email, setEmail] = useState('nya-admin@nya.nya')
    const [password, setPassword] = useState('1qazxcvBG')


    // коллбэки
    const sendUserDataHandler = useCallback(() => {
            dispatch(LoginThunk(email, password, true))
        }, [])
    //===

    return (
        isLoggedIn
            ?
            <Navigate to={PROFILE_PATH}/>
            :
        <div>
            sign-in
            <div>
                <button onClick={sendUserDataHandler}>LOG IN</button>
                {/*{isFetching && <span>fetching ... </span>}*/}
            </div>
        </div>
    );
};

export default SignIn;
