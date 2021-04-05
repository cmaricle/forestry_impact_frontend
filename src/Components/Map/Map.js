import React, { Component } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import './Map.css';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiY21hcmljbGUiLCJhIjoiY2tuMGlteHBhMGU2bTJ3bWhyNjdmYjJzMCJ9.tvTpev-nDnjaGm0RX1KstA';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -126.3910,
            lat: 54.6253,
            zoom: 4.5
        };
        this.mapContainer = React.createRef();
    }
    parseJSON(response) {
        console.log(response.text())
        return response.text().then(function(text) {
            return text ? JSON.parse(text) : {}
        })
    }
    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        fetch("http://127.0.0.1:8000/cutblocks/2010",)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    map.addSource('2010', {
                            'type': 'geojson',
                            'data': result

                        });
                    map.addLayer({
                        'id': '2010',
                        'type': 'fill',
                        'source': '2010',
                        'layout': {},
                        'paint': {
                            'fill-color': '#088',
                            'fill-opacity': 0.8
                        }
                    });
                });
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

    }
    render() {
        const { lng, lat, zoom } = this.state;
        return (
            <div>
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={this.mapContainer} className="map-container" />
            </div>
        );
    }
}

export default Map;
