/**
 * Created by jcika on 02.02.2020.
 **/
import * as React from "react";
import Map from "./Map";

const defaultProps = {
    zoom: 8,
    width: "inherit",
    height: "inherit",
    center: {x: 16.606196318054202, y: 49.1822236321112}
};

const MapCz = (props) => {
    const onMapClick = (coordinates) => {
        if (props.onMapClick) {
            props.onMapClick(coordinates);
        }
    }

    const {width, height, zoom, center, marks} = props;
    const w = width || defaultProps.width;
    const h = height || defaultProps.height;
    const c = center || defaultProps.center;


    // const { marks, paths} = this.props;
    return (
        <div style={{width: w, height: h, border: "solid gray 1px"}}>
            {<Map onPointAdded={onMapClick}
                  zoom={zoom || defaultProps.zoom}
                  centerCoords={[c.x, c.y]}
                  marks={marks}/>}
        </div>
    );
}


export default MapCz;
