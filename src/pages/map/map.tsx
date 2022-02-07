import React from "react";

import { map } from "./initMap";
import StyledMap from "./map.css";

class Map extends React.Component {
  json = require("../../places.json");

  state = {
    defaultCenter: this.json.Center,
    markers: this.json.Places
  };

  componentDidMount() {
    console.log('window.innerHeight', window.innerHeight);
    this.handleAttachGoogleMap();
  }

  handleAttachGoogleMap = () => {
    console.log(map);

    setTimeout(() => {
      this.handleDrawMarkers();
    }, 2000);
  };

  handleDrawMarkers = () => {
    const { markers } = this.state;
    const bounds = new google.maps.LatLngBounds();

    markers.forEach((marker: google.maps.LatLng | google.maps.LatLngLiteral) => {
      new google.maps.Marker({
        position: marker,
        map,
      });
      bounds.extend(marker);
    });

    map.fitBounds(bounds);
    map.panToBounds(bounds);
  };

  render() {
    return (
      <StyledMap>
        <div id="google-map" />
      </StyledMap>
    );
  }
}

export default Map;