import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {IAppStore} from "../../../../s-1-main/m-2-bll/store";
import {IForgotActions} from "./b-2-redux/forgotActions";
import {ForgotAPI} from "../f-3-dal/ForgotAPI";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const forgot = (email: string): ThunkAction<Return, IAppStore, ExtraArgument, IForgotActions> =>
    async (dispatch: ThunkDispatch<IAppStore, ExtraArgument, IForgotActions>, getStore: IGetStore) => {


    };
