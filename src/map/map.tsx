import React from "react";

import { map } from "./initMap";
import StyledMap from "./map.css";

type MarkerInfo = {
  name: string;
  lat: number;
  lng: number;
}

function attachSecretMessage(marker: google.maps.Marker, secretMessage: string) {
  const infowindow = new google.maps.InfoWindow({
    content: secretMessage,
  });

  marker.addListener("click", (event) => {
    infowindow.open(marker.get("map"), marker);
    map.setZoom(10);
    map.setCenter(event.latLng);
  });
}

class Map extends React.Component {
  json = require("../places.json");

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

    markers.forEach((markerInfo:MarkerInfo) => {
      const marker = new google.maps.Marker({
        position: { lat: markerInfo.lat, lng: markerInfo.lng},
        map,
      });
      bounds.extend(markerInfo);
      attachSecretMessage(marker, markerInfo.name);
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