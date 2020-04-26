import React from "react";

class Path extends React.Component {
    constructor(props, context) {
        super(props, context);
        const {path, slayer} = props;

        const sPath = path.map(it=>  window.SMap.Coords.fromWGS84(it.x, it.y));

        const options1 = {
            color: "#f00",
            width: 3
        };
        const polyline = new window.SMap.Geometry(window.SMap.GEOMETRY_POLYLINE, null, sPath, options1);

        console.log(polyline);
        slayer.addGeometry(polyline);


        // this.sMarker = sMarker;
    }

    componentDidUpdate(prevProps) {
        // componentDidUpdate(this, this.sMarker, Marker.updaterMap, prevProps);
    }

    componentWillUnmount() {
        // this.props.pathsLayer.removeMarker(this.sMarker, true);
    }

    render() {
        return null;
    }
}

export default Path;