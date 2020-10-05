/**
 * Created by jcika on 02.02.2020.
 **/
import * as React from "react";
import MapCzLoader from "./MapCzLoader";
import {BaseLayers} from "./MapCzApi";
import Marker from "./Marker";
import Path from "./Path";
import Pointer from "./Pointer";

class MapCmp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sMap: undefined,
            markerLayer: undefined,
        };

        this.lastState = {
            lastCenterKey: "--empty--",
            lastZoomKey: "--empty--",
            lastComputedCenter: {}
        }


        this.onComponentMount = this.onComponentMount.bind(this);
        this.updateMapProps = this.updateMapProps.bind(this);
        this.click =this.click.bind(this);
    }

    onComponentMount(node) {
        if (!this.state.sMap && node) {
            this.initiateMap(node);
        }
    }

    // componentDidUpdate(nextProps) {
    //     const {marks, centerCoords, computeCenter, zoom} = nextProps;
    //     const {sMap} = this.state;
    //     const {lastCenterKey, lastZoomKey, lastComputedCenter} = this.lastState;
    //     const {SMap} = window;
    //     const {onComputeCenterUpdated, onCenterUpdated, onZoomUpdated} = this.props
    //
    //     if (!sMap) {
    //         return true;
    //     }

    // const updateNonComputeCenter = () => {
    //     console.log("Update", centerCoords);
    //     // if (lastCenterKey !== centerCoords.key){
    //         const newCenter = SMap.Coords.fromWGS84(centerCoords.x, centerCoords.y);
    //         sMap.setCenter(newCenter, true);
    //         this.lastState = {...this.lastState, lastCenterKey: newCenter.key};
    //     // }
    //     //
    //     // if (lastZoomKey !== zoom.key) {
    //     //     sMap.setZoom(zoom.value, true);
    //     //     this.lastState = {...this.lastState, lastZoomKey: zoom.key};
    //     // }
    // }
    //
    // const updateComputeCenter = () => {
    //     const points = (marks || []).map(it => SMap.Coords.fromWGS84(it.x, it.y));
    //     const rest = sMap.computeCenterZoom(points);
    //     const newCenter = rest[0];
    //
    //     if (lastComputedCenter.center.x !== newCenter.x ||
    //         lastComputedCenter.center.y !== newCenter.y ||
    //         lastComputedCenter.zoom !== rest[1]) {
    //
    //         sMap.setCenterZoom(...rest, true);
    //         this.lastState = {
    //             ...this.lastState, lastComputedCenter: {center: newCenter, zoom: rest[1]}
    //         }
    //
    //
    //         onComputeCenterUpdated && onComputeCenterUpdated();
    //
    //     }
    // }
    //
    // if (computeCenter) {
    //     updateComputeCenter();
    // } else {
    //     updateNonComputeCenter();
    // }
    //
    //     return true;
    // }

    initiateMap(node) {
        const {centerCoords, zoom} = this.props;

        const center = window.SMap.Coords.fromWGS84(centerCoords.x, centerCoords.y);

        const sMap = new window.SMap(node, center, zoom.value);
        sMap.addDefaultLayer(BaseLayers.TURIST).enable();
        sMap.addControl(new window.SMap.Control.Sync());

        const mouse = new window.SMap.Control.Mouse(window.SMap.MOUSE_PAN | window.SMap.MOUSE_WHEEL | window.SMap.MOUSE_ZOOM);
        sMap.addControl(mouse);
        sMap.getSignals().addListener(window, "map-click", this.click);


        const paths = new window.SMap.Layer.Geometry();
        sMap.addLayer(paths);
        paths.enable();

        const markers = new window.SMap.Layer.Marker();
        sMap.addLayer(markers);
        markers.enable();


        const st = {
            sMap: sMap,
            markerLayer: markers,
            pathsLayer: paths
        };
        this.setState(st);
    }

    componentDidMount() {
      const {sMap} = this.state;
        // sMap.getSignals().addListener(window, "map-click", this.click);
    }

    click(e) {
        const m = this.state.sMap;
        const coords = window.SMap.Coords.fromEvent(e.data.event, m);

        if (this.props.onPointAdded) {
            this.props.onPointAdded(coords);
        }
    }


    renderMarks(marks) {
        if (!marks) {
            return undefined;
        }
        return marks.map((it, index) => <Marker slayer={this.state.markerLayer} key={index + "-" + it.x + "-" + it.y}
                                                x={it.x}
                                                y={it.y}
                                                markerImg={it.markerImg}
                                                value={it.value}/>)
    }

    renderPointers(marks) {
        if (!marks) {
            return undefined;
        }
        const {sMap} = this.state;
        return marks
            .filter(it => it.onPointerClick)
            .map((it, index) => <Pointer sMap={sMap} key={index + "-" + it.x + "-" + it.y}
                                         x={it.x} y={it.y} onPointerClick={it.onPointerClick}/>)
    }

    renderPaths(paths) {
        if (!paths) {
            return undefined;
        }
        return paths.map((it, index) => <Path slayer={this.state.pathsLayer} key={"path-" + index} path={it}/>)
    }

    updateMapProps() {
        const {sMap} = this.state;
        const { centerCoords, computeCenter, zoom} = this.props;
        const {lastCenterKey, lastZoomKey, lastComputedCenter} = this.lastState;

        if(!sMap){
            return
        }

        if (lastCenterKey !== centerCoords.key) {
            const newCenter = SMap.Coords.fromWGS84(centerCoords.x, centerCoords.y);
            sMap.setCenter(newCenter, true);
            this.lastState = {...this.lastState, lastCenterKey: centerCoords.key};
        }

        if (lastZoomKey !== zoom.key) {
            sMap.setZoom(zoom.value, true);
            this.lastState = {...this.lastState, lastZoomKey: zoom.key};
        }
    }

    render() {
        const {marks, centerCoords, computeCenter, zoom, paths} = this.props;
        const {sMap} = this.state;



        sMap && this.updateMapProps();

        return (
            <div style={{width: "inherit", height: "inherit"}} ref={this.onComponentMount}>
                {!sMap && <div>Loading ...</div>}
                {sMap && this.renderPaths(paths)}
                {sMap && this.renderMarks(marks)}
                {sMap && this.renderPointers(marks)}
            </div>
        );
    }
}

export default MapCzLoader(MapCmp);
