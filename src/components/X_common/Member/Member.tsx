import React, {FC} from "react";
import style from "./Member.module.scss";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

export interface IMember {
    id: string
    name: string
    image: {
        small: string
    }
}

export const Member: FC<IMember> = ({id, name, image}) => {
    return (
        <Button className={style.member}
                variant="contained"
                component={Link}
                to={`/character/${id}`}
                size='large'
        >
            <img src={image.small} alt=""/>
            <p className={style.name}>{name}</p>
        </Button>
    )
}