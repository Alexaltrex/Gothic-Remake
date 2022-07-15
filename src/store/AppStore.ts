import {action, makeObservable, observable} from "mobx";
import {ISnackbar} from "../types/app.types";

export class AppStore {
    burgerMenu: boolean = false
    snackbar = {
        open: false,
        message: "",
        severity: "success"
    } as ISnackbar

    constructor() {
        makeObservable(this,
            {
                burgerMenu: observable,
                setBurgerMenu: action.bound,
                setSnackbar: action.bound,
            }
        )
    }

    setBurgerMenu(burgerMenu: boolean) {
        this.burgerMenu = burgerMenu;
    }

    setSnackbar(snackbar: ISnackbar) {
        this.snackbar = snackbar
    }

}