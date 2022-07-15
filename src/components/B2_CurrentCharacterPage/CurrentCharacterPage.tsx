import React, {useState} from "react";
import style from "./CurrentCharacterPage.module.scss"
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {ICharacter} from "../../types/characters.types";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {PropertyRow} from "./PropertyRow/PropertyRow";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {CircularProgress} from "@mui/material";
import {getCharacterById} from "../../api/characters.api";

export const CurrentCharacterPage = () => {
    const {id} = useParams();

    const {
        isLoading,
        isError,
        error,
        data: character,
    } = useQuery<ICharacter, Error>(
        ["character", id],
        () => getCharacterById(id as string)
    );

    const [loaded, setLoaded] = useState(false);

    return (
        <div className={style.currentCharacterPage}>
            <ErrorWrapper isLoading={isLoading} isError={isError} error={error}>
                {
                    character && (
                        <>
                            <Title title={character.name} className={style.title}/>
                            <div className={style.content}>
                                <div className={style.descriptionBlock}>
                                    <p className={style.label}>Описание</p>
                                    <Divider className={style.divider}/>
                                    <p className={style.description}>{character.description}</p>
                                </div>
                                <div className={style.cardBlock}>
                                    <p className={style.name}>{character.name}</p>
                                    <p className={style.description}>{character.description}</p>

                                    <div className={style.imgWrapper}>
                                        <img src={character.image.large} alt="" onLoad={() => setLoaded(true)}/>
                                        {!loaded && <div className={style.preloader}>
                                            <CircularProgress size={50}/>
                                        </div>}
                                    </div>

                                    <div className={style.properties}>
                                        {
                                            [
                                                {
                                                    label: 'Раса',
                                                    value: character.race.name,
                                                    to: `/race/${character.race.id}`
                                                },
                                                {label: 'Пол', value: character.male},
                                                {
                                                    label: 'Гильдия',
                                                    value: character.guild.name,
                                                    to: `/guild/${character.guild.id}`
                                                },
                                                {label: 'Роль', value: character?.role},
                                                {label: 'Статус', value: character.status},
                                                {
                                                    label: 'Локация',
                                                    value: character.location.name,
                                                    to: `/location/${character.location.id}`
                                                },
                                                {
                                                    label: 'Сублокация',
                                                    value: character?.sublocation?.name,
                                                    to: `/location/${character?.sublocation?.id}`
                                                },
                                                {
                                                    label: 'Религия',
                                                    value: character?.religion?.name,
                                                    to: `/religion/${character?.religion?.id}`
                                                },
                                                {label: 'Code', value: character?.code},
                                            ]
                                                .map(({label, value, to}, index) => (
                                                    value ? <PropertyRow key={index} label={label} value={value}
                                                                         to={to}/> : null
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </ErrorWrapper>
        </div>
    )
}