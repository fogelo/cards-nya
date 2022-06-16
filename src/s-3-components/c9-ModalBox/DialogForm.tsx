import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {FC} from "react";

type FormDialogsProps = {
    children?: React.ReactNode
    title?: string
    buttonTitle?: string
    buttonAction: () => void
    open: boolean
    setOpen: (open: boolean) => void

}
const FormDialog: FC<FormDialogsProps> = (
    {
        children,
        title,
        buttonTitle,
        buttonAction,
        open,
        setOpen,
        ...props
    }) => {
    // const [open, setOpen] = React.useState(open);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClick = () => {
        buttonAction()
        handleClose()
    }


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to remove this Pack? All cards will be excluded from this course.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onClick}>{buttonTitle}</Button>
                </DialogActions>
                {children}
            </Dialog>
        </div>
    );
}
export default FormDialog