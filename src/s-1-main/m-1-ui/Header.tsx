import React from "react";
import {NavLink} from "react-router-dom";
import {
    SIGN_IN_PATH, REGISTER_PATH, FORGOT_PATH,
    PROFILE_PATH, ERROR404_PATH, RECOVER_PASSWORD_PATH, NEW_PASSWORD_PATH, SUPER_COMPONENTS_PATH
} from "./Routing";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../m-2-bll/store";
import {LogOutThunk} from "../../s-2-features/f-1-authorization/a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";

const Header: React.FC = () => {

    //react-REDUX
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<IAppStore, boolean>(state => state.signIn.isLoggedIn)

    const logOutHandler = () => {
        dispatch(LogOutThunk())
    }

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
        }}>
            {isLoggedIn && <div> <button onClick={logOutHandler}>LOG OUT</button> </div>}

            <NavLink to={SIGN_IN_PATH}>sign-in</NavLink>
            <NavLink to={REGISTER_PATH}>register</NavLink>
            <NavLink to={FORGOT_PATH}>forgot</NavLink>
            <NavLink to={PROFILE_PATH}>profile</NavLink>
            <NavLink to={ERROR404_PATH}>error404</NavLink>
            <NavLink to={RECOVER_PASSWORD_PATH}>recover password</NavLink>
            <NavLink to={NEW_PASSWORD_PATH}>new password</NavLink>
            <NavLink to={SUPER_COMPONENTS_PATH}>super components</NavLink>

        </div>

    );
};

export default Header;
