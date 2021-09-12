export interface CoordinatesMap {
    latitude: number;
    longitude: number;
}
// we want to display the popup that will display the name of the movie thater when
// we show the marker in the map, thats why we are extending
export interface CoordinatesMapWithMessage extends CoordinatesMap{
    message: string;
}
