import * as React from 'react';
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
import s from './RangeSlider.module.css'
import {useEffect, useState} from 'react';

export type RangeSliderType = {
    maxCardsCount: number
    minCardsCount: number
    onChangeCommitted: (values: number[]) => void
}
const CustomSlider = styled(Slider)({
    color: '#21268F',
    height: 5,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 16,
        width: 16,
        backgroundColor: '#FFFFFF',
        border: '4px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        // padding: 0,
        width: 32,
        height: 24,
        borderRadius: 3,
        // backgroundColor: '#21268F',
        backgroundColor: '#21268F',
        '&:before': {display: 'none'},
    },
});

export const RangeSlider = React.memo((props: RangeSliderType) => {


    const [values, setValues] = useState<number[]>([props.minCardsCount, props.maxCardsCount])
    const handleChange = (event: Event, newValue: number | number[]) => {
        if (props.maxCardsCount > 0) {
            setValues(newValue as number[])
        }
    }
    const onChangeCommitted = () => {
        if (props.maxCardsCount > 0) {
            props.onChangeCommitted(values)
        }
    }

    useEffect(() => {
        setValues([props.minCardsCount, props.maxCardsCount])
    }, [props.minCardsCount, props.maxCardsCount])

    return (<div className={s.range}>

            <div className={s.rangeTitle}><b>Number of cards</b></div>
            <CustomSlider
                getAriaLabel={() => 'Number of cards'}
                value={values}
                onChange={handleChange}
                onChangeCommitted={onChangeCommitted}
                valueLabelDisplay="on"
                min={props.minCardsCount}//цифры
                max={props.maxCardsCount}
            />

        </div>

    );
})