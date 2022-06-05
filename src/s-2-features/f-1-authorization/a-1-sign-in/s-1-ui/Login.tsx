import React, {useState, MouseEvent} from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {FORGOT_PATH, PROFILE_PATH, REGISTER_PATH} from "../../../../s-1-main/m-1-ui/Routing";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {LoginThunk} from "../s-2-bll/b-2-redux/signIn-reducer";
import {ErrorSnackbar} from "../../../../s-3-components/ErrorSnackBar/ErrorSnackbar";
import SuperButton from "../../../../s-3-components/c2-SuperButton/SuperButton";
import SuperInputText from "../../../../s-3-components/c1-SuperInputText/SuperInputText";
import s from './LogIn.module.css'
import SuperCheckbox from "../../../../s-3-components/c3-SuperCheckbox/SuperCheckbox";

const Login = React.memo(() => {
    const [email, setEmail] = useState("qwdqwd@wwerer.ru");
    const [password, setPassword] = useState("qwerty182");
    const [rememberMe, setRememberMe] = useState(true);

    // const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isAppInitialized);
    const isLoggedIn = useSelector<IAppStore, boolean>((state) => state.login.isLoggedIn);
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);

    const error = useSelector<IAppStore, string | null>((state) => state.app.appError);
    const dispatch = useAppDispatch();
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(LoginThunk(email, password, rememberMe));
    };

    return (
        isLoggedIn
            ?
            <Navigate to={PROFILE_PATH}/>
            :
            <div className={s.authContainer}>
                <h3>Sign In</h3>
                <>
                    <div>
                        <div>
                            <label> Email <br/>
                                <SuperInputText
                                    className={s.input}
                                    value={email}
                                    type="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>Password<br/>
                                <SuperInputText
                                    className={s.input}
                                    value={password}
                                    type="password"
                                    name="password"
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                />
                            </label>
                        </div>

                        {(error) && (
                            <span>
                                <ErrorSnackbar/>
                            </span>
                        )}
                        <div>
                            <SuperCheckbox
                                type="checkbox"
                                name="rememberMe"
                                onChange={(e) => setRememberMe(e
                                    .currentTarget.checked)}
                            > Remember Me
                            </SuperCheckbox>
                        </div>
                    </div>
                    <div>
                        <NavLink to={FORGOT_PATH}>
                            Forgot password
                        </NavLink>
                    </div>
                    <div>
                        <SuperButton
                            onClick={(e) => handleSubmit(e)}
                            disabled={isLoading}
                        >
                            Login
                        </SuperButton>
                    </div>
                </>
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