import React, { useEffect } from "react";
import { map } from "./initMap";
import StyledMap from "./map.css";

type MarkerInfo = {
  name: string;
  lat: number;
  lng: number;
}

const Map = () => {
  var json = require("../places.json");

  var state = {
    defaultCenter: json.Center,
    markers: json.Places
  }

  function handleAttachGoogleMap() {
    setTimeout(() => {
      handleDrawMarkers();
    }, 2000);
  };

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

  function handleDrawMarkers() {
    const { markers } = state;
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

  useEffect(() => {
    handleAttachGoogleMap();
  });

  return (
    <StyledMap>
      <div id="google-map" />
    </StyledMap>
  );
}

export default Map;