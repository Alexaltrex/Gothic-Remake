import React, {FC, useState} from "react";
import style from "./CharacterListItem.module.scss";
import {ICharacterListItem} from "../../../types/characters.types";
import {Link} from "react-router-dom";
import {CircularProgress} from "@mui/material";

export const CharacterListItem: FC<ICharacterListItem> = ({
                                                              id,
                                                              image: {small},
                                                              name
                                                          }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Link className={style.characterListItem}
              to={`/character/${id}`}
        >
            <div className={style.imgWrapper}>
                <img src={small} alt="" onLoad={() => setLoaded(true)}/>
                {!loaded && <div className={style.preloaderWrapper}>
                    <CircularProgress size={30}/>
                </div>}
            </div>

            <p className={style.name}>{name}</p>
        </Link>
    )
}