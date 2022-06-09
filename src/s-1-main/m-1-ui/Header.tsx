import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    SIGN_IN_PATH, REGISTER_PATH, FORGOT_PATH,
    PROFILE_PATH, ERROR404_PATH, RECOVER_PASSWORD_PATH, NEW_PASSWORD_PATH, SUPER_COMPONENTS_PATH, PACKS_PATH
} from "./Routing";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../m-2-bll/store";
import {LogOutThunk} from "../../s-2-features/f-1-authorization/a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";
import SuperButton from "../../s-3-components/c2-SuperButton/SuperButton";
import {setAppErrorAC} from "../m-2-bll/app-reducer";
import s from "./Header.module.css"

const Header: React.FC = () => {

    //react-REDUX
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<IAppStore, boolean>(state => state.login.isLoggedIn)
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);

    //react-router v6
    let navigate = useNavigate();
    const routeChange = (newPath: string) => {
        navigate(newPath)
    }

    const logOutHandler = () => {
        dispatch(LogOutThunk())
    }

    const isLoggedInHandler = () => {
        if (!isLoggedIn) {
            dispatch(setAppErrorAC("You are not authorized. Please log in"))
        }
    }
    return (
        <div className={s.header}>
            {isLoggedIn &&
                <>
                    <div className={s.headerLogoButton}>
                        <SuperButton onClick={logOutHandler} disabled={isLoading}>LOGOUT</SuperButton>
                    </div>
                    <div className={s.nav}>
                        <div className={`${s.linkWrapper} ${s.packs}`}>
                            <NavLink className={({isActive}: any) => isActive ? s.active : undefined}
                                     to={PACKS_PATH}>Packs list</NavLink>
                        </div>
                        <div className={`${s.linkWrapper} ${s.profile}`}>
                            <NavLink className={({isActive}: any) => isActive ? s.active : undefined}
                                     to={PROFILE_PATH}
                                     onClick={isLoggedInHandler}>Profile
                            </NavLink>
                        </div>
                    </div>
                </>
            }

            {!isLoggedIn &&
                <>
                    <SuperButton onClick={() => routeChange(SIGN_IN_PATH)} disabled={isLoading}>LOGIN</SuperButton>
                    <SuperButton onClick={() => routeChange(REGISTER_PATH)}
                                 disabled={isLoading}>REGISTER</SuperButton>
                </>}
        </div>

    );
};

export default Header;
