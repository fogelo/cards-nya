import React, {useState} from "react";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {RegisterThunk} from "../../a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";
import {ErrorSnackbar} from "../../../../Login/Login/ErrorSnackbar";


interface IRegisterProps {

}

const Register: React.FC<IRegisterProps> = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useAppDispatch()
    const isAppLoading = useSelector<IAppStore, boolean>(state => state.app.isLoading)
    const error = useSelector<IAppStore, string | null>(state => state.app.appError)


    const buttonOnClickHandler = () => {
        dispatch(RegisterThunk(email, password))
    }

    //redirect to profile
    /*
        if (success) {
                navigate(PROFILE_PATH)
            }
     */
    return (
        <div>
            <form name={"register"}>
                <input type="text"
                       name={"email"}
                       placeholder={"enter your email"}
                       value={email}
                       onChange={(e) => setEmail(e.currentTarget.value)}/>
                <input type="text"
                       name={"password"}
                       placeholder={"enter your password"}
                       value={password}
                       onChange={(e) => setPassword(e.currentTarget.value)}/>
                <button type={"submit"}
                        onClick={buttonOnClickHandler}
                >
                    sign up
                </button>
                {(error) && (
                    <span>
                                <ErrorSnackbar/>
                            </span>
                )}
            </form>
        </div>
    );
};

export default Register;
