import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import s from './LogIn.module.scss';
import {FORGOT_PATH, REGISTER_PATH} from "../../s-1-main/m-1-ui/Routing";
import {signIn} from "../loginReducer";
//import {ErrorSnackbar} from "./ErrorSnackbar";
import {Alert, Button} from '@mui/material';
import {IAppStore} from "../../s-1-main/m-2-bll/store";

const Login = React.memo(() => {
    const [email, setEmail] = useState('cards@test.com');
    const [password, setPassword] = useState('Qwertyuiop123');
    const [rememberMe, setRememberMe] = useState(true);

    const isInitialized = useSelector<IAppStore, boolean>((state) => state.login.redirectToLogin);
    const error = useSelector<IAppStore, string>((state) => state.login.error);
    const dispatch = useDispatch();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signIn({email, password, rememberMe}) as any);
    };

    if (isInitialized) {
        return <Navigate to={'/profile'}/>
    }


    return (
        <div >
            <h3>Sign In</h3>
            <form>


                <div>

                    <label> Email <br/>
                        <input

                            value={email}
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </label>

                    <label>Password
                        <input

                            value={password}
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </label>

                    {error && (
                        <span>
            <Alert severity="error">{error}</Alert>
          </span>
                    )}
                    <div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    onChange={(e) => setRememberMe(e.currentTarget.checked)}
                                />
                                Remember me
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <NavLink to={FORGOT_PATH}>
                        Forgot password
                    </NavLink>
                </div>
                <div>
                    <Button>Login</Button>
                </div>
            </form>
            <p>Don't have an account?</p>
            <div>
                <NavLink to={REGISTER_PATH}>
                    Sign Up
                </NavLink>
            </div>

        </div>
    );
});

export default Login;