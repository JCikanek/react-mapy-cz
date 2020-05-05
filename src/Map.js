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
            lastCenter: undefined,
            lastZoom: undefined,
            lastComputedCenter: {}
        };
    }

    onComponentMount(node) {
        if (!this.state.sMap && node) {
            this.initiateMap(node);
        }
    }

    initiateMap(node) {
        const {centerCoords, zoom} = this.props;

        const center = window.SMap.Coords.fromWGS84(centerCoords[0], centerCoords[1]);

        const sMap = new window.SMap(node, center, zoom);
        sMap.addDefaultLayer(BaseLayers.TURIST).enable();
        sMap.addControl(new window.SMap.Control.Sync());

        const mouse = new window.SMap.Control.Mouse(window.SMap.MOUSE_PAN | window.SMap.MOUSE_WHEEL | window.SMap.MOUSE_ZOOM);
        sMap.addControl(mouse);
        sMap.getSignals().addListener(window, "map-click", this.click.bind(this));


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


    render() {
        const {marks, paths, centerCoords, computeCenter, zoom} = this.props;
        const {sMap, lastCenter, lastZoom, lastComputedCenter} = this.state;
        const {SMap} = window;

        if (sMap && !computeCenter) {
            const newCenter = SMap.Coords.fromWGS84(centerCoords[0], centerCoords[1]);
            if (lastCenter !== newCenter) {
                sMap.setCenter(newCenter, true);
                this.setState((state) => {
                    return {...state, lastCenter: newCenter};
                })
            }
        }

        if (sMap && !computeCenter) {
            if (lastZoom !== zoom) {
                sMap.setZoom(zoom, true);
                this.setState((state) => {
                    return {...state, lastZoom: zoom};
                })
            }
        }


        if (sMap && computeCenter) {
            const points = (marks || []).map(it => SMap.Coords.fromWGS84(it.x, it.y));
            const rest = sMap.computeCenterZoom(points);
            if (lastComputedCenter.center !== rest[0] || lastComputedCenter.zoom !== rest[1]) {
                sMap.setCenterZoom(...rest, true);
                this.setState((state) => {
                    return {...state, lastComputedCenter: {center: rest[0], zoom: rest[1]}};
                })
            }
        }

        return (
            <div style={{width: "inherit", height: "inherit"}} ref={this.onComponentMount.bind(this)}>
                {!sMap && <div>Loading ...</div>}
                {sMap && this.renderPaths(paths)}
                {sMap && this.renderMarks(marks)}
                {sMap && this.renderPointers(marks)}
            </div>
        );
    }
}

export default MapCzLoader(MapCmp);
