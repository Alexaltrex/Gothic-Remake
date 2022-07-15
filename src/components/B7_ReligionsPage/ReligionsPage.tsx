import React from "react";
import style from "./ReligionsPage.module.scss";
import {useQuery} from "react-query";
import {IReligionListItem} from "../../types/religion.type";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {CardLink} from "../X_common/CardLink/CardLink";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {getReligions} from "../../api/religions.api";

export const ReligionsPage = () => {
    const {
        isLoading,
        isError,
        error,
        data: religions,
    } = useQuery<IReligionListItem[], Error>(
        "religions",
        getReligions,
    );

    return (
        <div className={style.religionsPage}>
            <ErrorWrapper isLoading={isLoading} isError={isError} error={error}>
                <Title title="Религии"/>

                {
                    religions && (
                        <>
                            <div className={style.infoBlock}>
                                <p className={style.count}>Всего: {religions.length}</p>
                            </div>
                            <Divider className={style.divider}/>

                            <div className={style.cards}>
                                <div className={style.inner}>
                                    {
                                        religions.map(religion => (
                                            <CardLink key={religion.id}
                                                      label={religion.name}
                                                      to={`/religion/${religion.id}`}
                                                      img={religion.image.large}
                                                      className={style.card}
                                            />
                                        ))
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