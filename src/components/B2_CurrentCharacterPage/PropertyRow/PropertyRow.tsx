import React, {FC} from "react";
import style from "./PropertyRow.module.scss";
import {Link} from "react-router-dom";
import clsx from "clsx";

interface IPropertyRow {
    label: string
    value: string
    to?: string
}

export const PropertyRow: FC<IPropertyRow> = ({label, value, to}) => {
    return (
        <div className={style.propertyRow}>
            <p className={style.label}>{label}</p>

            {
                to ? (
                    <Link to={to}
                          className={clsx(style.value, style.link)}>
                        {value}
                    </Link>
                ) : (
                    <p className={style.value}>
                        {value}
                    </p>
                )
            }
        </div>
    )
}