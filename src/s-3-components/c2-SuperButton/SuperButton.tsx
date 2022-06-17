import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react"
import s from "./SuperButton.module.css"

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    blue?: boolean
    width?: number
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        width,
        red,
        blue,
        className,
        disabled,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    // const finalClassName = `${red ? s.red : disabled ? s.disabled : s.default} ${className}`

    const finalClassName = red ? s.red : blue ? s.blue :disabled ? s.disabled : ""

    return (
        <div style={{minWidth: width}}>
            <button
                className={s.default + " " + finalClassName}

                {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
            />
        </div>
    )
}

export default SuperButton
