import React from 'react';

const defaultMarker = "https://api.mapy.cz/img/api/marker/drop-red.png";


class Marker extends React.Component {

    constructor(props, context) {
        super(props, context);

        const { x, y, markerImg, value} = this.props;
        const coords = window.SMap.Coords.fromWGS84(x, y);

        const sMarker = this.createMarker(coords, markerImg, value)
        this.state = {
            sMarker
        }
    }

    createMarker(coords, img, value) {

        const marker = (img || defaultMarker);

        const markerDiv = JAK.mel("div");
        const markerImage = JAK.mel("img", {src: marker});
        markerDiv.appendChild(markerImage);

        const label = JAK.mel("div", {}, {
            position: "absolute",
            left: "0px",
            top: "0px",
            textAlign: "center",
            width: "22px",
            color: "black"
        });
        label.innerHTML = (value || "");
        markerDiv.appendChild(label);
        return new window.SMap.Marker(coords, false, {url: markerDiv});
    }
    componentDidMount() {
        const {slayer} = this.props;
        const {sMarker} = this.state;
        slayer.addMarker(sMarker);
    }

    componentWillUnmount() {
        const {slayer} = this.props;
        const {sMarker} = this.state;

        slayer.removeMarker(sMarker, true);
    }

    render() {
        return null;
    }
}

export default Marker;