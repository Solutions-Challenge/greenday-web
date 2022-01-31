import { Loader } from "@googlemaps/js-api-loader";

var map: google.maps.Map;
var json = require("../../places.json");
const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  version: "weekly"
});

loader.load().then(() => {
  map = new google.maps.Map(document.getElementById("google-map") as HTMLElement, {
    center: { lat: json.Center.lat, lng: json.Center.lng },
    zoom: 8,
  });
}).then(() => {
  console.log(map);
});

export { map };