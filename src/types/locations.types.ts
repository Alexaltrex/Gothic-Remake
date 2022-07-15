import {IMemberByGuild} from "./characters.types";

export interface ILocation {
    id: string
    name: string
    image: {
        small: string
        large: string
    }
    members: IMemberByGuild[]
    description: string
}

export interface ILocationListItem {
    id: string
    name: string
    image: {
        large: string
    }
}