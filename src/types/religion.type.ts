import {IMember} from "./characters.types";

export interface IReligion {
    id: string
    name: string
    image: {
        large: string
    }
    members: IMember[]
    description: string
}

export interface IReligionListItem {
    id: string
    name: string
    image: {
        large: string
    }
}