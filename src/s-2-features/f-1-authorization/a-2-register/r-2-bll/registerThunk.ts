import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {IAppStore} from "../../../../s-1-main/m-2-bll/store";
import {IRegisterActions} from "./b-2-redux/registerActions";
import {RegisterAPI} from "../r-3-dal/RegisterAPI";
import {passwordCoding} from "../../../f-2-helpers/h-1-authorization/passwordCoding";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const register =
    (email: string, password: string): ThunkAction<Return, IAppStore, ExtraArgument, IRegisterActions> =>
        async (dispatch: ThunkDispatch<IAppStore, ExtraArgument, IRegisterActions>, getStore: IGetStore) => {


        };
