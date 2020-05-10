/**
 * Created by jcika on 02.02.2020.
 **/
import * as React from "react";
import Map from "./Map";

const defaultProps = {
    zoom: {key: "-default-", value: 8},
    width: "inherit",
    height: "inherit",
    center: {x: 16.606196318054202, y: 49.1822236321112, key: "-default-"}
};

const MapCz = (props) => {
    const onMapClick = (coordinates) => {
        if (props.onMapClick) {
            props.onMapClick(coordinates);
        }
    }

    const {width, height, zoom, center, marks, computeCenter} = props;
    const w = width || defaultProps.width;
    const h = height || defaultProps.height;
    const c = center || defaultProps.center;
    const cmpCenter = computeCenter !== undefined


    // const { marks, paths} = this.props;
    return (
        <div style={{width: w, height: h, border: "solid gray 1px"}}>
            {<Map onPointAdded={onMapClick}
                  zoom={zoom || defaultProps.zoom}
                  centerCoords={c}
                  marks={marks}
                  computeCenter={cmpCenter}/>}

        </div>
    );
}


export default MapCz;
