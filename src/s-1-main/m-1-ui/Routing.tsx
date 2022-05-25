import React from "react";
import {Route, Routes} from "react-router-dom";
import SignInPage from "../../s-2-features/f-1-authorization/a-1-sign-in/s-1-ui/SignInPage";
import RegisterPage from "../../s-2-features/f-1-authorization/a-2-register/r-1-ui/RegisterPage";
import ForgotPage from "../../s-2-features/f-1-authorization/a-3-forgot/f-1-ui/ForgotPage";
import ProfilePage from "../../s-2-features/f-3-profile/p-1-ui/ProfilePage";
import Error404Page from "../../s-2-features/f-4-error404/p-1-ui/Error404Page";
import RecoverPasswordPage from "../../s-2-features/f-5-recover-password/p-1-ui/RecoverPasswordPage";
import NewPasswordPage from "../../s-2-features/f-6-new-password/p-1-ui/NewPasswordPage";
import SuperComponentsPage from "../../s-2-features/f-7-super-components/SuperComponentsPage";

// all project paths
export const SIGN_IN_PATH = "/sign-in";
export const REGISTER_PATH = "/register";
export const FORGOT_PATH = "/forgot";
export const PROFILE_PATH = "/profile";
export const ERROR404_PATH = "/error404";
export const RECOVER_PASSWORD_PATH = "/recover-password";
export const NEW_PASSWORD_PATH = "/new-password";
export const SUPER_COMPONENTS_PATH = "/super-components";



const Routing: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<SignInPage/>}/>
                <Route path={SIGN_IN_PATH} element={<SignInPage/>}/>
                <Route path={REGISTER_PATH} element={<RegisterPage/>}/>
                <Route path={FORGOT_PATH} element={<ForgotPage/>}/>
                <Route path={PROFILE_PATH} element={<ProfilePage/>}/>
                <Route path={ERROR404_PATH} element={<Error404Page/>}/>
                <Route path={RECOVER_PASSWORD_PATH} element={<RecoverPasswordPage/>}/>
                <Route path={NEW_PASSWORD_PATH} element={<NewPasswordPage/>}/>
                <Route path={SUPER_COMPONENTS_PATH} element={<SuperComponentsPage/>}/>
            </Routes>

        </>
    );
};

export default Routing;
