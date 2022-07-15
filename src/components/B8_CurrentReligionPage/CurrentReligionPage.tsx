import React from "react";
import style from "./CurrentReligion.module.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {IReligion} from "../../types/religion.type";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {Member} from "../X_common/Member/Member";
import {getReligionById} from "../../api/religions.api";

export const CurrentReligionPage = () => {
    const {id} = useParams();

    const {
        isLoading: isLoading,
        isError: isError,
        error: error,
        data: religion,
    } = useQuery<IReligion, Error>(
        ["religion", id],
        () => getReligionById(id as string),
    );

    return (
        <div className={style.currentReligion}>
            <ErrorWrapper isLoading={isLoading}
                          isError={isError}
                          error={error}
            >
                {
                    religion && (
                        <>
                            <Title title={religion.name} className={style.title}/>
                            <div className={style.content}>
                                <div className={style.cardBlock}>
                                    <p className={style.name}>{religion.name}</p>
                                    <p className={style.description}>{religion.description}</p>
                                    <img src={religion.image.large} alt=""/>
                                </div>
                                <div className={style.descriptionBlock}>
                                    <div className={style.descriptionPart}>
                                        <p className={style.label}>Описание</p>
                                        <Divider className={style.divider}/>
                                        <p className={style.description}>{religion.description}</p>
                                    </div>
                                    {
                                        religion.members.length && (
                                            <>
                                                <p className={style.label}>{`Представители (${religion.members.length})`}</p>
                                                <Divider className={style.divider}/>
                                                <div className={style.members}>
                                                    {
                                                        religion.members.map(member => (
                                                            <Member key={member.id}
                                                                    id={member.id}
                                                                    name={member.name}
                                                                    image={{
                                                                        small: member.image.small
                                                                    }}
                                                            />
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </ErrorWrapper>
        </div>
    )
}