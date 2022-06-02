import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"
import {registerReducer} from "../../s-2-features/f-1-authorization/a-2-register/r-2-bll/b-2-redux/registerReducer";
import {forgotReducer} from "../../s-2-features/f-1-authorization/a-3-forgot/f-2-bll/b-2-redux/forgotReducer";
import {error404Reducer} from "../../s-2-features/f-4-error404/p-2-bll/b-2-redux/error404Reducer";
import {recoverPasswordReducer} from "../../s-2-features/f-5-recover-password/p-2-bll/b-2-redux/recoverPasswordReducer";
import {newPasswordReducer} from "../../s-2-features/f-6-new-password/p-2-bll/b-2-redux/newPasswordReducer";
import {AppAction, appReducer} from "./app-reducer";
import {useDispatch} from "react-redux";
import {profileReducer} from "../../s-2-features/f-3-profile/p-2-bll/b-2-redux/profile-reducer";
import {signInReducer} from "../../s-2-features/f-1-authorization/a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";

const reducers = combineReducers({
    login: signInReducer,
    register: registerReducer,
    forgot: forgotReducer,
    profile: profileReducer,
    error404: error404Reducer,
    recoverPassword: recoverPasswordReducer,
    newPassword: newPasswordReducer,
    app: appReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store

// TYPES
export type IAppStore = ReturnType<typeof reducers>
export type AppThunkType = ThunkDispatch<IAppStore, void, AppAction>
export const useAppDispatch = () => useDispatch<AppThunkType>();

// @ts-ignore
window.store = store; // for dev
