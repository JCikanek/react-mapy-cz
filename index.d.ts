import * as React from 'react';

export interface MapPoint {
    x: number;
    y: number
}

export enum MarkerColor {
    Red = "red",
    Green = "green"
}

export interface MarkerPoint {
    x: number;
    y: number;
    value?: string;
    markerImg?: string;
    onPointerClick?: (x: number, y: number) => void;
}


export interface AppProps {
    onMapClick?: (coords: any) => void;
    zoom: number,
    center: MapPoint;
    marks: MarkerPoint[];
    width?: string;
    height?: string
    computeCenter?: boolean;
}


export declare const MapCz: React.FC<AppProps>;
export default MapCz;


//  export default function(ss):React.PureComponent<AppProps, {}>