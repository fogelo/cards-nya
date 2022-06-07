import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from "../../s-1-main/m-2-bll/store";
import {setAppErrorAC} from "../../s-1-main/m-2-bll/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
));

export const ErrorSnackbar = React.memo(() => {

    const error = useSelector<IAppStore, string | null>((state) => state.app.appError);

    const dispatch = useDispatch();

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        dispatch(setAppErrorAC(null))
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        <Snackbar
            open={error !== null}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
})