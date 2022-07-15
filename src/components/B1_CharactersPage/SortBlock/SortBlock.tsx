import React, {FC} from "react";
import style from "./SortBlock.module.scss";
import {FormControl} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import {SortedByType} from "../../../types/characters.types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {theme} from "../../../theme/theme";

const radioSx = {
    color: "#ffcc80!important",
    '&.Mui-checked': {
        color: "#76ff03!important",
    },
}

const formControlLabelSx = {
    "& .MuiFormControlLabel-label": {
        color: "#ffcc80",
        fontSize: "12px",
        [theme.breakpoints.up("tablet")]: {
            fontSize: "16px",
        }
    }
}

const formControlLabels = [
    {value: 'pagination', label: "По страницам"},
    {value: 'alphabet', label: "Алфавит"},
    {value: 'location', label: "Локация"},
    {value: 'guild', label: "Гильдия"},
];


interface ISortBlock {
    sortedBy: SortedByType
    onChange: (s: SortedByType) => void
}

export const SortBlock: FC<ISortBlock> = ({sortedBy, onChange}) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value as SortedByType)
    };

    return (
        <FormControl className={style.sortBlock}>

            <FormLabel component="legend"
                       className={style.formLabel}

            >
                Сортировка:
            </FormLabel>

            <RadioGroup className={style.radioGroup}
                        aria-label="sortedBy"
                        name="sortedBy"
                        value={sortedBy}
                        onChange={onChangeHandler}>
                {
                    formControlLabels.map(({value, label}, index) => (
                            <FormControlLabel key={index}
                                              value={value}
                                              control={<Radio size='small' sx={radioSx}/>}
                                              sx={formControlLabelSx}
                                              label={label}
                            />
                        ))

                }
            </RadioGroup>

        </FormControl>
    )
}