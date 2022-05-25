export const SIGN_IN_LOADING = 'SIGN_IN/LOADING';
export const SIGN_IN_ERROR = 'SIGN_IN/ERROR';
export const SIGN_IN_SUCCESS = 'SIGN_IN/SUCCESS';

export const SIGN_IN = 'SIGN_IN/SOME'; // blank

interface ISignInSome { // blank
    type: typeof SIGN_IN;

}

export type ISignInActions = ISignInSome;

export const signInSome = (): ISignInSome => ({ // blank
    type: SIGN_IN,

});

