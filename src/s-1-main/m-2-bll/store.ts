import {applyMiddleware, combineReducers, createStore} from "redux";
import  thunkMiddleware from "redux-thunk"
import {signInReducer} from "../../s-2-features/f-1-authorization/a-1-sign-in/s-2-bll/b-2-redux/signInReducer";
import {registerReducer} from "../../s-2-features/f-1-authorization/a-2-register/r-2-bll/b-2-redux/registerReducer";
import {forgotReducer} from "../../s-2-features/f-1-authorization/a-3-forgot/f-2-bll/b-2-redux/forgotReducer";
import {profileReducer} from "../../s-2-features/f-3-profile/p-2-bll/b-2-redux/profileReducer";
import {error404Reducer} from "../../s-2-features/f-4-error404/p-2-bll/b-2-redux/error404Reducer";
import {recoverPasswordReducer} from "../../s-2-features/f-5-recover-password/p-2-bll/b-2-redux/recoverPasswordReducer";
import {newPasswordReducer} from "../../s-2-features/f-6-new-password/p-2-bll/b-2-redux/newPasswordReducer";

const reducers = combineReducers({
    signIn: signInReducer,
    register: registerReducer,
    forgot: forgotReducer,
    profile: profileReducer,
    error404: error404Reducer,
    recoverPassword: recoverPasswordReducer,
    newPassword: newPasswordReducer

});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store

export type IAppStore = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev
