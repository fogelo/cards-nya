import {signInInitialState} from "./signInInitialState";
import {ISignInActions, SIGN_IN} from "./signInActions";

export const signInReducer = (state = signInInitialState, action: ISignInActions) => {
    switch (action.type) {
        case SIGN_IN: { // blank
            return {
                ...state,

            }
        }

        default: {
            return state;
        }
    }
};
