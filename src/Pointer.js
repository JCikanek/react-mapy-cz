import React from 'react';

class Pointer extends React.Component {

    constructor(props, context) {
        super(props, context);

        const {x, y} = this.props;
        const coords = window.SMap.Coords.fromWGS84(x, y);

        const pointer = this.createPointer(coords)
        this.state = {
            pointer
        }
    }

    createPointer(coords) {
        const {x, y, onPointerClick} = this.props;
        const {SMap} = window;
        const options = {
            type: SMap.Control.Pointer.TYPES.RED,
            snapHUDtoScreen: 10
        }

        const pointer = new SMap.Control.Pointer(options);
        pointer.addListener("pointer-click", function () {
            if (onPointerClick) {
                onPointerClick(x, y)
            }
        }, pointer);
        pointer.setCoords(coords);
        return pointer;
    }

    componentDidMount() {
        const {sMap} = this.props;
        const {pointer} = this.state;
        sMap.addControl(pointer);
    }

    componentWillUnmount() {
        const {sMap} = this.props;
        const {pointer} = this.state;

        sMap.removeControl(pointer);
    }

    render() {
        return null;
    }
}

export default Pointer;