import {IGuildListItem} from "../../../types/guilds.types";
import React, {FC, useState} from "react";
import Card from "@mui/material/Card";
import style from "./GuildCard.module.scss";
import {CardActionArea, CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";

export const GuildCard: FC<IGuildListItem> = ({id, name, image: { large }}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Card className={style.guildCard}
              elevation={0}
        >
            <CardActionArea component={Link}
                            to={`/guild/${id}`}
                            className={style.actionArea}

            >
                <div className={style.imgWrapper}>
                    <img src={large} alt="" onLoad={() => setLoaded(true)}/>
                    {!loaded && <div className={style.preloader}>
                        <CircularProgress size={50}/>
                    </div>}
                </div>

                <p className={style.name}>{name}</p>
            </CardActionArea>
        </Card>
    )
}