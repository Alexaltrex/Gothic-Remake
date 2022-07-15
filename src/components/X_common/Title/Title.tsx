import React, {FC} from "react";
import style from "./Title.module.scss"
import clsx from "clsx";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import Divider from "@mui/material/Divider";

interface ITitle {
    title: string
    className?: string
    // showButton?: boolean
    // onClickHandler?: () => void
    // disabled?: boolean
}

export const Title: FC<ITitle> = ({
                                      title,
                                      className,
                                      // showButton = false,
                                      // onClickHandler = () => {},

                                  }) => {
    return (
        <div className={clsx(style.titleWrapper, Boolean(className) && className)}>
            <div className={style.titleButton}>
                <h1 className={clsx(style.title, Boolean(className) && className)}>
                    {title}
                </h1>
                {/*{*/}
                {/*    showButton &&*/}
                {/*    <Button size='small'*/}
                {/*            startIcon={<EditIcon/>}*/}
                {/*            onClick={onClickHandler}*/}
                {/*            disabled={disabled}*/}
                {/*            className={classes.button}*/}
                {/*    >*/}
                {/*        Править*/}
                {/*    </Button>*/}
                {/*}*/}
            </div>
            <Divider className={style.divider}/>
        </div>

    )
}