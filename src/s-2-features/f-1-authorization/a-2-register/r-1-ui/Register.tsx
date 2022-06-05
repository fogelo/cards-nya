import React, {useState} from "react";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {RegisterThunk} from "../../a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";
import {ErrorSnackbar} from "../../../../s-3-components/ErrorSnackBar/ErrorSnackbar";
import SuperButton from "../../../../s-3-components/c2-SuperButton/SuperButton";
import SuperInputText from "../../../../s-3-components/c1-SuperInputText/SuperInputText";


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
    

    return (
        <div>
            <div>
                <h3>Registration</h3>
            </div>
            <form name={"register"}>
                <SuperInputText type="text"
                       name={"email"}
                       placeholder={"enter your email"}
                       value={email}
                       onChange={(e) => setEmail(e.currentTarget.value)}/>
                <div>
                    <SuperInputText type="text"
                                    name={"password"}
                                    placeholder={"enter your password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.currentTarget.value)}/>
                </div>
                <div>
                    <SuperButton type={"submit"}
                                 onClick={buttonOnClickHandler}
                                 disabled={isAppLoading}
                    >
                        sign up

                    </SuperButton>
                </div>
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
