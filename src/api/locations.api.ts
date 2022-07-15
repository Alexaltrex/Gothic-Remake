import request, {gql} from "graphql-request";
import {endpoint} from "../constants/constants";
import {ILocationListItem} from "../types/locations.types";

const getLocationsDocument = gql`
    query Locations {
        locations {
            id
            name
            image {
                large
            }
        }
    }
`

const getLocationByIdDocument = gql`
    query Location($id: ID!) {
        location(id: $id) {
            id
            name
            image {
                large
            }
            members {
                id
                name
                guild {
                    name
                }
                image {
                    small
                }
            }
            description
        }
    }
`

export const getLocations = async () => {
    const {locations} = await request<{locations: ILocationListItem[]}>({
        url: endpoint,
        document: getLocationsDocument
    })
    return locations
}

export const getLocationById = async (id: string) => {
    const {location} = await request<{location: any}>({
        url: endpoint,
        document: getLocationByIdDocument,
        variables: {id}
    })
    return location
}