import React from "react";
import style from "./GuildsPage.module.scss";
import {useQuery} from "react-query";
import {IGuildListItem} from "../../types/guilds.types";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {GuildCard} from "./GuildCard/GuildCard";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {getGuilds} from "../../api/guilds.api";

export const GuildsPage = () => {
    const {
        isLoading,
        isError,
        error,
        data: guilds,
    } = useQuery<IGuildListItem[], Error>(
        "guilds",
        getGuilds,
    );

    return (
        <div className={style.guildsPage}>
            <ErrorWrapper isLoading={isLoading} isError={isError} error={error}>
                <Title title="Гильдии"/>

                {
                    guilds && (
                        <>
                            <div className={style.infoBlock}>
                                <p className={style.count}>Всего: {guilds.length}</p>
                            </div>
                            <Divider className={style.divider}/>

                            <div className={style.cards}>
                                {
                                    guilds.map(guild => <GuildCard key={guild.id} {...guild}/>)
                                }
                            </div>
                        </>
                    )
                }
            </ErrorWrapper>
        </div>
    )
}