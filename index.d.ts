import * as React from 'react';

export interface MapPoint {
    x: number;
    y: number;
}


export interface MapCenterPoint extends MapPoint {
    key:string;
}

export interface MarkerPoint extends MapPoint {
    value?: string;
    markerImg?: string;
    onPointerClick?: (x: number, y: number) => void;
}

export interface Zoom {
    key:string;
    value:number;
}

export interface AppProps {
    onMapClick?: (coords: MapPoint) => void;
    zoom: Zoom,
    center: MapCenterPoint;
    marks: MarkerPoint[];
    width?: string;
    height?: string
    computeCenter?: boolean;
    onComputeCenterUpdated?: () => void;
    onCenterUpdated: () => void;
    onZoomUpdated: () => void;
}


export declare const MapCz: React.FC<AppProps>;
export default MapCz;
