import React, {FC} from "react";
import {ErrorBlock} from "../ErrorBlock/ErrorBlock";
import {LinearPreloader} from "../LinearPreloader/LinearPreloader";

interface IErrorWrapper {
    isLoading: boolean
    isError: boolean
    error: Error | null
    children: any
}

export const ErrorWrapper: FC<IErrorWrapper> = ({
                                                    isLoading,
                                                    isError,
                                                    error,
                                                    children
                                                }) => {
    return (
        <>
            {
                isError ? (
                    <ErrorBlock error={error as Error}/>
                ) : (
                    <>
                        {isLoading && <LinearPreloader/>}
                        {children}
                    </>
                )
            }
        </>
    )
}