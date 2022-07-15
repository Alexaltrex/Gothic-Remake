import {AlertColor} from "@mui/material";

export interface ISnackbar {
    open: boolean
    message: string
    severity: AlertColor
}

export interface IBurgerLink {
    to: string
    label: string
    icon: JSX.Element
    src: string
}

export type HomePageLinkType = Omit<IBurgerLink, "icon">