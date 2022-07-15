import {Link} from "react-router-dom";
import {Card} from "@mui/material";
import style from "./CardLink.module.scss";
import React, {FC} from "react";
import clsx from "clsx";
import CardActionArea from "@mui/material/CardActionArea";

interface ICardLink {
    label: string
    to: string
    img: string
    className?: string
}

export const CardLink: FC<ICardLink> = ({
                                            label,
                                            to,
                                            img,
                                            className
                                        }) => {
    return (
        <Card className={clsx(style.cardLink, Boolean(className) && className)}
        >
            <CardActionArea component={Link}
                            to={to}
                            className={style.actionArea}
            >
                <div className={style.imgWrapper}>
                    <img src={img} alt=""/>
                </div>

                <p className={style.label}>{label}</p>
            </CardActionArea>
        </Card>
    )
}