import {IMember} from "./characters.types";

export interface IRace {
    id: string
    name: string
    image: {
        large: string
    }
    members: IMember[]
    description: string
}

export interface  IRaceListItem {
    id: string
    name: string
    image: {
        large: string
    }
}