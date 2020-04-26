import * as React from "react";
import canUseDOM from "./Tool";

/**
 * Created by jcika on 02.02.2020.
 **/
//
const LoadingState = {
    NotLoaded: 0,
    Loading: 1,
    Done: 2
};

const MapCzLoader = (MapyContent) => {
    class Container extends React.Component {
        constructor(props, context) {
            super(props, context);
            const isSMapDefined = typeof SMap !== 'undefined';
            this.state = {
                scriptLoadingState: isSMapDefined ? LoadingState.Done : LoadingState.NotLoaded
            };
        }



        static defaultProps = {
            scriptUrl: 'https://api.mapy.cz/loader.js',
            loader: () => <div>Načítání</div>,
            poi: false
        };

        onScriptLoaded() {
            window.Loader.async = true;
            window.Loader.load(null, {poi: this.props.poi}, () => {
                this.setState({
                    scriptLoadingState: LoadingState.Done,
                });
            });
        }

        loadScript() {
            const {scriptUrl} = this.props;
            const scriptElement = document.createElement('script');
            scriptElement.setAttribute('src', scriptUrl);
            scriptElement.addEventListener('load', this.onScriptLoaded.bind(this));
            document.head.appendChild(scriptElement);

            this.setState({
                scriptLoadingState: LoadingState.Loading,
            });
        }

        componentDidMount() {
            const {scriptLoadingState} = this.state;

            if (scriptLoadingState !== LoadingState.NotLoaded || !canUseDOM) {
                return;
            }

            if (typeof SMap === 'undefined') {
                this.loadScript();
            }
            else {
                this.setState({
                    scriptLoadingState: LoadingState.Done,
                });
            }

        }


        render() {
            const Loader = this.props.loader;
            if (this.state.scriptLoadingState === LoadingState.Done) {
                return <MapyContent {...this.props}/>;
            }
            return <Loader/>;
        }
    }

    return Container;
};

export default MapCzLoader;
