import * as React from 'react';

export interface MapPoint {
    x: number;
    y: number;
}


export interface MapCenterPoint extends MapPoint{
    force?:boolean;
}

export enum MarkerColor {
    Red = "red",
    Green = "green"
}

export interface MarkerPoint extends MapPoint {
    value?: string;
    markerImg?: string;
    onPointerClick?: (x: number, y: number) => void;
}


export interface AppProps {
    onMapClick?: (coords: MapPoint) => void;
    zoom: number,
    center: MapCenterPoint;
    marks: MarkerPoint[];
    width?: string;
    height?: string
    computeCenter?: boolean;
}


export declare const MapCz: React.FC<AppProps>;
//export default MapCz;
